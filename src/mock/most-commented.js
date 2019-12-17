import {getItemsByField} from '../utils/render.js';

const generateMostCommented = (films) => {
  return getItemsByField(films, `comments`);
};

export {generateMostCommented};
