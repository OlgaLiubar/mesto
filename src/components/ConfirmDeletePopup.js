import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
    constructor({ popupSelector, handleFormSubmit }) {
        super(popupSelector);
        this._handleFormSubmit = handleFormSubmit;
        this._form = this._popupElement.querySelector('.form');
        this._inputList = Array.from(this._form.querySelectorAll('.form__input'));
        this._handleSubmitEvt = this._handleSubmitEvt.bind(this);
    }

    _handleSubmitEvt(evt) {
        evt.preventDefault();
        this._handleFormSubmit(this._data);
    }

    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', this._handleSubmitEvt);
    }

    openPopup(data) {

      this._data = data
        super.openPopup();
    }
}
