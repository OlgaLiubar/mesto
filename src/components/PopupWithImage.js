import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._popupPhotoElement = this._popupElement.querySelector('.popup__card-image');
        this._popupCaptionElement = this._popupElement.querySelector('.popup__caption');
    }

    openPopup(name, link) {
        super.openPopup();
        this._popupPhotoElement.src = link;
        this._popupCaptionElement.textContent = name;
    }
}

