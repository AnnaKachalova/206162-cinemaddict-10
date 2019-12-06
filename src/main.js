import { createFilmsContainerComponent } from './components/films-container.js';
import { createFilmCardComponent } from './components/film-card.js';
import { createHeaderProfileComponent } from './components/profile.js';
import { createMenuComponent } from './components/menu.js';
import { createTopRatedComponent } from './components/top-rated-container.js';
import { createMostCommentedComponent } from './components/most-commented-container.js';
import { createPopupCardComponent } from './components/popup.js';
import { createShowMoreButtonComponent } from './components/more-button.js';

// mock
import { generateFilmCards, films } from './mock/film-card.js';
import { rank } from './mock/profile.js';
import { generateFilters } from './mock/menu.js';
import { generatePopup } from './mock/popup.js';

const CARD_COUNT = 15;

const render = (container, template, place = `beforeend`) => {
  container.insertAdjacentHTML(place, template);
};

const siteHeader = document.querySelector(`.header`);
render(siteHeader, createHeaderProfileComponent(rank));

const bodyElement = document.querySelector(`body`);
const mainElement = document.querySelector(`.main`);

// создание фильтров
const cards = generateFilmCards(CARD_COUNT);
const filters = generateFilters(films);
render(mainElement, createMenuComponent(filters));

render(mainElement, createFilmsContainerComponent());
const popup = generatePopup();
render(bodyElement, createPopupCardComponent(popup));

// получение блоков для фильмов
const filmsContainer = mainElement.querySelector(`.films`);
const filmList = filmsContainer.querySelector(`.films-list`);
const filmListContainer = filmList.querySelector(`.films-list__container`);

// наполенение контейнера с фильмами
cards.slice(1).forEach(card => render(filmListContainer, createFilmCardComponent(card)));
render(filmList, createShowMoreButtonComponent());

// наполнение контейнеров  Top rated и Most commented
render(filmsContainer, createTopRatedComponent());
render(filmsContainer, createMostCommentedComponent());

//let extra = filmsContainer.querySelectorAll(`.films-list--extra`);

/*const fillTopRatedContainer = () => {
  let listTop = extra[0].querySelector(`.films-list__container`);
  for (let i = 0; i < 2; i++) {
    render(listTop, createFilmCard());
  }
};
fillTopRatedContainer();

const fillMostCommentedContainer = () => {
  let listMostCommented = extra[1].querySelector(`.films-list__container`);
  for (let i = 0; i < 2; i++) {
    render(listMostCommented, createFilmCard());
  }
};
fillMostCommentedContainer();*/
