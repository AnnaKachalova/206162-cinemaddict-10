// components
import FilmsContainerComponent from './components/films-container.js';
import FilmCardComponent from './components/film-card.js';
import ProfileComponent from './components/profile.js';
import MenuComponent from './components/menu.js';
import TopRatedComponent from './components/top-rated.js';
import MostCommentedComponent from './components/most-commented.js';
import PopupComponent from './components/popup.js';
import MoreButtonComponent from './components/more-button.js';
import NoFilms from './components/no-films.js';

// mock
import { generateFilmCards } from './mock/film-card.js';
import { generateRank } from './mock/profile.js';
import { generateFilters } from './mock/menu.js';
import { generateMostCommented } from './mock/most-commented.js';
import { generateTopRated } from './mock/top-rated.js';

import { render, remove, RenderPosition } from './utils/render.js';

const CARD_COUNT = 15;
const SHOWING_TASKS_COUNT_ON_START = 5;
const SHOWING_TASKS_COUNT_BY_BUTTON = 5;

const mainElement = document.querySelector(`.main`);

// filters
const cards = generateFilmCards(CARD_COUNT);

// header
const siteHeader = document.querySelector(`.header`);
const filmsHistory = cards.filter(film => film.isHistory === true).length;
const rank = generateRank(filmsHistory);
render(siteHeader, new ProfileComponent(rank), RenderPosition.BEFOREEND);

// menu
const filters = generateFilters(cards);
render(mainElement, new MenuComponent(filters), RenderPosition.BEFOREEND);

// film list
const filmsContainer = new FilmsContainerComponent();
render(mainElement, filmsContainer, RenderPosition.BEFOREEND);
const filmsContainerElement = filmsContainer.getElement();
const filmList = filmsContainerElement.querySelector(`.films-list`);

if (cards.length) {
  const filmListContainer = filmsContainerElement.querySelector(`.films-list__container`);

  // fill films
  let showingTasksCount = SHOWING_TASKS_COUNT_ON_START;

  const renderCard = (card, parent) => {
    const cardComponent = new FilmCardComponent(card);
    const cardElement = cardComponent.getElement();

    render(parent, cardComponent, RenderPosition.BEFOREEND);
    const poster = cardElement.querySelector(`.film-card__poster`);
    const title = cardElement.querySelector(`.film-card__title`);
    const commentBlock = cardElement.querySelector(`.film-card__comments`);

    const showPopup = () => {
      cardComponent.onClick();
    };

    poster.addEventListener(`click`, showPopup);
    title.addEventListener(`click`, showPopup);
    commentBlock.addEventListener(`click`, showPopup);
  };

  cards.slice(0, showingTasksCount).forEach(card => {
    renderCard(card, filmListContainer);
  });

  // Most commented
  const mostCommeted = generateMostCommented(cards);
  if (mostCommeted.length) {
    const mostCommentedComponent = new MostCommentedComponent();
    const mostCommetedElement = mostCommentedComponent.getElement();
    render(filmsContainerElement, mostCommentedComponent, RenderPosition.BEFOREEND);

    const mostCommetedList = mostCommetedElement.querySelector(`.films-list__container`);
    mostCommeted.forEach(card => {
      renderCard(card, mostCommetedList);
    });
  }
  // Top rated
  const topRated = generateTopRated(cards);
  if (topRated.length) {
    const topRatedComponent = new TopRatedComponent();
    const topRatedElement = topRatedComponent.getElement();
    render(filmsContainerElement, topRatedComponent, RenderPosition.BEFOREEND);

    const topRatedList = topRatedElement.querySelector(`.films-list__container`);
    topRated.forEach(card => renderCard(card, topRatedList));
  }

  // show more
  const showMoreButtonComponent = new MoreButtonComponent();
  const showMoreButtonElement = showMoreButtonComponent.getElement();
  render(filmList, showMoreButtonComponent, RenderPosition.BEFOREEND);
  showMoreButtonElement.addEventListener(`click`, () => {
    const prevTasksCount = showingTasksCount;
    showingTasksCount = showingTasksCount + SHOWING_TASKS_COUNT_BY_BUTTON;

    cards
      .slice(prevTasksCount, showingTasksCount)
      .forEach(card => renderCard(card, filmListContainer));

    if (showingTasksCount >= cards.length) {
      showMoreButtonElement.remove();
      showMoreButton.removeElement();
    }
  });
} else {
  render(filmList, new NoFilms().getElement(), RenderPosition.BEFOREEND);
}
