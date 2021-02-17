export default class Card {

    constructor({ name, link }, cardSelector, handleCardClick, ownerId) {
        this._data = data;
        this._name = name;
        this._link = link;
        this._cardSelector = cardSelector;
        this._handleCardClick = handleCardClick;
        this._cardTemplate = document.querySelector(cardSelector).content.querySelector('.card');
        // this._apiInstance = apiInstance;
        this._ownerId = ownerId;
    }

    _getTemplate() {
        //клонировать темплейт
        const cardElement = this._cardTemplate.cloneNode(true);
        return cardElement;
    }

    _checkIsMyCard() {
        if (this._data.owner._id !== this._ownerId) {
            this._element.querySelector(".card__delete-button").style.display = "none";
          }
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
        
        //скрыть кнопку "удалить" для чужих карточек
        this._checkIsMyCard();
        
        //повесить обработчики
        this._setEventListeners();

        return this._element;
    }

    _saveCard =  (data) => {
        this._apiInstance
        .uploadCard(data)
        .then((resData) => this.generateCard(resData.name))
        .catch(err = console.log(err))
    }

    _setEventListeners() {
        //повесить на кнопку удаления слушатель клика
        this._element.querySelector('.card__delete-button').addEventListener('click', () => {
            this._handleDeleteCardButtonClick();
        });
        //повесить на фотографию карточки слушатель клика
        this._cardImage.addEventListener('click', () => {
            this._handleCardClick(this._name, this._link);
        });

        //повесить на кнопку лайка слушатель клика
        this._element.querySelector('.card__like-btn').addEventListener('click', () => {
            this._handleLike();
        });
    }

    //для удаления карточки
    _handleDeleteCardButtonClick() {
        this._apiInstance
        .removeCard(this._id)
        .then(()=>{
            this._element.remove();
            this._element = null;
        })
        .catch((err) => console.log(err))
    }
    //для лайка
    _handleLike() {
        this._element.querySelector('.card__like-btn').classList.toggle("card__like-btn_active");
    }
}

