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
const SHOWING_CARDS_COUNT_BY_BUTTON = 5;

const renderCards = (filmListContainer, cards, onDataChange, cardsModel) => {
  return cards.map(card => {
    const movieController = new MovieController(filmListContainer, cardsModel, onDataChange);
    movieController.render(card);
    return movieController;
  });
};

export default class PageController {
  constructor(container, cardsModel) {
    this._container = container;
    this._cardsModel = cardsModel;

    this._noFilms = new NoFilms();
    this._topRatedComponent = new TopRatedComponent();
    this._mostCommentedComponent = new MostCommentedComponent();
    this._moreButtonComponent = new MoreButtonComponent();
    this._sortComponent = new SortComponent();

    this._filmsContainerComponent = new FilmsContainerComponent();
    this._filmsContainerElement = this._filmsContainerComponent.getElement();
    this._filmList = this._filmsContainerElement.querySelector(`.films-list`);
    this._filmListContainer = this._filmsContainerElement.querySelector(`.films-list__container`);

    this._showedCardsControllers = [];
    this._onDataChange = this._onDataChange.bind(this);
    this._onSortTypeChange = this._onSortTypeChange.bind(this);
    this._showingCardsCount = SHOWING_CARDS_COUNT_ON_START;
    this._onMoreButtonClick = this._onMoreButtonClick.bind(this);
    this._onFilterChange = this._onFilterChange.bind(this);

    this._sortComponent.setSortTypeChangeHandler(this._onSortTypeChange);
    this._cardsModel.setFilterChangeHandler(this._onFilterChange);
  }
  hide() {
    this._container.hide();
  }

  show() {
    this._container.show();
  }
  render() {
    const cards = this._cardsModel.getCards();

    if (cards.length) {
      render(this._container, this._sortComponent, RenderPosition.BEFOREEND);
      render(this._container, this._filmsContainerComponent, RenderPosition.BEFOREEND);

      const newCards = renderCards(
        this._filmListContainer,
        cards.slice(0, this._showingCardsCount),
        this._onDataChange,
        this._cardsModel
      );
      this._showedCardsControllers = this._showedCardsControllers.concat(newCards);

      this._renderMoreButton();

      // more commented and top rated
      const renderSpecial = (component, assortedArray) => {
        const element = component.getElement();
        render(this._filmsContainerElement, component, RenderPosition.BEFOREEND);

        const elementList = element.querySelector(`.films-list__container`);

        assortedArray.forEach(card => {
          const movieController = new MovieController(elementList, this._cardsModel, this._onDataChange);
          movieController.render(card);
          return movieController;
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
      render(this._filmList, this._noFilms, RenderPosition.BEFOREEND);
    }
  }
  _removeCards() {
    this._filmListContainer.innerHTML = ``;
    this._showedCardsControllers = [];
  }

  _renderCards(cards) {
    const newCards = renderCards(this._filmListContainer, cards, this._onDataChange, this._cardsModel);
    this._showedCardsControllers = this._showedCardsControllers.concat(newCards);
    this._showingCardsCount = this._showedCardsControllers.length;
  }

  _renderMoreButton() {
    remove(this._moreButtonComponent);
    if (this._showingTasksCount >= this._cardsModel.getCards()) {
      return;
    }

    render(this._filmList, this._moreButtonComponent, RenderPosition.BEFOREEND);

    this._moreButtonComponent.setClickHandler(this._onMoreButtonClick);
  }

  _onDataChange(movieController, oldData, newData) {
    const isSuccess = this._cardsModel.updateCard(oldData.id, newData);
    if (isSuccess) {
      movieController.render(newData);
    }
  }

  _onSortTypeChange(sortType) {
    let sortedCards = [];
    const cards = this._cardsModel.getCards();
    switch (sortType) {
      case SortType.DATE:
        sortedCards = getItemsByField(cards, `productionYear`);

        break;
      case SortType.RATING:
        sortedCards = getItemsByField(cards, `rating`);

        break;
      case SortType.DEFAULT:
        sortedCards = cards.slice(0, this._showingCardsCount);
        break;
    }

    this._filmListContainer.innerHTML = ``;
    renderCards(this._filmListContainer, sortedCards, this._cardsModel);

    this._removeCards();
    this._renderCards(sortedCards);

    if (sortType === SortType.DEFAULT) {
      this._renderMoreButton();
    } else {
      remove(this._moreButtonComponent);
    }
  }
  _onMoreButtonClick() {
    const prevCardsCount = this._showingCardsCount;
    const cards = this._cardsModel.getCards();

    this._showingCardsCount = this._showingCardsCount + SHOWING_CARDS_COUNT_BY_BUTTON;

    this._renderCards(cards.slice(prevCardsCount, this._showingCardsCount), this._cardsModel);

    if (this._showingCardsCount >= cards.length) {
      remove(this._moreButtonComponent);
    }
  }
  _onFilterChange() {
    this._removeCards();
    this._renderCards(this._cardsModel.getCards().slice(0, SHOWING_CARDS_COUNT_ON_START));
    this._renderMoreButton();
  }
}
