import FilmCardComponent from '../components/film-card.js';
import NoFilms from '../components/no-films.js';
import {SortType} from '../components/sort.js';

import TopRatedComponent from '../components/top-rated.js';
import MostCommentedComponent from '../components/most-commented.js';
import MoreButtonComponent from '../components/more-button.js';

import {generateMostCommented} from '../mock/most-commented.js';
import {generateTopRated} from '../mock/top-rated.js';
import {render, remove, RenderPosition, getItemsByField} from '../utils/render.js';

const SHOWING_TASKS_COUNT_ON_START = 5;
const SHOWING_TASKS_COUNT_BY_BUTTON = 5;

const renderCard = (card, parent) => {
  const cardComponent = new FilmCardComponent(card);
  render(parent, cardComponent, RenderPosition.BEFOREEND);

  const showPopup = () => cardComponent.onClick();

  cardComponent.setPosterClickHandler(showPopup);
  cardComponent.setTitleClickHandler(showPopup);
  cardComponent.setCommentBlockClickHandler(showPopup);
};

const renderCards = (filmListContainer, cards) => {
  cards.forEach((card) => {
    renderCard(card, filmListContainer);
  });
};

const renderMoreButton = (filmListContainer, filmList, button, cards) => {
  let showingCardsCount = SHOWING_TASKS_COUNT_ON_START;
  render(filmList, button, RenderPosition.BEFOREEND);

  button.setClickHandler(() => {
    const prevTasksCount = SHOWING_TASKS_COUNT_ON_START;
    showingCardsCount = showingCardsCount + SHOWING_TASKS_COUNT_BY_BUTTON;

    renderCards(filmListContainer, cards.slice(prevTasksCount, showingCardsCount));

    if (showingCardsCount >= cards.length) {
      remove(button);
    }
  });
};

const sortCards = (component, cards, filmListContainer, moreButton, count, filmList) => {
  component.setSortTypeChangeHandler((sortType) => {
    let sortedCards = [];
    switch (sortType) {
      case SortType.DATE:
        sortedCards = getItemsByField(cards, `releaseDate`);
        break;
      case SortType.RATING:
        sortedCards = getItemsByField(cards, `rating`);
        break;
      case SortType.DEFAULT:
        sortedCards = cards.slice(0, count);
        break;
    }

    filmListContainer.innerHTML = ``;
    renderCards(filmListContainer, sortedCards);
    if (sortType === SortType.DEFAULT) {
      renderMoreButton(filmListContainer, filmList, moreButton, cards);
    } else {
      remove(moreButton);
    }
  });
};

export default class PageController {
  constructor(container, sortComponent) {
    this._container = container;

    this._filmCardComponent = new FilmCardComponent();
    this._noFilms = new NoFilms();
    this._topRatedComponent = new TopRatedComponent();
    this._mostCommentedComponent = new MostCommentedComponent();
    this._moreButtonComponent = new MoreButtonComponent();
    this._sortComponent = sortComponent;
  }
  render(cards) {

    const filmsContainerElement = this._container.getElement();
    const filmList = filmsContainerElement.querySelector(`.films-list`);
    const filmListContainer = filmsContainerElement.querySelector(`.films-list__container`);

    if (cards.length) {
      let showingCardsCount = SHOWING_TASKS_COUNT_ON_START;
      renderCards(filmListContainer, cards.slice(0, showingCardsCount));
      renderMoreButton(filmListContainer, filmList, this._moreButtonComponent, cards);

      sortCards(this._sortComponent, cards, filmListContainer, this._moreButtonComponent, showingCardsCount, filmList);

      const renderSpecial = (component, assortedArray) =>{
        const element = component.getElement();
        render(filmsContainerElement, component, RenderPosition.BEFOREEND);

        const elementList = element.querySelector(`.films-list__container`);
        assortedArray.forEach((card) => {
          renderCard(card, elementList);
        });
      };

      // Most commented
      const mostCommeted = generateMostCommented(cards);
      if (mostCommeted.length) {
        renderSpecial(this._mostCommentedComponent, mostCommeted);
      }

      // Top rated
      const topRated = generateTopRated(cards);
      if (topRated.length) {
        renderSpecial(this._topRatedComponent, topRated);
      }

    } else {
      render(filmList, this._noFilms, RenderPosition.BEFOREEND);
    }
  }
}
