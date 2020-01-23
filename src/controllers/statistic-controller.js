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
    this._topGenre = null;
    this._quantityWatched = null;
    this._durationWatched = null;
  }
  _render() {
    // rank
    const rank = countRank(this._cards);

    // topGenre
    this._cards.forEach(card => {
      this._allGenres = this._allGenres.concat(card.genre);
    });
    if (this._allGenres.length) {
      this._allGenres = this._allGenres.reduce((accum, current) => {
        accum[current] = (accum[current] || 0) + 1;
        return accum;
      }, {});
    }
    this._topGenre = Object.keys(this._allGenres).find(
      key => this._allGenres[key] === Math.max(...Object.values(this._allGenres))
    );

    // quantityWatched
    const isHistoryFilms = this._cards.filter(film => film.isHistory === true);
    const isFavoriteFilms = this._cards.filter(film => film.isFavorite === true);

    const allWatchedFilms = isHistoryFilms.concat(isFavoriteFilms);

    this._quantityWatched = allWatchedFilms.length;

    // durationWatched
    let allDurations = [];
    this._cards.forEach(card => {
      allDurations = allDurations.concat(card.duration);
    });
    this._durationWatched = allWatchedFilms.reduce(
      (accumulator, film) => accumulator + film.duration,
      0
    );
    console.log(allDurations);

    this._statistic = new StatisticComponent({
      rank,
      activeFilter: this._activeFilter,
      topGenre: this._topGenre,
      quantityWatched: this._quantityWatched,
      durationWatched: this._durationWatched,
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
