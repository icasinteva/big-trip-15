import { createElement } from '../utils';

const createEventsListTemplate = () => '<ul class="trip-events__list"></ul>';

class EventsListView {
  constructor(tripInfo) {
    this._tripInfo = tripInfo;
    this._element = null;
  }

  getTemplate() {
    return createEventsListTemplate();
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

export default EventsListView;
