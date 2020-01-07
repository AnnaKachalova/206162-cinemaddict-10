import PopupComponent from './popup.js';
import AbstractComponent from './abstract-component.js';

const createFilmCardComponent = film => {
  console.log('как-то создается новый');
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
    comments,
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
export default class FilmCard extends AbstractComponent {
  constructor(film) {
    super();
    this._film = film;
    this.popup = new PopupComponent(this._film);
  }

  getTemplate() {
    return createFilmCardComponent(this._film);
  }

  onClick() {
    this.popup.showElement();
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
