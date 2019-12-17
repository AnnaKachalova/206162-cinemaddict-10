import FilmCardComponent from '../components/film-card.js';
import NoFilms from '../components/no-films.js';

import TopRatedComponent from '../components/top-rated.js';
import MostCommentedComponent from '../components/most-commented.js';
import MoreButtonComponent from '../components/more-button.js';

import {generateMostCommented} from '../mock/most-commented.js';
import {generateTopRated} from '../mock/top-rated.js';
import {render, RenderPosition} from '../utils/render.js';

const SHOWING_TASKS_COUNT_ON_START = 5;
const SHOWING_TASKS_COUNT_BY_BUTTON = 5;

const renderCard = (card, parent) => {
  const cardComponent = new FilmCardComponent(card);
  render(parent, cardComponent, RenderPosition.BEFOREEND);

  cardComponent.setPosterClickHandler(() => cardComponent.onClick());
  cardComponent.setTitleClickHandler(() => cardComponent.onClick());
  cardComponent.setCommentBlockClickHandler(() => cardComponent.onClick());
};

export default class PageController {
  constructor(container) {
    this._container = container;

    this._filmCardComponent = new FilmCardComponent();
    this._noFilms = new NoFilms();
    this._topRatedComponent = new TopRatedComponent();
    this._mostCommentedComponent = new MostCommentedComponent();
    this._moreButtonComponent = new MoreButtonComponent();
  }
  render(cards) {
    const filmsContainerElement = this._container.getElement();
    const filmList = filmsContainerElement.querySelector(`.films-list`);

    if (cards.length) {
      const filmListContainer = filmsContainerElement.querySelector(`.films-list__container`);

      // fill films
      let showingTasksCount = SHOWING_TASKS_COUNT_ON_START;
      cards.slice(0, showingTasksCount).forEach((card) => {
        renderCard(card, filmListContainer);
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

      // show more
      render(filmList, this._moreButtonComponent, RenderPosition.BEFOREEND);
      const moreButtonElement = this._moreButtonComponent.getElement();

      this._moreButtonComponent.setClickHandler(() => {
        const prevTasksCount = showingTasksCount;
        showingTasksCount = showingTasksCount + SHOWING_TASKS_COUNT_BY_BUTTON;

        cards.slice(prevTasksCount, showingTasksCount).forEach((card) => renderCard(card, filmListContainer));

        if (showingTasksCount >= cards.length) {
          moreButtonElement.remove();
          this._moreButtonComponent.removeElement();
        }
      });
    } else {
      render(filmList, this._noFilms, RenderPosition.BEFOREEND);
    }
  }
}
