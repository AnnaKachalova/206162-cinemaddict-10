import API from './api.js';
// components
import PageController from './controllers/page-controller.js';
import FilterController from './controllers/filter-controller.js';
import ProfileComponent from './components/profile.js';

import FilmCardsModel from './models/film-cards.js';

// mock
import { generateRank } from './mock/profile.js';

import { render, RenderPosition } from './utils/render.js';

const AUTHORIZATION = `Basic eo0w5d90ik29889a`;
const END_POINT = `https://htmlacademy-es-10.appspot.com/cinemaddict`;

const filmCardsModel = new FilmCardsModel();

const api = new API(END_POINT, AUTHORIZATION);

const mainElement = document.querySelector(`.main`);
const siteHeader = document.querySelector(`.header`);

const filterController = new FilterController(mainElement, filmCardsModel);
filterController.render();

const pageController = new PageController(mainElement, filmCardsModel, api);

api.getCards().then(cards => {
  filmCardsModel.setCards(cards);

  const filmsHistoryCount = cards.filter(film => film.isHistory === true).length;
  const rank = generateRank(filmsHistoryCount);
  render(siteHeader, new ProfileComponent(rank), RenderPosition.BEFOREEND);

  pageController.render();

  document.querySelector(
    '.footer__statistics p'
  ).innerHTML = `${cards.length} movies inside`;
});
