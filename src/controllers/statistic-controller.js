import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import {render, replace, RenderPosition, getRank} from '../utils/render.js';

import StatisticComponent from '../components/statistics.js';
import moment from 'moment';

const countRank = (cards) => {
  const filmsHistoryCount = cards.filter((film) => film.isHistory === true).length;
  return getRank(filmsHistoryCount);
};
const StatisticBar = {
  data: {
    backgroundColor: `#ffe800`,
    hoverBackgroundColor: `#ffe800`,
    anchor: `start`,
  },
  options: {
    datalabel: {
      fontSize: 25,
      color: `#ffffff`,
      anchor: `start`,
      align: `start`,
      offset: 40,
    },
    animationEasing: `easeInOutQuad`,
    yAxes: {
      barThickness: 20,
      ticks: {
        fontColor: `#ffffff`,
        padding: 100,
        fontSize: 25,
      },
    },
  },
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
    this._allGenresNew = [];

    this._cardsList.forEach(() => {
      this._allGenres = this._cardsList.reduce((accum, film) => accum.concat(film.genre), []);
    });

    if (this._allGenres.length) {
      this._allGenres = this._allGenres.reduce((accum, current) => {
        accum[current] = (accum[current] || 0) + 1;
        return accum;
      }, {});
    }
    const sortedGenres = Object.keys(this._allGenres).sort(
        (a, b) => this._allGenres[b] - this._allGenres[a]
    );
    this._topGenre = sortedGenres[0];
    // Преобразуем массив обратно в объект
    this._allGenres = sortedGenres.reduce(
        (object, key) => Object.assign(object, {[key]: this._allGenres[key]}),
        {}
    );
    // quantityWatched
    this._quantityWatched = this._cardsList.length;

    // durationWatched
    let allDurations = [];
    this._cardsList.forEach((card) => {
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
      this.renderChart();
    } else {
      render(this._container, this._statistic, RenderPosition.BEFOREEND);
      this.renderChart();
    }
  }
  hide() {
    this._statistic && this._statistic.hide();
  }
  show(cards) {
    this._cards = cards;
    const isHistoryFilms = this._cards.filter((film) => film.isHistory === true);
    const isFavoriteFilms = this._cards.filter((film) => film.isFavorite === true);

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
          return this._watchedList.filter((film) => moment().isSame(moment(film.watchedDate), `day`));

        case `week`:
          return this._watchedList.filter(
              (film) => moment(film.watchedDate) > moment().subtract(1, `w`)
          );

        case `month`:
          return this._watchedList.filter(
              (film) => moment(film.watchedDate) > moment().subtract(1, `months`)
          );

        case `year`:
          return this._watchedList.filter(
              (film) => moment(film.watchedDate) > moment().subtract(1, `y`)
          );
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
  _getChart() {
    const labels = Object.keys(this._allGenres);

    const barData = {
      labels,
      datasets: [
        {
          data: Object.values(this._allGenres),
          backgroundColor: StatisticBar.data.backgroundColor,
          hoverBackgroundColor: StatisticBar.data.hoverBackgroundColor,
          anchor: StatisticBar.data.anchor,
        },
      ],
    };
    const barOptions = {
      plugins: {
        datalabels: {
          font: {size: StatisticBar.options.datalabel.fontSize},
          color: StatisticBar.options.datalabel.color,
          anchor: StatisticBar.options.datalabel.anchor,
          align: StatisticBar.options.datalabel.align,
          offset: StatisticBar.options.datalabel.offset,
        },
      },
      animation: {
        easing: StatisticBar.options.animationEasing,
      },
      scales: {
        yAxes: [
          {
            barThickness: StatisticBar.options.yAxes.barThickness,
            ticks: {
              fontColor: StatisticBar.options.yAxes.ticks.fontColor,
              padding: StatisticBar.options.yAxes.ticks.padding,
              fontSize: StatisticBar.options.yAxes.ticks.fontSize,
            },
          },
        ],
        xAxes: [
          {
            ticks: {
              display: false,
              beginAtZero: true,
            },
          },
        ],
      },
      legend: {display: false},
      tooltips: {enabled: false},
    };

    return {
      plugins: [ChartDataLabels],
      type: `horizontalBar`,
      data: barData,
      options: barOptions,
    };
  }
}
