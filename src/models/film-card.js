import { getCardsByFilter } from '../utils/filter.js';
import { FilterType } from '../const.js';

export default class FilmCard {
  constructor() {
    this._cards = [];
    this._activeFilterType = FilterType.ALL;

    this._dataChangeHandlers = [];
    this._filterChangeHandlers = [];
  }
  getCards() {
    return getCardsByFilter(this._cards, this._activeFilterType);
  }

  getCardsAll() {
    return this._cards;
  }

  setCards(cards) {
    this._cards = Array.from(cards);
  }
  setFilter(filterType) {
    this._activeFilterType = filterType;
    this._filterChangeHandlers.forEach(handler => handler());
  }
  updateCard(id, card) {
    const index = this._cards.findIndex(it => it.id === id);

    if (index === -1) {
      return false;
    }

    this._cards = [].concat(this._cards.slice(0, index), card, this._cards.slice(index + 1));
    this._dataChangeHandlers.forEach(handler => handler());
    return true;
  }
  addComment(cardId, comment) {
    const cardIndex = this._cards.findIndex(it => it.id === cardId);

    if (cardIndex === -1) {
      return;
    }

    this._cards[cardIndex].comments.unshift(comment);

    this._dataChangeHandlers.forEach(handler => handler());
  }

  removeComment(cardId, commentIndex) {
    const cardIndex = this._cards.findIndex(it => it.id === cardId);

    if (cardIndex === -1) {
      return;
    }

    this._cards[cardIndex].comments.splice(commentIndex, 1);

    this._dataChangeHandlers.forEach(handler => handler());
  }

  setFilterChangeHandler(handler) {
    this._filterChangeHandlers.push(handler);
  }
  setDataChangeHandler(handler) {
    this._dataChangeHandlers.push(handler);
  }
}
