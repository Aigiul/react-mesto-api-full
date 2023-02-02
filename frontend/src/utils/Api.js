import { config } from "./constants.js";
class Api {
  constructor(host, token, cardId) {
    this._host = host;
    this._token = token;
    this._cardId = cardId;
    this._getJsonOrError = this._getJsonOrError.bind(this);
    this._getHeaders = this._getHeaders.bind(this);
  }

  _getJsonOrError(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  _getHeaders() {
    return {
      authorization: this._token,
      "Content-Type": "application/json",
    };
  }

  // метод получения списка карточек

  getInitialCards() {
    return fetch(`${this._host}/cards`, {
      method: "GET",
      headers: this._getHeaders(),
    }).then(this._getJsonOrError);
  }

  //метод добавления карточки на сервер

  addCard(data) {
    return fetch(`${this._host}/cards`, {
      method: "POST",
      headers: this._getHeaders(),
      body: JSON.stringify(data),
    }).then(this._getJsonOrError);
  }

  changeLikeCardStatus(cardId, setIsLiked) {
    this._status = setIsLiked ? this.putLike(cardId) : this.deleteLike(cardId);
    return this._status;
  }

  //метод простановки лайка у карточки

  putLike(cardId) {
    return fetch(`${this._host}/cards/${cardId}/likes`, {
      method: "PUT",
      headers: this._getHeaders(),
    }).then(this._getJsonOrError);
  }

  //метод удаления лайка у карточки

  deleteLike(cardId) {
    return fetch(`${this._host}/cards/${cardId}/likes`, {
      method: "DELETE",
      headers: this._getHeaders(),
    }).then(this._getJsonOrError);
  }

  // метод удаления картчоки

  deleteCard(cardId) {
    return fetch(`${this._host}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._getHeaders(),
    }).then(this._getJsonOrError);
  }

  //метод получения информации о юзере

  getUserInfo() {
    return fetch(`${this._host}/users/me`, {
      method: "GET",
      headers: this._getHeaders(),
    }).then(this._getJsonOrError);
  }

  //метод обновления информации о юзере

  addProfileInfo(data) {
    return fetch(`${this._host}/users/me`, {
      method: "PATCH",
      headers: this._getHeaders(),
      body: JSON.stringify(data),
    }).then(this._getJsonOrError);
  }

  //метод измененния аватара

  newAvatar(data) {
    return fetch(`${this._host}/users/me/avatar`, {
      method: "PATCH",
      headers: this._getHeaders(),
      body: JSON.stringify(data),
    }).then(this._getJsonOrError);
  }
}

export const api = new Api(config.host, config.token);
