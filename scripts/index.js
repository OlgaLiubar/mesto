const galleryContainerElement = document.querySelector('.gallery__elements'); 
const templateElement = document.querySelector('.gallery-template');
const profilePopup = document.querySelector('.popup_type_edit-profile');
const addCardPopup = document.querySelector('.popup_type_add-image');
const viewImagePopup = document.querySelector('.popup_type_view-image');
const popupCardPhoto = document.querySelector('.popup__card-image');
const popupCardCaption = document.querySelector('.popup__caption'); 

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

function  handleEscPress(evt) {
  if(evt.key === 'Escape') {
     const openedPopup = document.querySelector('.popup_opened');
     closePopup(openedPopup);
  }
}

function handleOverlayClick(evt) {
  if(evt.target.classList.contains('popup_opened')){
    closePopup(evt.target); 
  }
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', handleEscPress);
  document.removeEventListener('click', handleOverlayClick);
} 

//для открытия попапа с просмотром изображения

function handleGalleryImageClick(card) {
  openPopup(viewImagePopup); 
  popupCardPhoto.src = card.link;
  popupCardPhoto.alt = card.name;
  popupCardCaption.textContent = card.name;
}

//для лайка

function handleLike(evt){
  evt.target.classList.toggle("card__like-btn_active");
}

//для удаления карточки

function handleDeleteCardButtonClick (evt) {
  evt.target.closest('.gallery__element').remove();
}

function composeCard(card){
  const newCard = templateElement.content.cloneNode(true);
  const captionTitleElement = newCard.querySelector('.card__caption-title');
  captionTitleElement.textContent = card.name;
  const cardPhotoElement = newCard.querySelector('.card__photo');
  cardPhotoElement.src = card.link;
  cardPhotoElement.alt = card.name;
  const deleteCardButton = newCard.querySelector('.card__delete-button');
  deleteCardButton.addEventListener('click', handleDeleteCardButtonClick);
  cardPhotoElement.addEventListener('click', () => {
    handleGalleryImageClick(card)
  });
  const likeButton = newCard.querySelector('.card__like-btn');
  likeButton.addEventListener('click', handleLike);
  return newCard;
}

function renderGallery() {
  const galleryItems = initialCards.map(composeCard);
  galleryContainerElement.append(...galleryItems);
}

function handleProfileEditButtonClick() {
  openPopup(profilePopup);
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileOccupation.textContent;
}

function handleProfileAddButtonClick() {
  openPopup(addCardPopup)
  setButtonState(addCardSubmitButton, popupAddForm.checkValidity(), validationConfig);
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
  const galleryItem = composeCard({
    name: placeInput.value,
    link: imgUrlInput.value
    });
  galleryContainerElement.prepend(galleryItem);
  closePopup(addCardPopup)
  popupAddForm.reset()
}

renderGallery();

popupCloseButtons.forEach(function (button) {
  button.addEventListener('click', handlePopupCloseButtonClick);
});

profileEditButton.addEventListener('click', handleProfileEditButtonClick);
profileAddButton.addEventListener('click', handleProfileAddButtonClick);

// для отправки формы "редактировать профиль"
popupEditForm.addEventListener('submit', handleProfileFormSubmit);

// для отправки формы "добавить карточку"
popupAddForm.addEventListener('submit', handleNewCardSubmit);
