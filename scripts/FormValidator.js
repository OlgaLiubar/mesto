
export default class FormValidator {

  constructor(config, formElement) {
    this._config = config;
    this._formElement = formElement;
    this._inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
    this._buttonElement = formElement.querySelector(config.submitButtonSelector);
  }

  enableValidation = () => {
    const forms = document.querySelectorAll('.form');
    forms.forEach((formElement) => {
      formElement.addEventListener('submit', (evt) => {
        evt.preventDefault();
      });

      this._setEventListeners();

    });
  }

  _setEventListeners = () => {

    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', (evt) => {
        this._checkInputValidity(inputElement)
        this._setButtonState()
      })
    });
  }

  _setButtonState = () => {
    if (this._formElement.checkValidity()) {
      this._buttonElement.classList.remove(this._config.buttonInvalidSelector);
      this._buttonElement.disabled = false;
    } else {
      this._buttonElement.classList.add(this._config.buttonInvalidSelector);
      this._buttonElement.disabled = true;
    }
  }

  _checkInputValidity = (inputElement) => {
    if (inputElement.validity.valid) {
      this._hideError(inputElement);
    } else {
      this._showError(inputElement);
    }
  }

  _showError = (inputElement) => {
    const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
    errorElement.textContent = inputElement.validationMessage;
    inputElement.classList.add(this._config.inputInvalidSelector);
  }

  _hideError = (inputElement) => {
    const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
    errorElement.textContent = "";
    inputElement.classList.remove(this._config.inputInvalidSelector);
  }

}
