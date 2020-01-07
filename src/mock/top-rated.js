import {getItemsByField} from '../utils/render.js';

const generateTopRated = (films) => {
  return getItemsByField(films, `rating`, 2);
};

export {generateTopRated};
