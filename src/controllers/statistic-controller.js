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

    this._watchedList = [];
  }
  _render() {
    // rank
    const rank = countRank(this._cards);

    // topGenre
    console.log(this._watchedList);
    this._allGenres = [];
    this._watchedList.forEach(card => {
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
    console.log(this._topGenre);

    // quantityWatched
    this._quantityWatched = this._watchedList.length;

    // durationWatched
    let allDurations = [];
    this._watchedList.forEach(card => {
      allDurations = allDurations.concat(card.duration);
    });
    this._durationWatched = this._watchedList.reduce(
      (accumulator, film) => accumulator + film.duration,
      0
    );

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
    const isHistoryFilms = this._cards.filter(film => film.isHistory === true);
    const isFavoriteFilms = this._cards.filter(film => film.isFavorite === true);

    this._watchedList = isHistoryFilms.concat(isFavoriteFilms);
    this._render();
  }
  _onFilterChange(filterType) {
    this._activeFilterType = filterType;

    const getFilteredFilms = () => {
      switch (this._activeFilterType) {
        case `today`:
          return this._watchedList;
        case `week`:
          console.log('неделя');
          return this._watchedList;
        case `month`:
          console.log('месяц');
          return this._watchedList;
        case `year`:
          console.log('год');
          return this._watchedList.filter((el, i) => i < 2);
      }
      return this._watchedList;
    };

    this._activeFilter = filterType;

    this._watchedList = getFilteredFilms();
    console.log(this._watchedList);
    this._render();
  }
}
