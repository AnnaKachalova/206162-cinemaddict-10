import API from './api.js';

import PageController from './controllers/page-controller.js';
import FilterController from './controllers/filter-controller.js';
import StatisticController from './controllers/statistic-controller.js';
import ProfileComponent from './components/profile.js';
import FilmCardsModel from './models/film-cards.js';

import { getRank, render, RenderPosition } from './utils/render.js';

const AUTHORIZATION = `Basic eo0w5d90ik29889a`;
const END_POINT = `https://htmlacademy-es-10.appspot.com/cinemaddict`;

const filmCardsModel = new FilmCardsModel();

const api = new API(END_POINT, AUTHORIZATION);

const mainElement = document.querySelector(`.main`);
const siteHeader = document.querySelector(`.header`);

const pageController = new PageController(mainElement, filmCardsModel, api);

const statisticController = new StatisticController(mainElement);

api.getCards().then(cards => {
  filmCardsModel.setCards(cards);

  const filterController = new FilterController(mainElement, filmCardsModel);

  filterController.setOnChange(link => {
    if (link === 'statistics') {
      pageController.hide();
      statisticController.show(cards);
    } else {
      statisticController.hide();
      pageController.show();
    }
  });

  filterController.render();

  const filmsHistoryCount = cards.filter(film => film.isHistory === true).length;
  const rank = getRank(filmsHistoryCount);

  render(siteHeader, new ProfileComponent(rank), RenderPosition.BEFOREEND);

  pageController.render();

  document.querySelector(
    `.footer__statistics p`
  ).innerHTML = `${cards.length} movies inside`;
});
