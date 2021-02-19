export default class Api {
    constructor(options) {
      this._url = options.url;
      this._headers = options.headers;
    }
  
    _checkResult(res) {
      if(res.ok){
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    }

    getInitialData() {
      return Promise.all([this.getUserData(), this.getInitialCards()]);
    }

    getInitialCards() {
      return fetch(`${this._url}cards/`, {
          method: "GET",
          headers: this._headers
      })
      .then(this._checkResult)
      .catch(err => console.log(err))
    }

    getUserData() {
      return fetch(`${this._url}users/me`, {
        method: 'GET',
        headers: this._headers
      })
      .then(this._checkResult)
      .catch(err => console.log(err))
    }


    uploadCard(data)  {
      return fetch(`${this._url}cards`, {
        method: 'POST',
        headers: this._headers,
        body: JSON.stringify({
          name: data.place,
          link: data.url
        })
      })
      .then(this._checkResult)
      .catch(err => console.log(err))
    }

    deleteCard(data) {
      return fetch(`${this._url}cards/${data}`, {
        method: 'DELETE',
        headers: this._headers
      })
      .then(this._checkResult)
      .catch(err => console.log(err))
    }

    uploadUserInfo(data) {
      return fetch(`${this._url}users/me`, {
        method: 'PATCH',
        headers: this._headers,
        body: JSON.stringify({
          name: data.name,
          about: data.occupation
        })
      })
      .then(this._checkResult)
      .catch(err => console.log(err))
    }

    //аватар
    setUserAvatar(data) {
      return fetch(`${this._url}users/me/avatar`, {
        method: 'PATCH',
        headers: this._headers,
        body: JSON.stringify({
          avatar: data.url
        })
      })
      .then(this._checkResult)
      .catch(err => console.log(err))
  }

    //лайки
    setLike(data) {
      return fetch(`${this._url}cards/likes/${data._id}`, {
        method: 'PUT',
        headers: this._headers,
      }).then(this._checkResult)
      .catch(err => console.log(err))
  }

    deleteLike(data) {
      return fetch(`${this._url}cards/likes/${data._id}`, {
        method: 'DELETE',
        headers: this._headers,
      }).then(this._checkResult)
      .catch(err => console.log(err))
  }
  }

