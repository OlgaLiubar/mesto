import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
    constructor({ popupSelector, handleFormSubmit }) {
        super(popupSelector);
        this._handleFormSubmit = handleFormSubmit;
        this._form = this._popupElement.querySelector('.form');
        this._inputList = Array.from(this._form.querySelectorAll('.form__input'));
        this._handleSubmitEvt = this._handleSubmitEvt.bind(this);
        this._submitButton = this._form.querySelector('.form__save-button');
        this._SubmitButtonInitialText = this._submitButton.textContent;
    }
    
    _handleSubmitEvt(evt) {
        evt.preventDefault();
        this._handleFormSubmit(this._getInputValues());
    }

    _getInputValues() {

        // создаём пустой объект
        this._inputValues = {};

        // добавляем в этот объект значения всех полей
        this._inputList.forEach(input => {
            this._inputValues[input.name] = input.value;
        });

        // возвращаем объект значений
        return this._inputValues;

    }

    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', this._handleSubmitEvt);
    }

    renderLoading(isLoading) {
        const renderLoadingMessage = 'Cохранение...'
        if (isLoading) {
          this._submitButton.textContent = renderLoadingMessage;
        } else {
          this._submitButton.textContent = this._SubmitButtonInitialText;
        }
      }

    closePopup() {
        this._form.reset();
        super.closePopup();
    }
}