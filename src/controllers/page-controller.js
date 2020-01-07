import FilmCardComponent from '../components/film-card.js';
import NoFilms from '../components/no-films.js';
import SortComponent, { SortType } from '../components/sort.js';
import FilmsContainerComponent from '../components/films-container.js';

import TopRatedComponent from '../components/top-rated.js';
import MostCommentedComponent from '../components/most-commented.js';
import MoreButtonComponent from '../components/more-button.js';

import { generateMostCommented } from '../mock/most-commented.js';
import { generateTopRated } from '../mock/top-rated.js';
import { render, remove, RenderPosition, getItemsByField } from '../utils/render.js';

import MovieController from './movie-controller.js';

const SHOWING_CARDS_COUNT_ON_START = 5;
const SHOWING_TASKS_COUNT_BY_BUTTON = 5;

const renderCards = (filmListContainer, cards, onDataChange) => {
  console.log('render cards');
  return cards.map(card => {
    const movieController = new MovieController(filmListContainer, onDataChange);
    movieController.render(card);
    return movieController;
  });
};

/*const renderMoreButton = (filmListContainer, filmList, button, cards) => {
  let showingCardsCount = SHOWING_TASKS_COUNT_ON_START;
  render(filmList, button, RenderPosition.BEFOREEND);

  button.onMoreButtonClick(() => {
    const prevTasksCount = SHOWING_TASKS_COUNT_ON_START;
    showingCardsCount = showingCardsCount + SHOWING_TASKS_COUNT_BY_BUTTON;

    renderCards(filmListContainer, cards.slice(prevTasksCount, showingCardsCount));

    if (showingCardsCount >= cards.length) {
      remove(button);
    }
  });
};*/

/*const sortCards = (component, cards, filmListContainer, moreButton, count, filmList) => {
  component.setSortTypeChangeHandler(sortType => {
    let sortedCards = [];
    switch (sortType) {
      case SortType.DATE:
        sortedCards = getItemsByField(cards, `productionYear`);

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
};*/

export default class PageController {
  constructor(container) {
    this._container = container;

    this._filmCardComponent = new FilmCardComponent();
    this._noFilms = new NoFilms();
    this._topRatedComponent = new TopRatedComponent();
    this._mostCommentedComponent = new MostCommentedComponent();
    this._moreButtonComponent = new MoreButtonComponent();
    this._sortComponent = new SortComponent();
    this._filmsContainerComponent = new FilmsContainerComponent();
    this._showedCardsControllers = [];
    this._onDataChange = this._onDataChange.bind(this);
    this._showingCardsCount = SHOWING_CARDS_COUNT_ON_START;
  }
  render(cards) {
    this._cards = cards;
    const filmsContainerElement = this._filmsContainerComponent.getElement();
    const filmList = filmsContainerElement.querySelector(`.films-list`);
    const filmListContainer = filmsContainerElement.querySelector(`.films-list__container`);

    if (cards.length) {
      //let showingCardsCount = SHOWING_TASKS_COUNT_ON_START;
      //render(this._container, this._sortComponent, RenderPosition.BEFOREEND);
      render(this._container, this._filmsContainerComponent, RenderPosition.BEFOREEND);

      // sortCards(this._sortComponent, cards, filmListContainer, this._moreButtonComponent, showingCardsCount, filmList);

      const newCards = renderCards(filmListContainer, cards.slice(0, this._showingCardsCount), this._onDataChange);
      this._showedCardsControllers = this._showedCardsControllers.concat(newCards);

      //renderCards(filmListContainer, cards.slice(0, showingCardsCount));
      //renderMoreButton(filmListContainer, filmList, this._moreButtonComponent, cards);

      // more commented and top rated
      /*const renderSpecial = (component, assortedArray) => {
        const element = component.getElement();
        render(filmsContainerElement, component, RenderPosition.BEFOREEND);

        const elementList = element.querySelector(`.films-list__container`);

        assortedArray.forEach(card => {
          const movieController = new MovieController(elementList);
          movieController.render(card);
          return movieController;
        });
      };*/

      /*// Most commented
      const mostCommeted = generateMostCommented(cards);
      if (mostCommeted.length) {
        renderSpecial(this._mostCommentedComponent, mostCommeted);
      }

      // Top rated
      const topRated = generateTopRated(cards);
      if (topRated.length) {
        renderSpecial(this._topRatedComponent, topRated);
      }*/
    } else {
      render(filmList, this._noFilms, RenderPosition.BEFOREEND);
    }
  }
  _onDataChange(movieController, oldData, newData) {
    console.log('change');
    const index = this._cards.findIndex(it => it === oldData);
    if (index === -1) {
      return;
    }

    this._cards = [].concat(this._cards.slice(0, index), newData, this._cards.slice(index + 1));

    movieController.render(this._cards[index]);
    console.log(this._cards[index]);
  }
}
