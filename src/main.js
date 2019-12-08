import { createFilmsContainerComponent } from './components/films-container.js';
import { createFilmCardComponent } from './components/film-card.js';
import { createHeaderProfileComponent } from './components/profile.js';
import { createMenuComponent } from './components/menu.js';
import { createTopRatedComponent } from './components/top-rated.js';
import { createMostCommentedComponent } from './components/most-commented.js';
import { createPopupCardComponent } from './components/popup.js';
import { createShowMoreButtonComponent } from './components/more-button.js';

// mock
import { generateFilmCards, films } from './mock/film-card.js';
import { rank } from './mock/profile.js';
import { generateFilters } from './mock/menu.js';
//import { generatePopup } from './mock/popup.js';

import { generateMostCommented } from './mock/most-commented.js';
import { generateTopRated } from './mock/top-rated.js';

const CARD_COUNT = 15;
const SHOWING_TASKS_COUNT_ON_START = 5;
const SHOWING_TASKS_COUNT_BY_BUTTON = 5;

const render = (container, template, place = `beforeend`) => {
  container.insertAdjacentHTML(place, template);
};

// header
const siteHeader = document.querySelector(`.header`);
render(siteHeader, createHeaderProfileComponent(rank));

const bodyElement = document.querySelector(`body`);
const mainElement = document.querySelector(`.main`);

// filters
const cards = generateFilmCards(CARD_COUNT);
const filters = generateFilters(films);

render(mainElement, createMenuComponent(filters));

render(mainElement, createFilmsContainerComponent());

// popup
render(bodyElement, createPopupCardComponent(films[0]));

// film list
const filmsContainer = mainElement.querySelector(`.films`);
const filmList = filmsContainer.querySelector(`.films-list`);
const filmListContainer = filmList.querySelector(`.films-list__container`);

// fill films
let showingTasksCount = SHOWING_TASKS_COUNT_ON_START;
cards
  .slice(0, showingTasksCount)
  .forEach((card) => render(filmListContainer, createFilmCardComponent(card)));
render(filmList, createShowMoreButtonComponent());

// Most commented
const mostCommeted = generateMostCommented(films);
if(mostCommeted){
  const mostCommetedFilms = mostCommeted.map((card) => createFilmCardComponent(card));
  render(filmsContainer, createMostCommentedComponent(mostCommetedFilms));
}
// Top rated
const topRated = generateTopRated(films);
if(topRated){
  const topRatedFilms = topRated.map((card) => createFilmCardComponent(card));
  render(filmsContainer, createTopRatedComponent(topRatedFilms));
}

// show more
const showMoreButton = mainElement.querySelector(`.films-list__show-more`);
showMoreButton.addEventListener(`click`, () => {
  const prevTasksCount = showingTasksCount;
  showingTasksCount = showingTasksCount + SHOWING_TASKS_COUNT_BY_BUTTON;

  cards
    .slice(prevTasksCount, showingTasksCount)
    .forEach((card) => render(filmListContainer, createFilmCardComponent(card)));

  if (showingTasksCount >= cards.length) {
    showMoreButton.remove();
  }
});
