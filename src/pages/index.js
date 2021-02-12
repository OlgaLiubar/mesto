import './index.css';
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

const galleryContainerElement = document.querySelector('.gallery__elements');

//попапы
const profilePopup = document.querySelector('.popup_type_edit-profile');
const addCardPopup = document.querySelector('.popup_type_add-image');
const imagePopup = document.querySelector('.popup_type_view-image');

// кнопки
const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button')


// для формы "редактировать профиль"

const popupEditForm = document.querySelector('.form_type_edit');
const profileTitle = document.querySelector('.profile__title');
const profileOccupation = document.querySelector('.profile__occupation');

// для формы "добавить карточку"
const popupAddForm = document.querySelector('.form_type_add');


//селекторы
const imagePopupSelector = '.popup_type_view-image';
const addCardPopupSelector = '.popup_type_add-image';
const profilePopupSelector = '.popup_type_edit-profile';
const userNameSelector = '.profile__title';
const userInfoSelector = '.profile__occupation';

// валидация формы

const profileValidator = new FormValidator(config, popupEditForm);
profileValidator.enableValidation();

const addCardValidator = new FormValidator(config, popupAddForm);
addCardValidator.enableValidation();

// попап с большим изображением

const popupWithImage = new PopupWithImage(imagePopupSelector);
popupWithImage.setEventListeners();

function handleCardClick(name, link) {
  popupWithImage.openPopup(name, link);
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


const popupWithAddForm = new PopupWithForm({
  popupSelector: addCardPopupSelector,
  handleFormSubmit: (cardItem) => {
    const cardElement = createCard({
      name: cardItem.place,
      link: cardItem.url,
    }, ".gallery-template", handleCardClick)
    cardList.prependItem(cardElement);
    popupWithAddForm.closePopup();
  }
});

popupWithAddForm.setEventListeners();



const userInfo = new UserInfo({ userNameSelector, userInfoSelector });

const popupWithEditForm = new PopupWithForm({
  popupSelector: profilePopupSelector,
  handleFormSubmit: (data) => {
    userInfo.setUserInfo(data);
    popupWithEditForm.closePopup();
  }
})

popupWithEditForm.setEventListeners();


profileEditButton.addEventListener('click', function handleProfileEditButtonClick(evt) {
  const data = userInfo.getUserInfo();
  profileTitle.textContent = data.name;
  profileOccupation.textContent = data.occupation;
  profileValidator.resetValidation();
  popupWithEditForm.openPopup();
});

profileAddButton.addEventListener('click', function handleProfileAddButtonClick(evt) {
  addCardValidator.resetValidation();
  popupWithAddForm.openPopup();
});


