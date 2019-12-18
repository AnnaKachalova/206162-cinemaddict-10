// components
import FilmsContainerComponent from './components/films-container.js';
import PageController from './controllers/page-controller.js';
import MenuComponent from './components/menu.js';
import ProfileComponent from './components/profile.js';

// mock

import { generateFilmCards } from './mock/film-card.js';
import { generateRank } from './mock/profile.js';
import { generateFilters } from './mock/menu.js';

import { render, RenderPosition } from './utils/render.js';

const CARD_COUNT = 15;

const mainElement = document.querySelector(`.main`);

// filters
const cards = generateFilmCards(CARD_COUNT);

// header
const siteHeader = document.querySelector(`.header`);
const filmsHistory = cards.filter((film) => film.isHistory === true).length;
const rank = generateRank(filmsHistory);
render(siteHeader, new ProfileComponent(rank), RenderPosition.BEFOREEND);

// menu
const filters = generateFilters(cards);
render(mainElement, new MenuComponent(filters), RenderPosition.BEFOREEND);

const filmsContainerCompinent = new FilmsContainerComponent();
render(mainElement, filmsContainerCompinent, RenderPosition.BEFOREEND);

const pageController = new PageController(filmsContainerCompinent);

pageController.render(cards);
