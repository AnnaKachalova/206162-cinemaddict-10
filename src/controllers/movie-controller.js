import FilmCardComponent from '../components/film-card.js';
import PopupComponent from '../components/popup.js';
import {render, replace, RenderPosition} from '../utils/render.js';
import CardFilm from '../models/film-card.js';

const SHAKE_ANIMATION_TIMEOUT = 600;

export default class MovieController {
  constructor(container, cardModel, onDataChange, api, onMostCommetedChange) {
    this._container = container;
    this._cardComponent = null;
    this._onDataChange = onDataChange;
    this._onMostCommetedChange = onMostCommetedChange;
    this._cardModel = cardModel;
    this._api = api;
    this._fieldText = null;
    this._cardForPopup = null;
  }
  render(card) {
    this._cardForPopup = card;
    const oldCardComponent = this._cardComponent;

    this._cardComponent = new FilmCardComponent(card);

    this._cardComponent.setPosterClickHandler(() => {
      this._onCardClick(card);
    });
    this._cardComponent.setTitleClickHandler(() => this._onCardClick(card));
    this._cardComponent.setCommentBlockClickHandler(() => this._onCardClick(card));

    // card buttons
    this._cardComponent.onWatchlistButtonClick((evt) => {
      evt.preventDefault();
      const newCard = CardFilm.clone(card);
      newCard.isWatchlist = !newCard.isWatchlist;
      newCard.isHistory = false;
      this._onDataChange(this, card, newCard);
    });

    this._cardComponent.onWatchedButtonClick((evt) => {
      evt.preventDefault();
      const newCard = CardFilm.clone(card);
      newCard.isHistory = !newCard.isHistory;
      newCard.isWatchlist = false;
      this._onDataChange(this, card, newCard);
    });

    this._cardComponent.onFavoritesButtonClick((evt) => {
      evt.preventDefault();
      const newCard = CardFilm.clone(card);
      newCard.isFavorite = !newCard.isFavorite;

      this._onDataChange(this, card, newCard);
    });

    if (oldCardComponent) {
      replace(this._cardComponent, oldCardComponent);
    } else {
      render(this._container, this._cardComponent, RenderPosition.BEFOREEND);
    }
  }
  _onCommentDataChange(card, index, newData) {
    if (newData === null) {
      this._cardModel
        .removeComment(card.id, index, this._api)
        .then(() => {
          this._enabledButtonDelete();
          this.render(card);
          this._onMostCommetedChange();
          this._onCardClick(card);
        })
        .catch(() => {
          this._enabledButtonDelete();
        });
    } else if (index === null) {
      this._disabledFieldText();
      this._cardModel
        .addComment(card.id, newData, this._api)
        .then(() => {
          this._enabledFieldText();
          this.render(card);
          this._onMostCommetedChange();
          this._onCardClick(card);
        })
        .catch(() => {
          this._shake();
          this._enabledFieldText();
        });
    }
  }
  _shake() {
    const form = document.querySelector(`.film-details`);
    form.classList.add(`shake`);
    setTimeout(() => {
      form.classList.remove(`shake`);
    }, SHAKE_ANIMATION_TIMEOUT);
  }
  _enabledButtonDelete() {
    this._deleteButton.disabled = false;
    this._deleteButton.textContent = `Delete`;
  }
  _disabledFieldText() {
    this._fieldText.disabled = true;
  }
  _enabledFieldText() {
    this._fieldText.disabled = false;
  }

  _onCardClick(card) {
    this._popupComponent = new PopupComponent(card);
    this._popupComponent.onControlsChangeHandler((newData) => {
      this._onDataChange(this, card, newData);
    });

    // comments
    this._popupComponent.setDeleteClickHandler((handler) => {
      const {index, button} = handler;
      this._deleteButton = button;
      this._onCommentDataChange(card, index, null);
    });

    this._popupComponent.setCommentEnterPressHandler(() => {
      this._onCommentDataChange(card, null, this._popupComponent.getData());
    });

    this._popupComponent.showElement();
    this._fieldText = document.querySelector(`.film-details__comment-input`);
  }
}
