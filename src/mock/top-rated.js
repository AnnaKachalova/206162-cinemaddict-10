import {sortBy} from '../utils.js';

const generateTopRated = (films) => {
  return sortBy(films, `rating`);
};

export {generateTopRated};
