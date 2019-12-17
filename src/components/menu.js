import AbstractComponent from './abstract-component.js';

const createFilterTemplate = ({name, quantity}) => {
  return `<a href="#${name}" class="main-navigation__item">${name} <span class="main-navigation__item-count">${quantity}</span></a>`;
};

const createMenuComponent = (filters) => {
  const filtersMarkup = filters.map((it, i) => createFilterTemplate(it, i === 0)).join(`\n`);
  return `<nav class="main-navigation">
            ${filtersMarkup}
            <a href="#stats" class="main-navigation__item main-navigation__item--additional">Stats</a>
          </nav>
          <ul class="sort">
              <li><a href="#" class="sort__button sort__button--active">Sort by default</a></li>
              <li><a href="#" class="sort__button">Sort by date</a></li>
              <li><a href="#" class="sort__button">Sort by rating</a></li>
          </ul>`;
};

export default class Menu extends AbstractComponent {
  constructor(filters) {
    super();
    this._filters = filters;
  }

  getTemplate() {
    return createMenuComponent(this._filters);
  }
}
