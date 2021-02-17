// import './index.css';
import {
  initialCards,
  config
} from '../utils/constants.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
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
const cardListSection = '.gallery__elements'

// валидация формы

const profileValidator = new FormValidator(config, popupEditForm);
profileValidator.enableValidation();

const addCardValidator = new FormValidator(config, popupAddForm);
addCardValidator.enableValidation();

//



let ownerId = null;


//

const api = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-20/',
  headers: {
    "content-type": "application/json",
    authorization: '5a191bce-603b-4e04-819b-a182504a8e8f'
  }
});

// достаем данные пользователя

api.getUserData()
  .then((data) => {
    console.log(data);
    const userData = data;
    ownerId = userData._id;
    console.log(ownerId);
    userInfo.setUserInfo(userData);
  })
  .catch((err) => {
    console.log(err);
  })

  
  console.log(ownerId);

// api.getInitialData()
//   .then((data) => {
//     const [userData, cardsData] = data;
//     ownerId = userData._id;
//     userInfo.setUserInfo(userData);
//     cardsList.renderCards(cardsData);
//   })
//   .catch((err) => {
//     console.log(err);
//   })

//отрисовка начальных карточек
api
.getInitialCards()
.then((data) => {
  const cardList = new Section({
    data: data,
    renderer: (cardItem) => {
      const cardElement = createCard(cardItem);
      cardList.addItem(cardElement);
    }
  }, cardListSection);
  
  cardList.renderItems();
  // return cardList;
});

const popupWithImage = new PopupWithImage(imagePopupSelector);
popupWithImage.setEventListeners();

function handleCardClick(name, link) {
  popupWithImage.openPopup(name, link);
} 

function createCard(data) {
  const card = new Card(data, ".gallery-template", handleCardClick, ownerId);
  const cardElement = card.generateCard();
  return cardElement
}


const sectionElement = document.querySelector(cardListSection);

// const popupWithAddForm = new PopupWithForm({
//   popupSelector: addCardPopupSelector,
//   handleFormSubmit: (cardItem) => {
//     saveCardOnServer({
//             name: cardItem.place,
//             link: cardItem.url,
//           });
//     const cardElement = createCard({
//       name: cardItem.place,
//       link: cardItem.url,
//     }, ".gallery-template", handleCardClick);
//     sectionElement.prepend(cardElement);
//     popupWithAddForm.closePopup();
//   }
// });

const popupWithAddForm = new PopupWithForm({
  popupSelector: addCardPopupSelector,
  handleFormSubmit: (cardItem) => {
    saveCardOnServer({
            name: cardItem.place,
            link: cardItem.url,
          });

         const userData = api.getUserData()

          .catch((err) => {
            console.log(err);
          })


    const cardElement = createCard({
      name: cardItem.place,
      link: cardItem.url,
    }, ".gallery-template", handleCardClick);
    sectionElement.prepend(cardElement);
    popupWithAddForm.closePopup();
  }
});

popupWithAddForm.setEventListeners();

  // Колбэк добавления карточки для формы добавления карточки
  const saveCardOnServer = (place, link) => {
    return api
    .uploadCard(place, link)
    .then((res) => {
      console.log(res);
    })
  };


const userInfo = new UserInfo({ userNameSelector, userInfoSelector });

//попап для редактирования профиля

// const popupWithEditForm = new PopupWithForm({
//   popupSelector: profilePopupSelector,
//   handleFormSubmit: (data) => {
//     userInfo.setUserInfo(data);
//     popupWithEditForm.closePopup();
//   }
// })

const popupWithEditForm = new PopupWithForm({
  popupSelector: profilePopupSelector,
  handleFormSubmit: (data) => {
    console.log(data);
    api.uploadUserInfo(data)
    .then((res) => {
      console.log(res);
      userInfo.setUserInfo(res);
    })
    .finally(() => {
      popupWithEditForm.closePopup();
    })
  }
})


popupWithEditForm.setEventListeners();

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

//попап с подтверждением удаления карточки.

// const confirmDeletePopup = new PopupWithForm({
//   popupSelector: confirmDeletePopupSelector,
//   handleFormSubmit: (data) => {
//     console.log(data);
//     confirmDeletePopup.closePopup();
//   }
// })

// ?.addEventListener('click', function handleConfirmDeleteButton(evt) {
//   popupWithAddForm.openPopup();
// });

//попап для загрузки нового аватара.

const editUserpickPopup = new PopupWithForm({
  popupSelector: editUserpickPopupSelector,
  handleFormSubmit: (data) => {
    // console.log(data);
    editUserpickPopup.closePopup();
  }
})

editUserpickPopup.setEventListeners();

editUserpickButton.addEventListener('click', function handleEditUserpickButton(evt) {
  editUserpickPopup.openPopup();
});



// fetch('https://mesto.nomoreparties.co/v1/cohort-20/users/me', {
//   headers: {
//     authorization: '5a191bce-603b-4e04-819b-a182504a8e8f'
//   }
// })
//   .then(res => res.json())
//   .then((result) => {
//     console.log(result);
//   }); 