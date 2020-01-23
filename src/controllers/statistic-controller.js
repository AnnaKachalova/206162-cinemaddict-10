import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { render, RenderPosition } from '../utils/render.js';
import { generateRank } from '../mock/profile.js';

import StatisticComponent from '../components/statistics.js';
import moment from 'moment';

const countRank = cards => {
  const filmsHistoryCount = cards.filter(film => film.isHistory === true).length;
  return generateRank(filmsHistoryCount);
};

export default class StatisticController {
  constructor(container) {
    this._container = container;
    this._statistic = null;
    this._activeFilter = `all-time`;
    this._onFilterChange = this._onFilterChange.bind(this);

    this._allGenres = [];
  }
  _render() {
    const rank = countRank(this._cards);

    this._cards.forEach(card => {
      this._allGenres = this._allGenres.concat(card.genre);
    });
    if (this._allGenres.length) {
      this._allGenres = this._allGenres.reduce((accum, current) => {
        accum[current] = (accum[current] || 0) + 1;
        return accum;
      }, {});
      console.log(this._allGenres);
    }
    this._topGenre = Object.keys(this._allGenres).find(
      key => this._allGenres[key] === Math.max(...Object.values(this._allGenres))
    );
    console.log(this._topGenre);

    this._statistic = new StatisticComponent({
      rank,
      activeFilter: this._activeFilter,
      topGenre: this._topGenre,
    });
    this._statistic.setFilterChangeHandler(this._onFilterChange);
    render(this._container, this._statistic, RenderPosition.BEFOREEND);
  }
  show(cards) {
    this._cards = cards;
    this._render();
  }
  _onFilterChange(filterType) {
    this._activeFilterType = filterType;
  }
}
