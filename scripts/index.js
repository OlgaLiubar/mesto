import Card from './Card.js';
import FormValidator from './FormValidator.js';

const galleryContainerElement = document.querySelector('.gallery__elements');
const profilePopup = document.querySelector('.popup_type_edit-profile');
const addCardPopup = document.querySelector('.popup_type_add-image');

// для открытия-скрытия попапа профиля
const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button')

//слушатель для всех кнопок "закрыть"
const popupCloseButtons = document.querySelectorAll('.popup__close-button');

// для формы "редактировать профиль"

const popupEditForm = document.querySelector('.form_type_edit');
const nameInput = document.querySelector('.form__input_type_name');
const jobInput = document.querySelector('.form__input_type_occupation');
const profileTitle = document.querySelector('.profile__title');
const profileOccupation = document.querySelector('.profile__occupation');

// для формы "добавить карточку"
const popupAddForm = document.querySelector('.form_type_add');
const placeInput = document.querySelector('.form__input_type_place');
const imgUrlInput = document.querySelector('.form__input_type_img-url');
const addCardSubmitButton = document.querySelector('.form__save-button_type_add');


function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', handleEscPress);
  document.addEventListener('click', handleOverlayClick);
}

function handleEscPress(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}

function handleOverlayClick(evt) {
  if (evt.target.classList.contains('popup_opened')) {
    closePopup(evt.target);
  }
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', handleEscPress);
  document.removeEventListener('click', handleOverlayClick);
}

// Рендер карточки
initialCards.forEach((item) => {
  const card = new Card(item, 'gallery-template');
  const cardElement = card.generateCard();
  document.querySelector('.gallery__elements').append(cardElement);
});

function handleProfileEditButtonClick() {
  openPopup(profilePopup);
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileOccupation.textContent;
}

function handleProfileAddButtonClick() {
  openPopup(addCardPopup)

  if (popupAddForm.checkValidity()) {
    addCardSubmitButton.classList.remove(config.buttonInvalidSelector);
    addCardSubmitButton.disabled = false;
  } else {
    addCardSubmitButton.classList.add(config.buttonInvalidSelector);
    addCardSubmitButton.disabled = true;
  }
}

function handlePopupCloseButtonClick(evt) {
  const targetItem = evt.target.closest('.popup');
  closePopup(targetItem)
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileOccupation.textContent = jobInput.value;
  closePopup(profilePopup);
}

function handleNewCardSubmit(evt) {
  evt.preventDefault();

  const newCard = new Card({
    name: placeInput.value,
    link: imgUrlInput.value
  });

  const card = newCard.generateCard();
  galleryContainerElement.prepend(card);
  closePopup(addCardPopup)
  popupAddForm.reset()
}


popupCloseButtons.forEach(function (button) {
  button.addEventListener('click', handlePopupCloseButtonClick);
});

profileEditButton.addEventListener('click', handleProfileEditButtonClick);
profileAddButton.addEventListener('click', handleProfileAddButtonClick);

// для отправки формы "редактировать профиль"
popupEditForm.addEventListener('submit', handleProfileFormSubmit);

// для отправки формы "добавить карточку"
popupAddForm.addEventListener('submit', handleNewCardSubmit);

// валидация формы

const config = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__save-button',
  buttonInvalidSelector: 'form__save-button_invalid',
  inputInvalidSelector: 'form__input_state_invalid'
};

const formsList = Array.from(document.querySelectorAll('.form'));
formsList.forEach((item) => {
  const formValidation = new FormValidator(config, item);
  formValidation.enableValidation();
});
