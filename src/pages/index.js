import './index.css';
import {
  config
} from '../utils/constants.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import ConfirmDeletePopup from '../components/ConfirmDeletePopup.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';

const galleryContainerElement = document.querySelector('.gallery__elements');

//попапы
const profilePopup = document.querySelector('.popup_type_edit-profile');
const addCardPopup = document.querySelector('.popup_type_add-image');
const imagePopup = document.querySelector('.popup_type_view-image');

// кнопки
const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button')
const confirmDeleteButton = document.querySelector('.form__save-button_type_confirm-delete')
const editUserpickButton = document.querySelector('.profile__edit-userpick-button')

// для формы "редактировать профиль"

const popupEditForm = document.querySelector('.form_type_edit');
const inputProfileNameElement = document.querySelector('.form__input_type_name');
const inputProfileCaptionElement = document.querySelector('.form__input_type_occupation');

// для формы "добавить карточку"
const popupAddForm = document.querySelector('.form_type_add');


//селекторы
const imagePopupSelector = '.popup_type_view-image';
const addCardPopupSelector = '.popup_type_add-image';
const profilePopupSelector = '.popup_type_edit-profile';
const userNameSelector = '.profile__title';
const userInfoSelector = '.profile__occupation';
const confirmDeletePopupSelector = '.popup_type_confirm-delete';
const editUserpickPopupSelector = '.popup_type_edit-userpick';
const cardListSelector = '.gallery__elements'
const userAvatarSelector = '.profile__image';

// валидация формы

const profileValidator = new FormValidator(config, popupEditForm);
profileValidator.enableValidation();

const addCardValidator = new FormValidator(config, popupAddForm);
addCardValidator.enableValidation();


let ownerId;


const api = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-20/',
  headers: {
    "content-type": "application/json",
    authorization: '5a191bce-603b-4e04-819b-a182504a8e8f'
  }
});

const userInfo = new UserInfo({ userNameSelector, userInfoSelector, userAvatarSelector });


//отрисовка начальных карточек

const cardsList = new Section({
  renderer: (data) => {
    const cardElement = createCard(data);
    cardsList.addItem(cardElement);
  }
}, cardListSelector);

api.getInitialData()
  .then((data) => {
    const [userData, cardsData] = data;
    ownerId = userData._id;
    userInfo.setUserInfo(userData);
    cardsList.renderItems(cardsData);
  })
  .catch((err) => {
    console.log(err);
  })



const popupWithImage = new PopupWithImage(imagePopupSelector);
popupWithImage.setEventListeners();


//создание новой карточки
function createCard(data) {
  // console.log(data);
  const card = new Card(data, ".gallery-template", ownerId, {
    handleCardClick: (data) => {
      popupWithImage.openPopup(data.name, data.link);
    },

    setLike: (data) => {
      api.setLike(data)
        .then((data) => {
          // console.log(data);
          card.setLikeCount(data.likes.length);
        })
        .catch((err) => {
          console.log(err);
        })
    },

    deleteLike: (data) => {
      api.deleteLike(data)
        .then((data) => {
          // console.log(data);
          card.setLikeCount(data.likes.length);
        })
        .catch((err) => {
          console.log(err);
        })
    },

    handleDeleteCardClick: (data) => {
      confirmDeletePopup.openPopup(data._id);
    },
  });
  const cardElement = card.generateCard();
  return cardElement
}


const popupWithAddForm = new PopupWithForm({
  popupSelector: addCardPopupSelector,
  handleFormSubmit: (cardItem) => {
    // popupWithAddForm.renderLoading(true);
    api.uploadCard(cardItem)
    .then((res) => {
      const cardElement = createCard(res);
      cardsList.prependItem(cardElement);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      popupWithAddForm.renderLoading(false);
      popupWithAddForm.closePopup()
    })
}
})

popupWithAddForm.setEventListeners();

//попап для редактирования профиля

const popupWithEditForm = new PopupWithForm({
  popupSelector: profilePopupSelector,
  handleFormSubmit: (data) => {
    popupWithAddForm.renderLoading(true);
    api.uploadUserInfo(data)
    .then((res) => {
      // console.log(res);
      userInfo.setUserInfo(res);
    })
    .finally(() => {
      popupWithAddForm.renderLoading(false);
      popupWithEditForm.closePopup();
    })
  }
})
popupWithEditForm.setEventListeners();

//попап с подтверждением удаления карточки.
const confirmDeletePopup = new ConfirmDeletePopup({
  popupSelector: confirmDeletePopupSelector,
  handleFormSubmit: (data) => {
    api.deleteCard(data)
      .then(() => {
        document.getElementById(`${data}`).remove();
        confirmDeletePopup.closePopup();
      })
      .catch((err) => {
        console.log(err);
      })
  }
})

confirmDeletePopup.setEventListeners();


//попап для загрузки нового аватара.
const editUserpickPopup = new PopupWithForm({
  popupSelector: editUserpickPopupSelector,
  handleFormSubmit: (data) => {
    editUserpickPopup.renderLoading(true);
    api.setUserAvatar(data)
      .then((res) => {
        userInfo.setUserAvatar(res);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        editUserpickPopup.renderLoading(false);
        editUserpickPopup.closePopup();
      })
  }
})

editUserpickPopup.setEventListeners();

editUserpickButton.addEventListener('click', function handleEditUserpickButton(evt) {
  editUserpickPopup.openPopup();
});

profileEditButton.addEventListener('click', function handleProfileEditButtonClick(evt) {
  const data = userInfo.getUserInfo();
  inputProfileNameElement.value = data.name;
  inputProfileCaptionElement.value = data.occupation;
  profileValidator.resetValidation();
  popupWithEditForm.openPopup();
});

profileAddButton.addEventListener('click', function handleProfileAddButtonClick(evt) {
  addCardValidator.resetValidation();
  popupWithAddForm.openPopup();
});

