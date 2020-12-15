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
const addCardPopup = document.querySelector('.popup_type_add-image');
const viewImagePopup = document.querySelector('.popup_type_view-image');

function renderGallery() {
  const galleryItems = initialCards.map(composeCard);
  galleryContainerElement.append(...galleryItems);
}

renderGallery();

function composeCard(card){
  const newCard = templateElement.content.cloneNode(true);
  const captionTitleElement = newCard.querySelector('.card__caption-title');
  captionTitleElement.textContent = card.name;
  const cardPhotoElement = newCard.querySelector('.card__photo');
  cardPhotoElement.src = card.link;
  cardPhotoElement.alt = card.name;
  const deleteCardButton = newCard.querySelector('.card__delete-button');
  deleteCardButton.addEventListener('click', handleDeleteCardButtonClick);
  cardPhotoElement.addEventListener('click', handleGalleryImageClick);
  const likeButton = newCard.querySelector('.card__like-btn');
  likeButton.addEventListener('click', handleLike);
  return newCard;
}

// для открытия-скрытия попапа профиля
const profileEditButton = document.querySelector('.profile__edit-button');
const profilePopup = document.querySelector('.popup_type_edit-profile');
const profileAddButton = document.querySelector('.profile__add-button')

profileEditButton.addEventListener('click', handleProfileEditButtonClick);
profileAddButton.addEventListener('click', handleProfileAddButtonClick);

//слушатель для всех кнопок "закрыть"
const popupCloseButtons = document.querySelectorAll('.popup__close-button');

popupCloseButtons.forEach(function (button) {
  button.addEventListener('click', handlePopupCloseButtonClick);
});

//функции для открытия и закрытия попапов

function openPopup(popup) {
  popup.classList.add('popup_opened');
}
function closePopup(popup) {
  popup.classList.remove('popup_opened');
} 


function handleProfileEditButtonClick() {
  openPopup(profilePopup);
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileOccupation.textContent;
}

function handleProfileAddButtonClick() {
  openPopup(addCardPopup)
}

function handlePopupCloseButtonClick(evt) {
  const targetItem = evt.target.closest('.popup');
  closePopup(targetItem)
}

// для формы "редактировать профиль"

const popupEditForm = document.querySelector('.form_type_edit');
const nameInput = document.querySelector('.form__input_type_name');
const jobInput = document.querySelector('.form__input_type_occupation');
const profileTitle = document.querySelector('.profile__title');
const profileOccupation = document.querySelector('.profile__occupation');


// для отправки формы "редактировать профиль"
popupEditForm.addEventListener('submit', editFormSubmitHandler);

function editFormSubmitHandler(evt) {
  evt.preventDefault();
    profileTitle.textContent = nameInput.value;
    profileOccupation.textContent = jobInput.value;
    closePopup(profilePopup);
  }

// для формы "добавить карточку"
const popupAddForm = document.querySelector('.form_type_add');
const placeInput = document.querySelector('.form__input_type_place');
const imgUrlInput = document.querySelector('.form__input_type_img-url');

// для отправки формы "добавить карточку"
popupAddForm.addEventListener('submit', addFormSubmitHandler);

function addFormSubmitHandler(evt) {
  evt.preventDefault();
  const galleryItem = composeCard({
    name: placeInput.value,
    link: imgUrlInput.value
    });
  galleryContainerElement.prepend(galleryItem);
  closePopup(addCardPopup)
  popupAddForm.reset()
}

  //для удаления карточки

function handleDeleteCardButtonClick (evt) {
  const targetImage = evt.target;
  const targetCard = targetImage.closest('.gallery__element');
  targetCard.remove();
}

//для открытия попапа с просмотром изображения

function handleGalleryImageClick(evt) {
  openPopup(viewImagePopup); 
  const popupCardPhoto = document.querySelector('.popup__card-image');
  popupCardPhoto.src = evt.target.src;
  const popupCardCaption = document.querySelector('.popup__caption'); 
  popupCardCaption.textContent = evt.target.alt;
}

//для лайка

function handleLike(evt){
  evt.target.classList.toggle("card__like-btn_active");
}
