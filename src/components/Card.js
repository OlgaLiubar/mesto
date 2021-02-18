export default class Card {

    constructor(data, cardSelector, ownerId, {handleCardClick, setLike, deleteLike, handleDeleteCardClick}) {
        this._data = data;
        this._name = data.name;
        this._link = data.link;
        this._cardSelector = cardSelector;
        this._handleCardClick = handleCardClick;
        this._cardTemplate = document.querySelector(cardSelector).content.querySelector('.card');
        this._ownerId = ownerId;
        this._setLike = setLike;
        this._deleteLike = deleteLike;
        this._handleDeleteCardClick = handleDeleteCardClick;
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

        //присвоить карточке id
        this._element.setAttribute('id', `${this._data._id}`);

        //показываем счетчик лайков
        this.setLikeCount(this._data.likes.length);

        //повесить обработчики
        this._setEventListeners();

        //кнопка лайка
        this._likeButton = this._element.querySelector('.card__like-btn');

        return this._element;
    }

    //для удаления карточки
    // _deleteCard() {
    //   this._handleCardRequest(this._element.id, "DELETE").catch((err) =>
    //     console.log(err)
    //   );

    // this._element.remove();
    // this._element = null;
    // }
    //для лайка

    _like(data) {
        this._likeButton.classList.add("card__like-btn_active");
        this._setLike(data);
      }

    _dislike(data) {
        this._likeButton.classList.remove("card__like-btn_active");
        this._deleteLike(data);
      }

    setLikeCount(count){
        this._element.querySelector(".card__likes-count").textContent = count;
    }


    _setEventListeners() {
        //повесить на кнопку удаления слушатель клика
        this._element.querySelector('.card__delete-button').addEventListener('click', () => {
            this._handleDeleteCardClick(this._data);
        });
        //повесить на фотографию карточки слушатель клика
        this._cardImage.addEventListener('click', () => {
          this._handleCardClick(this._data);
        });

        //повесить на кнопку лайка слушатель клика
        this._element.querySelector('.card__like-btn').addEventListener('click', () => {
            if (this._likeButton.classList.contains("card__like-btn_active")) {
                this._dislike(this._data);
              } else {
                this._like(this._data);
              }
        });
    }
}

