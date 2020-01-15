// components
import PageController from './controllers/page-controller.js';
import FilterController from './controllers/filter.js';
import ProfileComponent from './components/profile.js';

import FilmCardsModel from './models/film-card.js';

// mock
import { generateFilmCards } from './mock/film-card.js';
import { generateRank } from './mock/profile.js';

import { render, RenderPosition } from './utils/render.js';

const CARD_COUNT = 15;

const mainElement = document.querySelector(`.main`);

// filters
const cards = generateFilmCards(CARD_COUNT);

const filmCardsModel = new FilmCardsModel();
filmCardsModel.setCards(cards);

// header
const siteHeader = document.querySelector(`.header`);
const filmsHistoryCount = cards.filter(film => film.isHistory === true).length;
const rank = generateRank(filmsHistoryCount);
render(siteHeader, new ProfileComponent(rank), RenderPosition.BEFOREEND);

// menu
const filterController = new FilterController(mainElement, filmCardsModel);
filterController.render();

const pageController = new PageController(mainElement, filmCardsModel);

pageController.render();

document.querySelector('.footer__statistics p').innerHTML = `${cards.length} movies inside`;
