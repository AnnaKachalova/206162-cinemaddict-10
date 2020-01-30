import {FilterType} from '../const.js';

export const getWatchlistCards = cards => {
  return cards.filter(card => card.isWatchlist);
};

export const getHistoryCards = cards => {
  return cards.filter(card => card.isHistory);
};

export const getFavoriteCards = cards => {
  return cards.filter(card => card.isFavorite);
};

export const getCardsByFilter = (cards, filterType) => {
  switch (filterType) {
    case FilterType.ALL:
      return cards;
    case FilterType.WATCHLIST:
      return getWatchlistCards(cards);
    case FilterType.HISTORY:
      return getHistoryCards(cards);
    case FilterType.FAVORITES:
      return getFavoriteCards(cards);
  }

  return cards;
};
