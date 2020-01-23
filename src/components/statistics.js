import AbstractSmartComponent from './abstract-smart-component.js';
import moment from 'moment';
import { StatisticFilterType } from '../const.js';

const createFiltersTemplate = (filters, activeFilter) => {
  let scores = [];
  filters.forEach((filter, i) => {
    const row = `<input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-${
      filter.value
    }" value="${filter.value}" ${activeFilter === filter.value ? 'checked' : ''}>
    <label for="statistic-${filter.value}" class="statistic__filters-label">${
      filter.title
    }</label>`;
    scores += row;
  });

  return scores;
};

const createStatistics = ({ rank, activeFilter, topGenre }) => {
  return `<section class="statistic">
  <p class="statistic__rank">
    Your rank
    <img class="statistic__img" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
    <span class="statistic__rank-label">${rank}</span>
  </p>

  <form action="https://echo.htmlacademy.ru/" method="get" class="statistic__filters">
    <p class="statistic__filters-description">Show stats:</p>
    ${createFiltersTemplate(StatisticFilterType, activeFilter)}
  </form>

  <ul class="statistic__text-list">
    <li class="statistic__text-item">
      <h4 class="statistic__item-title">You watched</h4>
      <p class="statistic__item-text">22 <span class="statistic__item-description">movies</span></p>
    </li>
    <li class="statistic__text-item">
      <h4 class="statistic__item-title">Total duration</h4>
      <p class="statistic__item-text">130 <span class="statistic__item-description">h</span> 22 <span class="statistic__item-description">m</span></p>
    </li>
    <li class="statistic__text-item">
      <h4 class="statistic__item-title">Top genre</h4>
      <p class="statistic__item-text">${topGenre}</p>
    </li>
  </ul>

  <div class="statistic__chart-wrap">
    <canvas class="statistic__chart" width="1000"></canvas>
  </div>

</section>`;
};

export default class Statistics extends AbstractSmartComponent {
  constructor({ rank, activeFilter, topGenre }) {
    super();
    this._rank = rank;
    this._topGenre = topGenre;
    this._onDataChange = null;
    this._activeFilterType = activeFilter;
  }
  getTemplate() {
    console.log(this._activeFilterType);
    return createStatistics({
      rank: this._rank,
      activeFilter: this._activeFilterType,
      topGenre: this._topGenre,
    });
  }
  setFilterChangeHandler(handler) {
    const statistics = this.getElement();
    const filters = statistics.querySelectorAll('.statistic__filters-input');

    filters.forEach(filter => {
      filter.addEventListener(`click`, evt => {
        const filterName = evt.target.value;
        console.log(filterName);
        this._activeFilterType = filterName;
        handler(filterName);
        this.rerender();
      });
    });
  }
  recoveryListeners() {
    this._subscribeOnEvents();
  }
  rerender() {
    console.log('перерисовка');
    super.rerender();
  }
  _subscribeOnEvents() {
    const statistics = this.getElement();
    const filters = statistics.querySelectorAll('.statistic__filters-input');

    filters.forEach(filter => {
      filter.addEventListener(`click`, evt => {
        const filterName = evt.target.value;
        this._activeFilterType = filterName;
        console.log(filterName);
        this.rerender();
      });
    });
  }
}
