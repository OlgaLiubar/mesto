export default class Api {
    constructor(options) {
      this._url = options.url;
      this._headers = options.headers;
    }
  
    getInitialCards() {
      return fetch(`${this._url}cards/`, {
          method: "GET",
          headers: this._headers
      }).then((res) => {
        if(res.ok){
          return res.json();
        }
        return Promise.reject('Server is not available')
      })
      .catch(err => console.log(err))
    }

    getUserData() {
      return fetch(`${this._url}users/me`, {
        method: 'GET',
        headers: this._headers
      }).then((res) => {
        if(res.ok){
          return res.json();
        }
        return Promise.reject('Server is not available')
      })
      .catch(err => console.log(err))
    }
  
    uploadCard(data) {
      return fetch(`${this._url}cards/`, {
          method: "POST",
          headers: this._headers,
          body: JSON.stringify({
            name: data.name,
            link: data.link
          })
      }).then((res) => {
        if(res.ok){
          return res.json();
        }
        return Promise.reject('Server is not available')
      })
      .catch(err => console.log(err))
    }

    removeCard(id) {
      return fetch(`${this._url}cards/${cardId}`, {
          method: "DELETE",
          headers: this._headers,
          // body: JSON.stringify({
          //   name: data.name,
          //   link: data.link
          // })
      }).then((res) => {
        if(res.ok){
          return res.json();
        }
        return Promise.reject('Server is not available')
      })
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
      }).then((res) => {
        if(res.ok){
          return res.json();
        }
        return Promise.reject('Server is not available')
      })
      .catch(err => console.log(err))
    }
  

  }
  
