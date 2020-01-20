import FilmCardComponent from '../components/film-card.js';
import PopupComponent from '../components/popup.js';
import { render, replace, remove, RenderPosition } from '../utils/render.js';

export default class MovieController {
  constructor(container, cardModel, onDataChange) {
    this._container = container;
    this._cardComponent = null;
    this._onDataChange = onDataChange;
    this._cardModel = cardModel;
    console.log(this._cardModel);
  }
  render(card) {
    const oldCardComponent = this._cardComponent;

    this._cardComponent = new FilmCardComponent(card);
    this._popupComponent = new PopupComponent(card);

    const showPopup = () => this._popupComponent.showElement();

    this._cardComponent.setPosterClickHandler(showPopup);
    this._cardComponent.setTitleClickHandler(showPopup);
    this._cardComponent.setCommentBlockClickHandler(showPopup);

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

    // comments
    this._popupComponent.setDeleteClickHandler(index => {
      this._onCommentDataChange(card, index, null);
    });

    this._popupComponent.setCommentEnterPressHandler(() => {
      this._onCommentDataChange(card, null, this._popupComponent.getData());
    });

    if (oldCardComponent) {
      replace(this._cardComponent, oldCardComponent);
    } else {
      render(this._container, this._cardComponent, RenderPosition.BEFOREEND);
    }
  }
  _onCommentDataChange(card, index, newData) {
    console.log(this._cardModel);
    if (newData === null) {
      this._cardModel.removeComment(card.id, index);
    } else if (index === null) {
      this._cardModel.addComment(card.id, newData);
    }

    this.render(card);
  }
}
