import FilmCardComponent from '../components/film-card.js';
import { render, replace, remove, RenderPosition } from '../utils/render.js';

/*export const Mode = {
  ADDING: `adding`,
  DEFAULT: `default`,
  DELETE: `edit`,
};
export const EmptyComment = {
  text: ``,
  emoji: ``,
  autor: ``,
  date: ``,
};*/

export default class MovieController {
  constructor(container, onDataChange) {
    this._container = container;
    this._cardComponent = null;
    this._onDataChange = onDataChange;
  }
  render(card, mode) {
    const oldCardComponent = this._cardComponent;
    this._mode = mode;

    this._cardComponent = new FilmCardComponent(card);

    const showPopup = () => this._cardComponent.onClick();

    this._cardComponent.setPosterClickHandler(showPopup);
    this._cardComponent.setTitleClickHandler(showPopup);
    this._cardComponent.setCommentBlockClickHandler(showPopup);

    this._cardComponent.onWatchlistButtonClick(evt => {
      evt.preventDefault();
      this._onDataChange(this, card, Object.assign({}, card, { isWatchlist: !card.isWatchlist }));
    });

    this._cardComponent.onWatchedButtonClick(evt => {
      evt.preventDefault();
      this._onDataChange(this, card, Object.assign({}, card, { isHistory: !card.isHistory }));
    });

    this._cardComponent.onFavoritesButtonClick(evt => {
      evt.preventDefault();
      this._onDataChange(this, card, Object.assign({}, card, { isFavorite: !card.isFavorite }));
    });

    if (oldCardComponent) {
      replace(this._cardComponent, oldCardComponent);
    } else {
      render(this._container, this._cardComponent, RenderPosition.BEFOREEND);
    }
  }
}
