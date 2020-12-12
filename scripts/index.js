//массив для изначальных карточек

const initialCards = [
  {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
]; 

const galleryContainerElement = document.querySelector('.gallery__elements'); 
const templateElement = document.querySelector('.gallery-template');



function renderGallery() {
  const galleryItems = initialCards.map(composeCard);
  galleryContainerElement.append(...galleryItems);
}

renderGallery();

function composeCard(card){
  const newCard = templateElement.content.cloneNode(true);
  console.log(newCard);

  captionTitleElement = newCard.querySelector('.card__caption-title');
  captionTitleElement.textContent = card.name;
  const cardPhotoElement = newCard.querySelector('.card__photo');
  cardPhotoElement.src = card.link;
  return newCard;
}




// для открытия-скрытия попапа
let profileEditButton = document.querySelector('.profile__edit-button');
let popup = document.querySelector('.popup');
let popupCloseButton = document.querySelector('.popup__close-button');
// для формы
let popupForm = document.querySelector('.form');
let nameInput = document.querySelector('.form__input_type_name');
let jobInput = document.querySelector('.form__input_type_occupation');
let profileTitle = document.querySelector('.profile__title');
let profileOccupation = document.querySelector('.profile__occupation');

// для открытия-скрытия попапа

profileEditButton.addEventListener('click', handleProfileEditButtonClick);
popupCloseButton.addEventListener('click', handlePopupCloseButtonClick);

function handleProfileEditButtonClick() {
  popup.classList.add('popup_opened');
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileOccupation.textContent;
}

function handlePopupCloseButtonClick() {
  popup.classList.remove('popup_opened');
}

// для отправки формы
popupForm.addEventListener('submit', formSubmitHandler);

function formSubmitHandler (evt) {
  evt.preventDefault();
    profileTitle.textContent = nameInput.value;
    profileOccupation.textContent = jobInput.value;
    handlePopupCloseButtonClick();
  }

