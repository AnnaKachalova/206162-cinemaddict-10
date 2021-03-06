import NoFilms from '../components/no-films.js';
import SortComponent, {SortType} from '../components/sort.js';
import FilmsContainerComponent from '../components/films-container.js';

import TopRatedComponent from '../components/top-rated.js';
import MostCommentedComponent from '../components/most-commented.js';
import MoreButtonComponent from '../components/more-button.js';

import {getTopRated, getMostCommented} from '../utils/render.js';
import {render, remove, RenderPosition, getItemsByField} from '../utils/render.js';

import MovieController from './movie-controller.js';

const SHOWING_CARDS_COUNT_ON_START = 5;
const SHOWING_CARDS_COUNT_BY_BUTTON = 5;

const renderCards = (filmListContainer, cards, onDataChange, cardsModel, api, onMostCommetedChange) => {
  return cards.map((card) => {
    const movieController = new MovieController(
        filmListContainer,
        cardsModel,
        onDataChange,
        api,
        onMostCommetedChange
    );
    movieController.render(card);
    return movieController;
  });
};

export default class PageController {
  constructor(container, cardsModel, api) {
    this._container = container;
    this._cardsModel = cardsModel;
    this._api = api;

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

    this._onMostCommetedChange = this._onMostCommetedChange.bind(this);

    this._sortComponent.setSortTypeChangeHandler(this._onSortTypeChange);
    this._cardsModel.setFilterChangeHandler(this._onFilterChange);
  }
  hide() {
    this._filmsContainerComponent.hide();
    this._sortComponent.hide();
  }

  show() {
    this._filmsContainerComponent.show();
    this._sortComponent.show();
  }
  render() {
    const cards = this._cardsModel.getCards();

    if (cards.length) {
      render(this._container, this._sortComponent, RenderPosition.BEFOREEND);
      render(this._container, this._filmsContainerComponent, RenderPosition.BEFOREEND);
      this._getCommens();
      const newCards = renderCards(
          this._filmListContainer,
          cards.slice(0, this._showingCardsCount),
          this._onDataChange,
          this._cardsModel,
          this._api,
          this._onMostCommetedChange
      );
      this._showedCardsControllers = this._showedCardsControllers.concat(newCards);

      this._renderMoreButton();
      this._renderMostCommeted();
      this._renderTopRated();
    } else {
      render(this._filmList, this._noFilms, RenderPosition.BEFOREEND);
    }
  }

  _renderSpecial(component, assortedArray) {
    const element = component.getElement();
    render(this._filmsContainerElement, component, RenderPosition.BEFOREEND);

    const elementList = element.querySelector(`.films-list__container`);
    this._getCommens();
    renderCards(
        elementList,
        assortedArray,
        this._onDataChange,
        this._cardsModel,
        this._api,
        this._onMostCommetedChange
    );
  }
  _renderMostCommeted() {
    const cards = this._cardsModel.getCards();
    const mostCommeted = getMostCommented(cards);
    if (mostCommeted.length) {
      this._renderSpecial(this._mostCommentedComponent, mostCommeted);
    }
  }
  _renderTopRated() {
    const cards = this._cardsModel.getCards();
    const topRated = getTopRated(cards);
    if (topRated.length) {
      this._renderSpecial(this._topRatedComponent, topRated);
    }
  }

  _removeCards() {
    this._filmListContainer.innerHTML = ``;
    this._showedCardsControllers = [];
  }

  _renderCards(cards) {
    this._getCommens();

    const newCards = renderCards(
        this._filmListContainer,
        cards,
        this._onDataChange,
        this._cardsModel,
        this._api,
        this._onMostCommetedChange
    );

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
    const oldComments = newData.comments;
    newData.comments = newData.comments.map((comment) => comment.id);

    const updateChange = this._api.updateCard(newData.id, newData.toRAW()).then((film) => {
      return film;
    });
    newData.comments = oldComments;
    this._cardsModel.updateCard(oldData.id, newData);

    movieController.render(newData);
    return updateChange;
  }

  _onMostCommetedChange() {
    const wrappers = document.querySelectorAll(`.films-list--extra .film-card`);
    wrappers.forEach((wrapper) => {
      wrapper.remove();
    });

    this._renderMostCommeted();
    this._renderTopRated();
  }

  _onSortTypeChange(sortType) {
    let sortedCards = [];
    const cards = this._cardsModel.getCards();
    switch (sortType) {
      case SortType.DATE:
        sortedCards = getItemsByField(cards, `releaseDate`);
        break;
      case SortType.RATING:
        sortedCards = getItemsByField(cards, `rating`);

        break;
      case SortType.DEFAULT:
        sortedCards = cards.slice(0, this._showingCardsCount);
        break;
    }

    this._filmListContainer.innerHTML = ``;
    this._getCommens();
    renderCards(
        this._filmListContainer,
        sortedCards,
        this._cardsModel,
        this._api,
        this._onMostCommetedChange
    );

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
  _getCommens() {
    const cardsAll = this._cardsModel.getCards();
    cardsAll.map((card) => {
      return this._api.getComments(card.id).then((comments) => {
        card.comments = comments;
      });
    });
  }
  _onFilterChange() {
    this._removeCards();
    this._renderCards(this._cardsModel.getCards().slice(0, SHOWING_CARDS_COUNT_ON_START));
    this._renderMoreButton();
  }
}
