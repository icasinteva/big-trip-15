import AbstractView from './abstract';
import NoEventsView from './no-events';
import EventsSortView from './events-sort';
import { RenderPosition, SortEventsTypeToMethod } from '../enums';
import { createElement, render } from '../utils/render';
import EventsListView from './events-list-section';


const createBoardTemplate = () => '<section class="trip-events"><h2 class="visually-hidden">Trip events</h2></section>';

class BoardView extends AbstractView {
  constructor(events, sort) {
    super();
    this._events = events;
    this._sort = sort;
  }

  getTemplate() {
    return createBoardTemplate();
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());

      if (this._events.length) {
        const sortedEvents = this._sort ? SortEventsTypeToMethod[this._sort](this._events): this._events;
        const eventsListComponent = new EventsListView(sortedEvents);
        const eventsSortComponent = new EventsSortView(this._sort);

        eventsSortComponent.setSortEventsListeners(sortedEvents);

        render(this.getElement(), eventsSortComponent, RenderPosition.BEFOREEND);
        render(this.getElement(), eventsListComponent, RenderPosition.BEFOREEND);
      } else {
        const selectedFilter = document.querySelector('.trip-filters__filter-input:checked').value;

        render(this.getElement(), new NoEventsView(selectedFilter), RenderPosition.BEFOREEND);
      }
    }
    return this._element;
  }
}

export default BoardView;
