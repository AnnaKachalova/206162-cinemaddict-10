import { createFilmsContainer } from './components/films-container.js';
import { createFilmCard } from './components/film-card.js';
import { createHeaderProfile } from './components/profile.js';
import { createMenu } from './components/menu.js';
import { createTopRatedContainer } from './components/top-rated-container.js';
import { createMostCommentedContainer } from './components/most-commented-container.js';
import { createPopupCard } from './components/popup.js';
import { createShowMoreButton } from './components/more-button.js';

const CARD_COUNT = 5;

const render = (container, template, place = `beforeend`) => {
  container.insertAdjacentHTML(place, template);
};

const siteHeader = document.querySelector(`.header`);
render(siteHeader, createHeaderProfile());

const bodyElement = document.querySelector(`body`);
const mainElement = document.querySelector(`.main`);

render(mainElement, createMenu());
render(mainElement, createFilmsContainer());
render(bodyElement, createPopupCard());

// fill film cards
const filmsContainer = mainElement.querySelector(`.films`);
const filmList = filmsContainer.querySelector(`.films-list`);
const filmListContainer = filmList.querySelector(`.films-list__container`);

new Array(CARD_COUNT).fill(``).forEach(() => {
  render(filmListContainer, createFilmCard());
});
render(filmList, createShowMoreButton());

// fill Top rated and Most commented
render(filmsContainer, createTopRatedContainer());
render(filmsContainer, createMostCommentedContainer());
let extra = filmsContainer.querySelectorAll(`.films-list--extra`);

const fillTopRatedContainer = () => {
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
fillMostCommentedContainer();
