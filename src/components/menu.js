import AbstractComponent from './abstract-component.js';
const FILTER_ID_PREFIX = `filter__`;

const getFilterNameById = id => {
  console.log('getFilterNameById');
  const idf = id.substring(FILTER_ID_PREFIX.length);
  console.log(idf);
  return idf;
};

const createFilterTemplate = ({ name, count }) => {
  return `<a href="#${name}" class="main-navigation__item" id="filter__${name}">${name} <span class="main-navigation__item-count">${count}</span></a>`;
};

const createMenuComponent = filters => {
  console.log(filters);
  const filtersMarkup = filters
    .map(it => createFilterTemplate(it, it.checked))
    .join(`\n`);
  return `<nav class="main-navigation">
            ${filtersMarkup}
            <a href="#stats" class="main-navigation__item main-navigation__item--additional">Stats</a>
          </nav>`;
};

export default class Menu extends AbstractComponent {
  constructor(filters) {
    super();
    this._filters = filters;
  }

  getTemplate() {
    return createMenuComponent(this._filters);
  }
  setFilterChangeHandler(handler) {
    const navigation = this.getElement();
    const filters = navigation.querySelectorAll('a');

    filters.forEach(filter => {
      filter.addEventListener(`click`, evt => {
        const filterName = getFilterNameById(evt.target.id);
        handler(filterName);
      });
    });
  }
}
