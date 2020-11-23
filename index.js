// выбираем узлы
const headerButtonNode = document.querySelector('.header__button');
const popupNode = document.querySelector('.popup');
const popupCloseButtonNode = document.querySelector('.popup__close-button');
// для формы
const leadTitleNode = document.querySelector('.lead__title');
const formNode = document.querySelector('.form');
const formInputNode = document.querySelector('.form__input');
const formButtonNode = document.querySelector('.form__button');


// для открытия-скрытия попапа

headerButtonNode.addEventListener('click', handleHeaderButtonClick);
popupCloseButtonNode.addEventListener('click', handlePopupCloseButtonClick);

function handleHeaderButtonClick() {
  popupNode.classList.add('popup_visible');
}

function handlePopupCloseButtonClick() {
  popupNode.classList.remove('popup_visible');
}

// для формы
formNode.addEventListener('submit', )

function handleFormSubmit(event) {
  event.preventDefault();
  leadTitleNode.textContent =  formInputNode.value;
}
