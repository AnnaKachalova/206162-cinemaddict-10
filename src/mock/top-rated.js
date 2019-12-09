import {getItemsByField} from '../utils.js';

const generateTopRated = (films) => {
  return getItemsByField(films, `rating`);
};

export {generateTopRated};
