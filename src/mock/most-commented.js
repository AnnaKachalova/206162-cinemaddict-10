import {getItemsByField} from '../utils.js';

const generateMostCommented = (films) => {
  return getItemsByField(films, `comments`);
};

export {generateMostCommented};
