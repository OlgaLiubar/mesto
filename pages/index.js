import {
  initialCards,
  config
} from '../utils/constants.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
// import Popup from '../components/Popup.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';

const galleryContainerElement = document.querySelector('.gallery__elements');
const profilePopup = document.querySelector('.popup_type_edit-profile');
const addCardPopup = document.querySelector('.popup_type_add-image');
//для попапа с увеличенным изображением
// const imagePopupPicture = document.querySelector('.popup__card-image');
// const imagePopupCaption = document.querySelector('.popup__caption');
const imagePopup = document.querySelector('.popup_type_view-image');

// для открытия-скрытия попапа профиля
const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button')

//слушатель для всех кнопок "закрыть"
// const popupCloseButtons = document.querySelectorAll('.popup__close-button');

// для формы "редактировать профиль"

const popupEditForm = document.querySelector('.form_type_edit');
// const nameInput = document.querySelector('.form__input_type_name');
// const jobInput = document.querySelector('.form__input_type_occupation');
const profileTitle = document.querySelector('.profile__title');
const profileOccupation = document.querySelector('.profile__occupation');

// для формы "добавить карточку"
const popupAddForm = document.querySelector('.form_type_add');
// const placeInput = document.querySelector('.form__input_type_place');
// const imgUrlInput = document.querySelector('.form__input_type_img-url');
// const addCardSubmitButton = document.querySelector('.form__save-button_type_add');


profileEditButton.addEventListener('click', handleProfileEditButtonClick);
profileAddButton.addEventListener('click', handleProfileAddButtonClick);

//селекторы

const userNameSelector = '.profile__title';
const userInfoSelector = '.profile__occupation';

// для отправки формы "редактировать профиль"
// popupEditForm.addEventListener('submit', handleProfileFormSubmit);

// для отправки формы "добавить карточку"
// popupAddForm.addEventListener('submit', handleNewCardSubmit);

// валидация формы

const profileValidator = new FormValidator(config, popupEditForm);
profileValidator.enableValidation();

const addCardValidator = new FormValidator(config, popupAddForm);
addCardValidator.enableValidation();

function handleCardClick(name, link) {
  const popup = new PopupWithImage(name, link, imagePopup);
  popup.openPopup();
}

function createCard(data) {
  const card = new Card(data, ".gallery-template", handleCardClick);
  const cardElement = card.generateCard();
  return cardElement
}

const cardListSection = '.gallery__elements'

const cardList = new Section({
  data: initialCards,
  renderer: (cardItem) => {
    const cardElement = createCard(cardItem);
    cardList.addItem(cardElement);
  }
}, cardListSection);

cardList.renderItems();



// const popupWithAddForm = new PopupWithForm({
//   popupSelector: addCardPopup,
//   handleFormSubmit: (cardItem) => {
//     const card = new Card({
//       name: cardItem.place,
//       link: cardItem.url,
//     }, ".gallery-template", handleCardClick);
//     const cardElement = card.generateCard();
//     galleryContainerElement.prepend(cardElement);
//     popupWithAddForm.closePopup();
//   }
// });

const popupWithAddForm = new PopupWithForm({
  popupElement: addCardPopup,
  handleFormSubmit: (cardItem) => {
    const cardElement = createCard({
      name: cardItem.place,
      link: cardItem.url,
    }, ".gallery-template", handleCardClick)
    galleryContainerElement.prepend(cardElement);
    popupWithAddForm.closePopup();
    popupWithAddForm.removeEventListeners();
  }
});



// const popupWithEditForm = new PopupWithForm({
//   popupSelector: profilePopup,
//   handleFormSubmit: (data) => {
//     profileTitle.textContent = data.name;
//     profileOccupation.textContent = data.occupation;
//     popupWithEditForm.closePopup();
//   }
// })

const userInfo = new UserInfo({ userNameSelector, userInfoSelector });

const popupWithEditForm = new PopupWithForm({
  popupElement: profilePopup,
  handleFormSubmit: (data) => {
    userInfo.setUserInfo(data);
    popupWithEditForm.closePopup();
  }
})

// function handleProfileEditButtonClick(evt) {
//   evt.preventDefault();
//   nameInput.value = profileTitle.textContent;
//   jobInput.value = profileOccupation.textContent;
//   profileValidator.resetValidation();
//   popupWithEditForm.openPopup();
// }

function handleProfileEditButtonClick(evt) {
  evt.preventDefault();
  const data = userInfo.getUserInfo();
  profileTitle.textContent = data.name;
  profileOccupation.textContent = data.occupation;
  profileValidator.resetValidation();
  popupWithEditForm.openPopup();
}

function handleProfileAddButtonClick(evt) {
  evt.preventDefault();
  // popupAddForm.reset();
  addCardValidator.resetValidation();
  popupWithAddForm.openPopup();
}

