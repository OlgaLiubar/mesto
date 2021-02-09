import Popup from './Popup.js';
import {
    initialCards
} from '../utils/constants.js';

export default class PopupWithImage extends Popup {
    constructor(name, link, popupSelector) {
        super(popupSelector);
        this._name = name;
        this._link = link;
        this._popupPhotoElement = document.querySelector('.popup__card-image');
        this._popupCaptionElement = document.querySelector('.popup__caption');
    }

    openPopup(name, link) {
        // super._popupSelector.classList.add('popup_opened');
        super.openPopup();
        this._popupPhotoElement.src = this._link;
        this._popupCaptionElement.textContent = this._name;
    }
}

