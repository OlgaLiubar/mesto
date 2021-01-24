
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

    constructor(data, cardSelector, handleCardClick) {
        this._name = data.name;
        this._link = data.link;
        this._cardSelector = cardSelector;
        this._handleCardClick = handleCardClick;
        this._cardTemplate = document.querySelector(cardSelector).content.querySelector('.card');
    }

    _getTemplate() {
        //клонировать темплейт
        const cardElement = this._cardTemplate.cloneNode(true);
        return cardElement;
    }

    generateCard() {
        this._element = this._getTemplate();

        const cardPhotoElement = this._element.querySelector('.card__photo');
        this._cardImage = cardPhotoElement;
        //прописать фото карточки ссылку и альт
        this._cardImage.src = this._link;
        this._cardImage.alt = this._name;

        //поставить в подпись имя из объекта карточек
        this._element.querySelector('.card__caption-title').textContent = this._name;

        //повесить обработчики
        this._setEventListeners();

        return this._element;
    }

    _setEventListeners() {
        //повесить на кнопку удаления слушатель клика
        this._element.querySelector('.card__delete-button').addEventListener('click', () => {
            this._handleDeleteCardButtonClick();
        });
        //повесить на фотографию карточки слушатель клика
        // this._element.querySelector('.card__photo').addEventListener('click', () => {
        //     this._handleGalleryImageClick();
        // });

        this._cardImage.addEventListener('click', () => {
            this._handleCardClick(this._name, this._link)
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
}

