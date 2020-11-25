// для открытия-скрытия попапа
let profileEditButton = document.querySelector('.profile__edit-button');
let popup = document.querySelector('.popup');
let popupCloseButton = document.querySelector('.popup__close-button');
// для формы
let popupForm = document.querySelector('.popup__form');
let nameInput = document.querySelector('.form__input_name');
let jobInput = document.querySelector('.form__input_occupation');
let profileTitle = document.querySelector('.profile__title');
let profileOccupation = document.querySelector('.profile__occupation');
let profileSaveButton = document.querySelector('.form__button');

// для открытия-скрытия попапа

profileEditButton.addEventListener('click', handleProfileEditButtonClick);
popupCloseButton.addEventListener('click', handlePopupCloseButtonClick);

function handleProfileEditButtonClick() {
  popup.classList.add('popup_opened');
}

function handlePopupCloseButtonClick() {
  popup.classList.remove('popup_opened');
}

// для отправки формы
popupForm.addEventListener('submit', formSubmitHandler);
profileSaveButton.addEventListener('click', handlePopupCloseButtonClick);

function formSubmitHandler (evt) {
  evt.preventDefault();
    profileTitle.textContent = nameInput.value;
    profileOccupation.textContent = jobInput.value;
  }

