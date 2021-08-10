import AbstractView from './abstract';
import { Filter } from '../enums';

const messages = {
  [Filter.EVERYTHING]: 'Click New Event to create your first point',
  [Filter.PAST]: 'There are no past events now',
  [Filter.FUTURE]: 'There are no future events now',
};

const createNoEventTemplate = (filter) => `<p class="trip-events__msg">${messages[filter]}</p>`;

class NoEventsView extends AbstractView {
  constructor(filter = Filter.EVERYTHING) {
    super();
    this._filter = filter;
  }

  getTemplate() {
    return createNoEventTemplate(this._filter);
  }
}

export default NoEventsView;
