import FilmCard from './models/film-card.js';

const Method = {
  GET: `GET`,
  POST: `POST`,
  PUT: `PUT`,
  DELETE: `DELETE`,
};

const checkStatus = response => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    throw new Error(`${response.status}: ${response.statusText}`);
  }
};

const API = class {
  constructor(endPoint, authorization) {
    this._endPoint = endPoint;
    this._authorization = authorization;
  }
  getCards() {
    return this._load({ url: `movies` })
      .then(response => response.json())
      .then(FilmCard.parseCards);
  }

  updateCard(id, data) {
    return this._load({
      url: `movies/${id}`,
      method: Method.PUT,
      body: JSON.stringify(data.toRAW()),
      headers: new Headers({ 'Content-Type': `application/json` }),
    })
      .then(response => response.json())
      .then(FilmCard.parseCard);
  }

  _load({ url, method = Method.GET, body = null, headers = new Headers() }) {
    headers.append(`Authorization`, this._authorization);

    return fetch(`${this._endPoint}/${url}`, { method, body, headers })
      .then(checkStatus)
      .catch(err => {
        throw err;
      });
  }
  getComments(filmId) {
    return this._load({ url: `comments/${filmId}` }).then(response => response.json());
  }
  createComment({ comment, cardId }) {
    return this._load({
      url: `comments/${cardId}`,
      method: `POST`,
      body: JSON.stringify(comment),
      headers: new Headers({ 'Content-Type': `application/json` }),
    }).then(response => response.json());
  }

  deleteComment({ commentIndex }) {
    console.log(commentIndex);
    console.log(this._load({ url: `comments/${commentIndex}`, method: `DELETE` }));
    return this._load({ url: `comments/${commentIndex}`, method: `DELETE` });
  }
};

export default API;
