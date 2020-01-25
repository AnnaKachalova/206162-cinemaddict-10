import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { render, replace, RenderPosition, getRank } from '../utils/render.js';

import StatisticComponent from '../components/statistics.js';
import moment from 'moment';

const countRank = cards => {
  const filmsHistoryCount = cards.filter(film => film.isHistory === true).length;
  return getRank(filmsHistoryCount);
};

export default class StatisticController {
  constructor(container) {
    this._container = container;
    this._statistic = null;
    this._activeFilter = `all-time`;

    this._onFilterChange = this._onFilterChange.bind(this);
    this._onDataChange = this._onDataChange.bind(this);

    this._allGenres = [];
    this._topGenre = null;
    this._quantityWatched = null;
    this._durationWatched = null;
    this._canvas = null;

    this._watchedList = [];
    this._cardsList = [];
  }
  _render() {
    // rank
    const rank = countRank(this._cards);

    // topGenre
    this._allGenres = [];
    this._allGenresNew = [];

    this._cardsList.forEach(card => {
      this._allGenres = this._allGenres.concat(card.genre);
    });

    if (this._allGenres.length) {
      this._allGenresNew = this._allGenres.reduce((accum, current) => {
        accum[current] = (accum[current] || 0) + 1;
        return accum;
      }, {});
    }
    this._topGenre = Object.keys(this._allGenresNew).find(
      key => this._allGenresNew[key] === Math.max(...Object.values(this._allGenresNew))
    );

    // quantityWatched
    this._quantityWatched = this._cardsList.length;

    // durationWatched
    let allDurations = [];
    this._cardsList.forEach(card => {
      allDurations = allDurations.concat(card.duration);
    });
    this._durationWatched = this._cardsList.reduce(
      (accumulator, film) => accumulator + film.duration,
      0
    );
    const oldComponent = this._statistic;
    this._statistic = new StatisticComponent({
      rank,
      activeFilter: this._activeFilter,
      topGenre: this._topGenre,
      quantityWatched: this._quantityWatched,
      durationWatched: this._durationWatched,
    });

    this._statistic.setFilterChangeHandler(this._onFilterChange);

    if (oldComponent) {
      replace(this._statistic, oldComponent);
    } else {
      render(this._container, this._statistic, RenderPosition.BEFOREEND);
      //this.renderChart();
    }
  }
  hide() {
    this._statistic && this._statistic.hide();
  }
  show(cards) {
    this._cards = cards;
    const isHistoryFilms = this._cards.filter(film => film.isHistory === true);
    const isFavoriteFilms = this._cards.filter(film => film.isFavorite === true);

    this._watchedList = isHistoryFilms.concat(isFavoriteFilms);
    this._cardsList = this._watchedList;
    this._render();
    this._statistic.show();
  }
  _onFilterChange(filterType) {
    this._activeFilterType = filterType;

    const getFilteredFilms = () => {
      switch (this._activeFilterType) {
        case `today`:
          return this._watchedList.filter((el, i) => i < 1);
        case `week`:
          console.log('неделя');
          return this._watchedList.filter((el, i) => i < 7);
        case `month`:
          console.log('месяц');
          return this._watchedList.filter((el, i) => i < 5);
        case `year`:
          console.log('год');
          return this._watchedList.filter((el, i) => i < 2);
      }
      return this._watchedList;
    };

    this._activeFilter = filterType;

    this._cardsList = getFilteredFilms();
    this._render();
  }
  _onDataChange() {
    this._render();
  }
  renderChart() {
    this._canvas = this._statistic.getElement().querySelector(`.statistic__chart`);
    this._chart = new Chart(this._canvas, this._getChart());
  }
  _getChart() {}
}
