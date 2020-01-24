import FilmCardComponent from '../components/film-card.js';
import PopupComponent from '../components/popup.js';
import { render, replace, remove, RenderPosition } from '../utils/render.js';

export default class MovieController {
  constructor(container, cardModel, onDataChange) {
    this._container = container;
    this._cardComponent = null;
    this._onDataChange = onDataChange;
    this._cardModel = cardModel;
  }
  render(card) {
    const oldCardComponent = this._cardComponent;

    this._cardComponent = new FilmCardComponent(card);

    this._cardComponent.setPosterClickHandler(() => this._onCardClick(card));
    this._cardComponent.setTitleClickHandler(() => this._onCardClick(card));
    this._cardComponent.setCommentBlockClickHandler(() => this._onCardClick(card));

    // card buttons
    this._cardComponent.onWatchlistButtonClick(evt => {
      evt.preventDefault();
      this._onDataChange(this, card, Object.assign({}, card, { isWatchlist: !card.isWatchlist, isHistory: false }));
    });

    this._cardComponent.onWatchedButtonClick(evt => {
      evt.preventDefault();
      this._onDataChange(this, card, Object.assign({}, card, { isHistory: !card.isHistory, isWatchlist: false }));
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
  _onCommentDataChange(card, index, newData) {
    if (newData === null) {
      this._cardModel.removeComment(card.id, index);
      this._onCardClick(card);
    } else if (index === null) {
      this._cardModel.addComment(card.id, newData);
      this._onCardClick(card);
    }

    this.render(card);
  }
  _onCardClick(card) {
    this._popupComponent = new PopupComponent(card);

    this._popupComponent.onControlsChangeHandler(newData => {
      this._onDataChange(this, card, newData);
    });

    // comments
    this._popupComponent.setDeleteClickHandler(index => {
      this._onCommentDataChange(card, index, null);
    });

    this._popupComponent.setCommentEnterPressHandler(() => {
      this._onCommentDataChange(card, null, this._popupComponent.getData());
    });
    this._popupComponent.showElement();
  }
}
