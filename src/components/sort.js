import AbstractComponent from './abstract-component.js';

export const SortType = {
  DATE: `date`,
  RATING: `rating`,
  DEFAULT: `default`,
};

const createSortComponent = () => {
  return `<ul class="sort">
              <li><a href="#" data-sort-type="${SortType.DEFAULT}" class="sort__button sort__button--active">Sort by default</a></li>
              <li><a href="#" data-sort-type="${SortType.DATE}" class="sort__button">Sort by date</a></li>
              <li><a href="#" data-sort-type="${SortType.RATING}" class="sort__button">Sort by rating</a></li>
          </ul>`;
};

export default class Sort extends AbstractComponent {
  constructor() {
    super();

    this._currenSortType = SortType.DEFAULT;
  }
  getTemplate() {
    return createSortComponent();
  }
  setSortTypeChangeHandler(handler) {
    this.getElement().addEventListener(`click`, (evt) => {
      evt.preventDefault();

      if (evt.target.tagName !== `A`) {
        return;
      }
      const sortWrapper = this.getElement();
      const elements = sortWrapper.querySelectorAll(`.sort__button`);
      elements.forEach((element) => element.classList.remove(`sort__button--active`));
      evt.target.classList.add(`sort__button--active`);

      const sortType = evt.target.dataset.sortType;

      if (this._currenSortType === sortType) {
        return;
      }

      this._currenSortType = sortType;

      handler(this._currenSortType);
    });
  }
}
