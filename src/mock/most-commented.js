const generateMostCommented = (films) => {
  const sortByСomment = (arr) => {
    arr.sort((a, b) => (a.numberOfComments > b.numberOfComments ? 1 : -1)).reverse();
  };
  sortByСomment(films);
  return films[0].numberOfComments === 0 ? false :  films.slice(0, 2);
};

export {generateMostCommented};
