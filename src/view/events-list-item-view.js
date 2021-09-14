import AbstractView from './abstract-view';

const createEventsListItemTemplate = () =>
  '<li class="trip-events__item"></li>';

class EventsListItemView extends AbstractView {
  getTemplate() {
    return createEventsListItemTemplate();
  }
}

export default EventsListItemView;
