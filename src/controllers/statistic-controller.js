import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { render, RenderPosition } from '../utils/render.js';
import { generateRank } from '../mock/profile.js';

import StatisticComponent from '../components/statistics.js';
import moment from 'moment';
import { StatisticFilterType } from '../const.js';

const countRank = cards => {
  const filmsHistoryCount = cards.filter(film => film.isHistory === true).length;
  return generateRank(filmsHistoryCount);
};

export default class StatisticController {
  constructor(container) {
    this._container = container;
    this._statistic = null;
    this._activeFilter = `all-time`;
  }
  _render() {
    const rank = countRank(this._cards);
    this._statistic = new StatisticComponent({ rank });
    render(this._container, this._statistic, RenderPosition.BEFOREEND);
  }
  show(cards) {
    this._cards = cards;
    this._render();
  }
}
