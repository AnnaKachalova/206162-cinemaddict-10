import AbstractComponent from './abstract-component.js';
const FILTER_ID_PREFIX = `filter__`;

const getFilterNameById = id => {
  return id.substring(FILTER_ID_PREFIX.length);
};

const createFilterTemplate = ({ name, count, checked }) => {
  return `<a href="#${name}" class="main-navigation__item ${
    checked ? 'main-navigation__item--active' : ''
  }" id="filter__${name}">${name} 
  ${
    name === 'All movies'
      ? ''
      : `<span class="main-navigation__item-count">${count}</span></a>`
  }`;
};

const createMenuComponent = filters => {
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
        const classActive = 'main-navigation__item--active';

        filters.forEach(currentFilter => {
          currentFilter.classList.remove(classActive);
        });
        filter.classList.add(classActive);

        const filterName = getFilterNameById(evt.target.id);
        if (!filterName) {
          // это статистика
          console.log('statistics');
        } else {
          console.log('filter');
          handler(filterName);
        }
      });
    });
  }
}
