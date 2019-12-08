import {sortBy} from '../utils.js';

const generateMostCommented = (films) => {
  return sortBy(films, `numberOfComments`)
};

export {generateMostCommented};