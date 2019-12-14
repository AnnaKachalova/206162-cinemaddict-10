import {createElement} from '../utils.js';
import PopupComponent from './popup.js';

const createFilmCardComponent = (film) => {
  const {
    title,
    poster,
    description,
    rating,
    productionYear,
    duration,
    genre,
    isWatchlist,
    isHistory,
    isFavorite,
    comments
  } = film;
  const watchlistClass = isWatchlist ? `film-card__controls-item--active` : ``;
  const historyClass = isHistory ? `film-card__controls-item--active` : ``;
  const favoriteClass = isFavorite ? `film-card__controls-item--active` : ``;
  return `<article class="film-card">
    <h3 class="film-card__title">${title}</h3>
        <p class="film-card__rating">${rating}</p>
        <p class="film-card__info">
        <span class="film-card__year">${productionYear}</span>
        <span class="film-card__duration">${duration}</span>
        <span class="film-card__genre">${genre}</span>
        </p>
        <img src="./images/posters/${poster}.jpg" alt="" class="film-card__poster">
        <p class="film-card__description">${description}</p>
        <a class="film-card__comments">${comments.length} comments</a>
    <form class="film-card__controls">
        <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist ${watchlistClass}">Add to watchlist</button>
        <button class="film-card__controls-item button film-card__controls-item--mark-as-watched ${historyClass}">Mark as watched</button>
        <button class="film-card__controls-item button film-card__controls-item--favorite ${favoriteClass}">Mark as favorite</button>
    </form>
</article>`;
};
export default class FilmCard {
  constructor(film) {
    this._element = null;
    this._film = film;
    this.popup = new PopupComponent(this._film);
  }

  getTemplate() {
    return createFilmCardComponent(this._film);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }

  onClick() {
    this.popup.showElement();
  }
}
