import { createElement, render, replace } from '../utils/render';
import { onEscKeyDown } from '../utils';
import { RenderPosition } from '../enums';
import AbstractView from './abstract';
import EventView from './event';
import EventsListItemView from './events-list-item';
import EventEditView from './event-edit';

const createEventsListTemplate = () => '<ul class="trip-events__list"></ul>';

class EventsListView extends AbstractView {
  constructor(events) {
    super();

    this._events = events;
  }

  _renderEvent(eventsListComponent, event) {
    const eventListItemComponent = new EventsListItemView();
    const eventComponent = new EventView(event);
    const eventEditComponent = new EventEditView(event);

    const replaceEventToForm = () => {
      replace(eventListItemComponent, eventEditComponent, eventComponent);
    };

    const replaceFormToEvent = () => {
      replace(eventListItemComponent, eventComponent, eventEditComponent);
    };

    eventComponent.setEditEventListener(() => {
      replaceEventToForm();
      document.addEventListener('keydown', (evt) => onEscKeyDown(evt, replaceFormToEvent));
    });

    eventEditComponent.setExitEditModeListener(replaceFormToEvent);

    eventEditComponent.setSaveChangesListener(() => {
      replaceFormToEvent();
      document.removeEventListener('keydown', (ev) => onEscKeyDown(ev, replaceFormToEvent));
    });

    render(eventListItemComponent, eventComponent, RenderPosition.AFTERBEGIN);
    render(eventsListComponent, eventListItemComponent, RenderPosition.BEFOREEND);
  }

  getTemplate() {
    return createEventsListTemplate();
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
      this._events.forEach((eventsItem) => this._renderEvent(this.getElement(), eventsItem));
    }

    return this._element;
  }
}

export default EventsListView;
