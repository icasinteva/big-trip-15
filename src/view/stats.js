import { getDuration } from '../utils/event';
import { EventType } from '../enums';
import { renderChart } from '../utils/chart';
import Smart from './smart';

const prepareChartData = (events, callback) => {
  const res = [];

  Object.values(EventType).forEach((type) => {
    const evs = events.filter((evt) => evt.eventType === type);

    res.push(evs.length ? callback(evs) : null);
  });

  return res;
};

const renderMoneyChart = (moneyCtx, events) => {
  const data = prepareChartData(events, (evs) => evs.reduce((acc, { price }) => acc + price, 0));

  return renderChart(moneyCtx, { labels: Object.values(EventType), data, title: 'MONEY', formatter: (val) => `€ ${val}` });
};

const renderTypeChart = (typeCtx, events) => {
  const data = prepareChartData(events, (evs) => evs.length);

  return renderChart(typeCtx, {labels: Object.values(EventType), data: data, title: 'TYPES', formatter: (val) => `${val}x`});
};

const renderTimeChart = (timeCtx, events) => {
  const data = prepareChartData(events, (evs) => evs.reduce((acc, { startDate, endDate}) => acc + endDate.diff(startDate, 'minutes'), 0));

  return renderChart(timeCtx, { labels: Object.values(EventType), data, title: 'TIME', formatter: (val) => getDuration(val) });
};


const createStatsSectionTemplate = () => `<section class="statistics">
    <h2 class="visually-hidden">Trip statistics</h2>

    <div class="statistics__item">
      <canvas class="statistics__chart" id="money" width="900"></canvas>
    </div>

    <div class="statistics__item">
      <canvas class="statistics__chart" id="type" width="900"></canvas>
    </div>

    <div class="statistics__item">
      <canvas class="statistics__chart" id="time-spend" width="900"></canvas>
    </div>
  </section>`;

class StatsView extends Smart {
  constructor(events) {
    super();
    this._events = events;
    this._moneyChart = null;

    this._setCharts();
  }

  getTemplate() {
    return createStatsSectionTemplate();
  }

  _setCharts() {
    if (this._moneyChart !== null) {
      this._moneyChart = null;
    }

    if (this._typeChart !== null) {
      this._typeChart = null;
    }

    if (this._timeChart !== null) {
      this._timeChart = null;
    }
    const moneyCtx = this.queryChildElement('#money');
    const typeCtx = this.queryChildElement('#type');
    const timeCtx = this.queryChildElement('#time-spend');

    this._moneyChart = renderMoneyChart(moneyCtx, this._events);
    this._typeChart = renderTypeChart(typeCtx, this._events);
    this._timeChart = renderTimeChart(timeCtx, this._events);
  }
}

export default StatsView;
