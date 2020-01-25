import { FilterType } from '../const.js';

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
/*export const getFilters = films => {
  const isWatchilst = films.filter(film => film.isWatchilst === true).length;
  const isHistory = films.filter(film => film.isHistory === true).length;
  const isFavorite = films.filter(film => film.isFavorite === true).length;

  return [
    { name: `All movies`, quantity: films.length },
    { name: `Watchlist`, quantity: isWatchilst },
    { name: `History`, quantity: isHistory },
    { name: `Favorites`, quantity: isFavorite },
  ];
};*/
