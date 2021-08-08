import { createElement } from '../utils';

const createEventsListItemTemplate = () => '<li class="trip-events__item"></li>';

class EventsListItemView {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createEventsListItemTemplate();
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

export default EventsListItemView;
