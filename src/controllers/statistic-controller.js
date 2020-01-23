import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { render } from '../utils/render.js';

import StatisticComponent from '../components/statistics.js';

export default class StatisticController {
  constructor(container) {
    this._container = container;
    this._statistic = null;
    console.log('создание контроллера');
  }
  _render() {
    this._statistic = new StatisticComponent({ rank: 5 });
    render(this._container, this._statistic.getElement());
  }
  show(cards) {
    this._render();
  }
}
