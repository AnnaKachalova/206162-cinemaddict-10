// components
import FilmsContainerComponent from './components/films-container.js';
import FilmCardComponent from './components/film-card.js';
import ProfileComponent from './components/profile.js';
import MenuComponent from './components/menu.js';
import TopRatedComponent from './components/top-rated.js';
import MostCommentedComponent from './components/most-commented.js';
import PopupComponent from './components/popup.js';
import MoreButtonComponent from './components/more-button.js';

// mock
import {generateFilmCards} from './mock/film-card.js';
import {generateRank} from './mock/profile.js';
import {generateFilters} from './mock/menu.js';
import {generateMostCommented} from './mock/most-commented.js';
import {generateTopRated} from './mock/top-rated.js';

import {render, RenderPosition} from './utils.js';
const CARD_COUNT = 15;
const SHOWING_TASKS_COUNT_ON_START = 5;
const SHOWING_TASKS_COUNT_BY_BUTTON = 5;

const bodyElement = document.querySelector(`body`);
const mainElement = document.querySelector(`.main`);

// filters
const cards = generateFilmCards(CARD_COUNT);
const filters = generateFilters(cards);
render(mainElement, new MenuComponent(filters).getElement(), RenderPosition.BEFOREEND);

// header
const siteHeader = document.querySelector(`.header`);
const filmsHistory = cards.filter((film) => film.isHistory === true).length;
const rank = generateRank(filmsHistory);
render(siteHeader, new ProfileComponent(rank).getElement(), RenderPosition.BEFOREEND);

// film list
const filmsContainer = new FilmsContainerComponent();
render(mainElement, filmsContainer.getElement(), RenderPosition.BEFOREEND);
const filmList = filmsContainer.getElement().querySelector(`.films-list`);
const filmListContainer = filmsContainer.getElement().querySelector(`.films-list__container`);

// fill films
let showingTasksCount = SHOWING_TASKS_COUNT_ON_START;
const renderCard = (card) => {
  const cardComponent = new FilmCardComponent(card);
  const popupComponent = new PopupComponent(card);

  render(filmListContainer, cardComponent.getElement(), RenderPosition.BEFOREEND);
  const poster = cardComponent.getElement().querySelector('.film-card__poster');
  const title = cardComponent.getElement().querySelector('.film-card__title');
  const commentBlock = cardComponent.getElement().querySelector('.film-card__comments');

  const showPopup = () =>{
    // popup
    const popup = popupComponent;
    render(bodyElement, popup.getElement(), RenderPosition.BEFOREEND);
    const popupButtonClose = popupComponent.getElement().querySelector('.film-details__close-btn');
    
    let hidePopup = function() {
      popup.getElement().remove();
      popup.removeElement()
    };
    popupButtonClose.addEventListener('click', hidePopup);
  
  }

  poster.addEventListener('click', showPopup);
  title.addEventListener('click', showPopup)
  commentBlock.addEventListener('click', showPopup)
};

cards.slice(0, showingTasksCount).forEach((card) => {
  renderCard(card);
});

// Most commented
const mostCommeted = generateMostCommented(cards);
if (mostCommeted.length) {
  const mostCommetedFilms = mostCommeted.map((card) => new FilmCardComponent(card).getElement());
  const mostCommetedElement = new MostCommentedComponent().getElement();
  render(filmsContainer.getElement(), mostCommetedElement, RenderPosition.BEFOREEND);
  const mostCommetedList = mostCommetedElement.querySelector(`.films-list__container`);
  mostCommetedFilms.forEach((card) => render(mostCommetedList, card, RenderPosition.BEFOREEND));
}
// Top rated
const topRated = generateTopRated(cards);
if (topRated.length) {
  const topRatedFilms = topRated.map((card) => new FilmCardComponent(card).getElement());
  const topRatedElement = new TopRatedComponent().getElement();
  render(filmsContainer.getElement(), topRatedElement, RenderPosition.BEFOREEND);
  const topRatedList = topRatedElement.querySelector(`.films-list__container`);
  topRatedFilms.forEach((card) => render(topRatedList, card, RenderPosition.BEFOREEND));
}

// show more
const showMoreButton = new MoreButtonComponent();
render(filmList, showMoreButton.getElement(), RenderPosition.BEFOREEND);
showMoreButton.getElement().addEventListener(`click`, () => {
  const prevTasksCount = showingTasksCount;
  showingTasksCount = showingTasksCount + SHOWING_TASKS_COUNT_BY_BUTTON;

  cards
    .slice(prevTasksCount, showingTasksCount)
    .forEach((card) => render(filmListContainer, new FilmCardComponent(card).getElement(), RenderPosition.BEFOREEND));

  if (showingTasksCount >= cards.length) {
    showMoreButton.getElement().remove();
    showMoreButton.removeElement();
  }
});
