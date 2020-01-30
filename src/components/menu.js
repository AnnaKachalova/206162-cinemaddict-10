import AbstractComponent from './abstract-component.js';
const FILTER_ID_PREFIX = `filter__`;

const getFilterNameById = (id) => {
  return id.substring(FILTER_ID_PREFIX.length);
};

const createFilterTemplate = ({name, count, checked}) => {
  return `<a href="#${name}" class="main-navigation__item ${
    checked ? `main-navigation__item--active` : ``
  }" id="filter__${name}">${name} 
  ${
    name === `All movies`
      ? ``
      : `<span class="main-navigation__item-count">${count}</span></a>`
  }`;
};

const createMenuComponent = (filters) => {
  const filtersMarkup = filters
    .map((it) => createFilterTemplate(it, it.checked))
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
    this._filterClickHandler = null;
    this._onMenuItemChange = null;
    this._onLinkClick = this._onLinkClick.bind(this);
    this._setListeners();
  }

  getTemplate() {
    return createMenuComponent(this._filters);
  }
  _setListeners() {
    const navigation = this.getElement();
    const links = navigation.querySelectorAll(`a`);

    links.forEach((link) => {
      link.addEventListener(`click`, this._onLinkClick);
    });
  }
  setFilterChangeHandler(handler) {
    this._filterClickHandler = handler;
  }
  _onLinkClick(evt) {
    const classActive =  `main-navigation__item--active`;
    const navigation = this.getElement();

    const activeLink = navigation.querySelector(`.${classActive}`);
    const link = evt.target;
    let linkType = ``;

    if (link !== activeLink) {
      if (link.classList.contains(`main-navigation__item--additional`)) {
        linkType = `statistics`;
      } else {
        const filterName = getFilterNameById(link.id);
        this._filterClickHandler(filterName);
        linkType = `filters`;
      }
    }

    activeLink.classList.remove(classActive);
    link.classList.add(classActive);
    this._onMenuItemChange(linkType);
  }
  setOnChange(handler) {
    this._onMenuItemChange = handler.bind(this);
  }
}
