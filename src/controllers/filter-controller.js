import MenuComponent from '../components/menu.js';
import {FilterType} from '../const.js';
import {render, replace, RenderPosition} from '../utils/render.js';
import {getCardsByFilter} from '../utils/filter.js';

export default class FilterController {
  constructor(container, cardsModel) {
    this._container = container;
    this._cardsModel = cardsModel;

    this._activeFilterType = FilterType.ALL;
    this._menuComponent = null;

    this._onDataChange = this._onDataChange.bind(this);
    this._onFilterChange = this._onFilterChange.bind(this);
    this._cardsModel.setDataChangeHandler(this._onDataChange);
  }

  render() {
    const container = this._container;
    const allCards = this._cardsModel.getCardsAll();

    const filters = Object.values(FilterType).map((filterType) => {
      return {
        name: filterType,
        count: getCardsByFilter(allCards, filterType).length,
        checked: filterType === this._activeFilterType,
      };
    });

    const oldComponent = this._menuComponent;

    this._menuComponent = new MenuComponent(filters);
    this._menuComponent.setFilterChangeHandler(this._onFilterChange);
    this._menuComponent.setOnChange(this._menuOnChange);

    if (oldComponent) {
      replace(this._menuComponent, oldComponent);
    } else {
      render(container, this._menuComponent, RenderPosition.BEFOREEND);
    }
  }
  setOnChange(handler) {
    this._menuOnChange = handler;
  }
  _onFilterChange(filterType) {
    this._cardsModel.setFilter(filterType);
    this._activeFilterType = filterType;
  }
  _onDataChange() {
    this.render();
  }
}
