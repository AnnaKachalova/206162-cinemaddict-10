const generateFilters = films => {
  const isWatchilst = films.filter(film => film.isWatchilst === true).length;
  const isHistory = films.filter(film => film.isHistory === true).length;
  const isFavorite = films.filter(film => film.isFavorite === true).length;

  return [
    { name: 'All movies', quantity: films.length },
    { name: 'Watchlist', quantity: isWatchilst },
    { name: 'History', quantity: isHistory },
    { name: 'Favorites', quantity: isFavorite },
  ];
};

export { generateFilters };
