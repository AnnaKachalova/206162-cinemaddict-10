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
    const renderMoreButton = () => {
      let showingCardsCount = SHOWING_TASKS_COUNT_ON_START;
      render(filmList, this._moreButtonComponent, RenderPosition.BEFOREEND);

      this._moreButtonComponent.setClickHandler(() => {
        const prevTasksCount = SHOWING_TASKS_COUNT_ON_START;
        showingCardsCount = showingCardsCount + SHOWING_TASKS_COUNT_BY_BUTTON;

        renderCards(filmListContainer, cards.slice(prevTasksCount, showingCardsCount));

        if (showingCardsCount >= cards.length) {
          remove(this._moreButtonComponent);
        }
      });
    };


    const filmsContainerElement = this._container.getElement();
    const filmList = filmsContainerElement.querySelector(`.films-list`);
    const filmListContainer = filmsContainerElement.querySelector(`.films-list__container`);

    if (cards.length) {
      let showingCardsCount = SHOWING_TASKS_COUNT_ON_START;
      renderCards(filmListContainer, cards.slice(0, showingCardsCount));
      renderMoreButton();
      this._sortComponent.setSortTypeChangeHandler((sortType) => {
        let sortedCards = [];
        switch (sortType) {
          case SortType.DATE:
            sortedCards = getItemsByField(cards, `releaseDate`);
            break;
          case SortType.RATING:
            sortedCards = getItemsByField(cards, `rating`);
            break;
          case SortType.DEFAULT:
            sortedCards = cards.slice(0, showingCardsCount);
            break;
        }

        filmListContainer.innerHTML = ``;
        renderCards(filmListContainer, sortedCards);
        if (sortType === SortType.DEFAULT) {
          renderMoreButton();
        } else {
          remove(this._moreButtonComponent);
        }
      });

      // Most commented
      const mostCommeted = generateMostCommented(cards);
      if (mostCommeted.length) {
        const mostCommetedElement = this._mostCommentedComponent.getElement();
        render(filmsContainerElement, this._mostCommentedComponent, RenderPosition.BEFOREEND);

        const mostCommetedList = mostCommetedElement.querySelector(`.films-list__container`);
        mostCommeted.forEach((card) => {
          renderCard(card, mostCommetedList);
        });
      }
      // Top rated
      const topRated = generateTopRated(cards);
      if (topRated.length) {
        const topRatedElement = this._topRatedComponent.getElement();
        render(filmsContainerElement, this._topRatedComponent, RenderPosition.BEFOREEND);

        const topRatedList = topRatedElement.querySelector(`.films-list__container`);
        topRated.forEach((card) => renderCard(card, topRatedList));
      }

    } else {
      render(filmList, this._noFilms, RenderPosition.BEFOREEND);
    }
  }
}
