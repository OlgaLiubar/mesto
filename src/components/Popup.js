export default class Popup {
    constructor(popupElement) {
        this._popupElement = popupElement;
        this._popupCloseButton = this._popupElement.querySelector('.popup__close-button');
    }

    openPopup() {
        this._popupElement.classList.add('popup_opened');
        this.setEventListeners();
    }

    closePopup() {
        this._popupElement.classList.remove('popup_opened');
        this.removeEventListeners();
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
        document.addEventListener('keydown', this._handleEscPress.bind(this));
        document.addEventListener('click', this._handleOverlayClick.bind(this));
    }

    removeEventListeners() {
        this._popupCloseButton.removeEventListener('click', () => this.closePopup())
        document.removeEventListener('keydown', this._handleEscPress.bind(this));
        document.removeEventListener('click', this._handleOverlayClick.bind(this));
    }
}