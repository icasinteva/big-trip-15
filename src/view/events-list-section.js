import AbstractView from './abstract';

const createEventsListTemplate = () => '<ul class="trip-events__list"></ul>';

class EventsListView extends AbstractView {
  getTemplate() {
    return createEventsListTemplate();
  }
}

export default EventsListView;
