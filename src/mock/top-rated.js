import {getItemsByField} from '../utils/render.js';

const generateTopRated = (films) => {
  return getItemsByField(films, `rating`);
};

export {generateTopRated};
