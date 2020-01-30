import AbstractComponent from './abstract-component.js';
import {formatDuration, formatYear} from '../utils/common.js';

const MAX_DESCRIPTION_LENGTH = 140;

const createFilmCardComponent = film => {
  const {
    title,
    poster,
    description,
    rating,
    duration,
    genre,
    releaseDate,
    isHistory,
    isWatchlist,
    isFavorite,
  } = film;

  const comments = film[`comments`];

  const newDescription =
    description.length > MAX_DESCRIPTION_LENGTH
      ? `${description.slice(0, 139)}...`
      : description;

  const watchlistClass = isWatchlist ? `film-card__controls-item--active` : ``;
  const historyClass = isHistory ? `film-card__controls-item--active` : ``;
  const favoriteClass = isFavorite ? `film-card__controls-item--active` : ``;

  return `<article class="film-card">
    <h3 class="film-card__title">${title}</h3>
        <p class="film-card__rating">${rating}</p>
        <p class="film-card__info">
        <span class="film-card__year">${formatYear(releaseDate)}</span>
        <span class="film-card__duration">${formatDuration(duration)}</span>
        <span class="film-card__genre">${genre}</span>
        </p>
        <img src="./${poster}" alt="" class="film-card__poster">
        <p class="film-card__description">${
          newDescription.length > 1 ? newDescription : ''
        }</p>
        <a class="film-card__comments">${comments.length} comments</a>
    <form class="film-card__controls">
        <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist ${watchlistClass}">Add to watchlist</button>
        <button class="film-card__controls-item button film-card__controls-item--mark-as-watched ${historyClass}">Mark as watched</button>
        <button class="film-card__controls-item button film-card__controls-item--favorite ${favoriteClass}">Mark as favorite</button>
    </form>
</article>`;
};
export default class FilmCard extends AbstractComponent {
  constructor(film) {
    super();
    this._film = film;
  }

  getTemplate() {
    return createFilmCardComponent(this._film);
  }
  setPosterClickHandler(handler) {
    this.getElement()
      .querySelector(`.film-card__poster`)
      .addEventListener(`click`, handler);
  }
  setTitleClickHandler(handler) {
    this.getElement()
      .querySelector(`.film-card__title`)
      .addEventListener(`click`, handler);
  }
  setCommentBlockClickHandler(handler) {
    this.getElement()
      .querySelector(`.film-card__comments`)
      .addEventListener(`click`, handler);
  }

  onWatchlistButtonClick(element) {
    this.getElement()
      .querySelector(`.film-card__controls-item--add-to-watchlist`)
      .addEventListener(`click`, element);
  }
  onWatchedButtonClick(element) {
    this.getElement()
      .querySelector(`.film-card__controls-item--mark-as-watched`)
      .addEventListener(`click`, element);
  }
  onFavoritesButtonClick(element) {
    this.getElement()
      .querySelector(`.film-card__controls-item--favorite`)
      .addEventListener(`click`, element);
  }
}
