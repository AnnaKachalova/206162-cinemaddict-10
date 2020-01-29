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
  addComment(cardId, comment, api) {
    const cardIndex = this._cards.findIndex(it => it.id === cardId);

    if (cardIndex === -1) {
      return;
    }
    return api
      .createComment({ comment, cardId })
      .then(response => {
        const { movie, comments } = response;
        const lastId = comments[comments.length - 1].id;
        comment.id = Number(lastId) + 1;

        this._cards[cardIndex].comments.push(comment);

        return comments;
      })
      .then(this._dataChangeHandlers.forEach(handler => handler()));
  }

  removeComment(cardId, commentIndex, api) {
    const cardIndex = this._cards.findIndex(it => it.id === cardId);

    if (cardIndex === -1) {
      return;
    }

    const idComment = this._cards[cardIndex].comments[commentIndex].id;

    return api
      .deleteComment({ idComment })
      .then(() => {
        const comments = this._cards[cardIndex].comments;
        this._cards[cardIndex].comments.splice(commentIndex, 1);

        return comments;
      })
      .then(this._dataChangeHandlers.forEach(handler => handler()));
  }

  setFilterChangeHandler(handler) {
    this._filterChangeHandlers.push(handler);
  }
  setDataChangeHandler(handler) {
    this._dataChangeHandlers.push(handler);
  }
}
