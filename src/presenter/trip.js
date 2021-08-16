import Event from './event';
import BoardView from '../view/board';
import EventsSortView from '../view/events-sort';
import EventsListView from '../view/events-list-section';
import EventsListItemView from '../view/events-list-item';
import EventAddView from '../view/event-add';
import NoEventsView from '../view/no-events';
import AddEventButtonView from '../view/add-event-button';
import { RenderPosition, SortEventsTypeToMethod } from '../enums';
import { render, remove } from '../utils/render.js';
import { onEscKeyDown, addItem, deleteItem, updateItem, contains} from '../utils/common';
import { Sorting } from '../enums';

class Trip {
  constructor(pageContainer, sort, filter) {
    this._sort = sort || Sorting.DAY;
    this._filter = filter;
    this._eventPresenter = new Map();
    this._headerElement = pageContainer.querySelector('.page-header .trip-main');
    this._tripContainer = pageContainer.querySelector('.page-main .page-body__container');
    this._boardComponent = new BoardView();
    this._eventsSortComponent = new EventsSortView(this._sort);
    this._eventsListComponent = new EventsListView();
    this._noEventsComponent = new NoEventsView(this._filter);
    this._addEventButtonComponent = new AddEventButtonView();
    this._eventAddComponent = new EventAddView();

    this._handleEventAdd = this._handleEventAdd.bind(this);
    this._handleEventChange = this._handleEventChange.bind(this);
    this._removeAddEventForm = this._removeAddEventForm.bind(this);
    this._handleEventDelete = this._handleEventDelete.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
    this._handleEnterAddMode = this._handleEnterAddMode.bind(this);
  }

  init(events) {
    this._events = events.slice();

    this._renderAddEventButton();
    render(this._tripContainer, this._boardComponent, RenderPosition.BEFOREEND);
    this._renderTrip();
  }

  _reRenderEventsList() {
    remove(this._eventsListComponent);
    this._renderTrip();
  }

  _handleEventAdd(newEvent) {
    this._events = addItem(this._events, newEvent);
    this._removeAddEventForm();
    this._reRenderEventsList();
  }

  _handleEventDelete(event) {
    this.events = deleteItem(this._events, event);
    this._reRenderEventsList();
  }

  _handleEventChange(updatedEvent) {
    this._events = updateItem(this._events, updatedEvent);
    this._eventPresenter.get(updatedEvent.id).init(updatedEvent);
  }

  _handleModeChange() {
    this._eventPresenter.forEach((presenter) => presenter.resetView());
  }

  _handleEnterAddMode() {
    if (contains(this._boardComponent, this._noEventsComponent)) {
      remove(this._noEventsComponent);
      render(this._boardComponent, this._eventsListComponent, RenderPosition.BEFOREEND);
    }

    this._renderAddEventForm();
    this._addEventButtonComponent.setDisabled(true);
  }

  _renderAddEventButton() {
    this._addEventButtonComponent.setEnterAddModeHandler(this._handleEnterAddMode);
    render(this._headerElement, this._addEventButtonComponent, RenderPosition.BEFOREEND);
  }

  _renderAddEventForm() {
    const eventListItemComponent = new EventsListItemView();

    render(eventListItemComponent, this._eventAddComponent, RenderPosition.AFTERBEGIN);
    render(this._eventsListComponent, eventListItemComponent, RenderPosition.AFTERBEGIN);

    this._eventAddComponent.setCancelClickHandler(() => {
      this._removeAddEventForm(eventListItemComponent);
    });
    this._eventAddComponent.setSaveClickHandler(this._handleEventAdd);
    /*eventAddComponent.setChangeDestinationListener(({ target: { value } }) => {
      const eventDetailsComponent = new EventDetailsView({ destination: value, eventType: eventAddComponent.eventType });

      renderEventDetailsSection(eventAddComponent, eventDetailsComponent);
    });
    eventAddComponent.setChangeEventTypeListener(({ target: { value } }) => {
      const eventDetailsComponent = new EventDetailsView({ destination: eventAddComponent.destination, eventType: value});

      eventAddComponent.changeEventType(value);
      renderEventDetailsSection(eventAddComponent, eventDetailsComponent);
    });*/

    document.addEventListener('keydown', (evt) => onEscKeyDown(evt, () => {
      this._removeAddEventForm(eventListItemComponent);
    }));
  }

  _removeAddEventForm(eventListItemComponent = this._eventAddComponent) {
    if (!this._events.length) {
      remove(this._eventsListComponent);
      this._renderNoEvents();
    } else {
      remove(eventListItemComponent);
    }

    this._addEventButtonComponent.setDisabled(false);
    document.removeEventListener('keydown', onEscKeyDown);
  }

  _renderSort() {
    render(this._boardComponent, this._eventsSortComponent, RenderPosition.BEFOREEND);
  }

  _renderEvent(event) {
    const handlers = {
      updateEvent: this._handleEventChange,
      deleteEvent: this._handleEventDelete,
      changeMode: this._handleModeChange,
    };
    const eventPresenter = new Event(this._eventsListComponent, handlers);
    eventPresenter.init(event);
    this._eventPresenter.set(event.id, eventPresenter);
  }

  _renderEventsList() {
    const sortedEvents = SortEventsTypeToMethod[this._sort](this._events);

    sortedEvents.forEach((eventsItem) => this._renderEvent(eventsItem));
    render(this._boardComponent, this._eventsListComponent, RenderPosition.BEFOREEND);
  }

  _clearEventsList() {
    this._eventPresenter.forEach((presenter) => presenter.destroy);
    this._eventPresenter.clear();
  }

  _renderNoEvents() {
    remove(this._eventsSortComponent);
    render(this._boardComponent, this._noEventsComponent, RenderPosition.BEFOREEND);
  }

  _renderTrip() {
    if (!this._events.length) {
      this._renderNoEvents();

      return;
    }

    this._renderSort();
    this._renderEventsList();
  }
}

export default Trip;
