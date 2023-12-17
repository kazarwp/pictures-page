class Api {
  constructor(config) {
    this._url = config.url;
    this._token = config.token
  }

  _checkResponse(res) {
      if (res.ok) {
        return res.json()
      }
      else{
        return Promise.reject(`Ошибка: ${res.status}`); 
      }
    }

  getInfoAboutUser() {
    return fetch(`${this._url}/v1/cohort-63/users/me`, {
      headers: {
        authorization: this._token
      }
    })
    .then(res => this._checkResponse(res))
  }

  getStartCards() {
    return fetch(`${this._url}/v1/cohort-63/cards`, {
      headers: {
        authorization: this._token
      }
    })
    .then(res => this._checkResponse(res))
  }

  changeUserInfo(data) {
    return fetch(`${this._url}/v1/cohort-63/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: data.name,
        about: data.about
      })
    })
    .then(res => this._checkResponse(res))
  }

  addCardInProfile(data) {
    return fetch(`${this._url}/v1/cohort-63/cards`, {
      method: 'POST',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: data.name,
        link: data.link
      })
    })
    .then(res => this._checkResponse(res))
  }

  removeCard(cardId) {
    return fetch(`${this._url}/v1/cohort-63/cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
    })
    .then(res => this._checkResponse(res))
  }

  updateAvatarProfile(avatarId) {
    return fetch(`${this._url}/v1/cohort-63/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        avatar: avatarId
      })
    })
    .then(res => this._checkResponse(res))
    }

  setLikeCard(cardId){
    return fetch(`${this._url}/v1/cohort-63/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
    })
    .then(res => this._checkResponse(res))
  }

  changeLikeCardStatus(cardId, isLiked) {
    return fetch(`${this._url}/v1/cohort-63/cards/${cardId}/likes`, {
      method: `${isLiked ? 'PUT' : 'DELETE'}`,
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
    })
    .then(res => this._checkResponse(res))
  }

  deleteLikeCard(cardId) {
    return fetch(`${this._url}/v1/cohort-63/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
    })
    .then(res => this._checkResponse(res))
  }
}

const api = new Api({
  url: "https://mesto.nomoreparties.co",
  token: "9617fcb2-9d54-41e1-bc10-b070b15326e3"
})

export default api

