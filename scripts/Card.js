function openPopup(popup) {
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', handleEscPress);
    document.addEventListener('click', handleOverlayClick);
}

function closePopup(popup) {
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', handleEscPress);
    document.removeEventListener('click', handleOverlayClick);
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

export default class Card {

    constructor(data, cardSelector) {
        //поставить в подпись имя из объекта карточек
        this._name = data.name;
        //прописать фото карточки ссылку 
        this._link = data.link;
        this._cardSelector = document.querySelector('.gallery-template').content.querySelector('.card');
    }

    _getTemplate() {
        //клонировать темплейт
        const cardElement = document.querySelector('.gallery-template').content.querySelector('.card').cloneNode(true);
        // this._cardElement = this._cardSelector.cloneNode(true);
        return cardElement;
    }

    generateCard() {
        this._element = this._getTemplate();
        //повесить обработчики
        this._setEventListeners();

        const cardPhotoElement = this._element.querySelector('.card__photo');
        //прописать фото карточки ссылку и альт
        cardPhotoElement.src = this._link;
        cardPhotoElement.alt = this._name;

        //поставить в подпись имя из объекта карточек
        this._element.querySelector('.card__caption-title').textContent = this._name;

        return this._element;
    }

    _setEventListeners() {
        //повесить на кнопку удаления слушатель клика
        this._element.querySelector('.card__delete-button').addEventListener('click', () => {
            this._handleDeleteCardButtonClick();
        });
        //повесить на фотографию карточки слушатель клика
        this._element.querySelector('.card__photo').addEventListener('click', () => {
            this._handleGalleryImageClick();
        });
        //повесить на кнопку лайка слушатель клика
        this._element.querySelector('.card__like-btn').addEventListener('click', () => {
            this._handleLike();
        });
    }

    //для удаления карточки
    _handleDeleteCardButtonClick = () => {
        this._element.remove();
    }
    //для лайка
    _handleLike() {
        this._element.querySelector('.card__like-btn').classList.toggle("card__like-btn_active");
    }

    //для открытия попапа с просмотром изображения
    _handleGalleryImageClick = () => {
        openPopup(document.querySelector('.popup_type_view-image'));

        document.querySelector('.popup__card-image').src = this._link;
        document.querySelector('.popup__card-image').alt = this._name;
        document.querySelector('.popup__caption').textContent = this._name;
    }
}