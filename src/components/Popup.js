export default class Popup {
    constructor(popupSelector) {
        this._popupSelector = popupSelector;
        this._popupElement = document.querySelector(this._popupSelector);
        this._popupCloseButton = this._popupElement.querySelector('.popup__close-button');
        this._handleEscPress = this._handleEscPress.bind(this);
    }

    openPopup() {
        this._popupElement.classList.add('popup_opened');
        document.addEventListener('keydown', this._handleEscPress);
    }

    closePopup() {
        this._popupElement.classList.remove('popup_opened');
        document.removeEventListener('keydown', this._handleEscPress);
    }

    _handleEscPress(evt) {
        //содержит логику закрытия попапа клавишей Esc
        if (evt.key === 'Escape') {
            this.closePopup();
        }
    }

    _handleOverlayClick(evt) {
        if (evt.target.classList.contains('popup_opened')) {
            this.closePopup();
        }
    }

    setEventListeners() {
        this._popupCloseButton.addEventListener('click', () => this.closePopup())
        this._popupElement.addEventListener('click', this._handleOverlayClick.bind(this));
    }

}