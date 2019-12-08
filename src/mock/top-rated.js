const generateTopRated = (films) => {
  const sortByRating = (arr) => {
    arr.sort((a, b) => (a.rating > b.rating ? 1 : -1)).reverse();
  };
  sortByRating(films);
  return films[0].rating === 0 ? false : films.slice(0, 2);
};

export {generateTopRated};
