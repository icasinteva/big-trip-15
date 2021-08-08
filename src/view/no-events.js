import { createElement } from '../utils';
import { Filter } from '../enums';

const messages = {
  [Filter.EVERYTHING]: 'Click New Event to create your first point',
  [Filter.PAST]: 'There are no past events now',
  [Filter.FUTURE]: 'There are no future events now',
};

const createNoEventTemplate = (filter) => `<p class="trip-events__msg">${messages[filter]}</p>`;

class NoEventsView {
  constructor(filter) {
    this._filter = filter;
    this._element = null;
  }

  getTemplate() {
    return createNoEventTemplate(this._filter);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}

export default NoEventsView;
