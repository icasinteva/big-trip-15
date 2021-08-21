import Event from './event';
import SiteNavigationView from '../view/site-navigation';
import EventsFiltersView from '../view/events-filters';
import EventsSortView from '../view/events-sort';
import EventsListView from '../view/events-list-section';
import EventsListItemView from '../view/events-list-item';
import AddEventFormView from '../view/event-add';
import NoEventsView from '../view/no-events';
import AddEventButtonView from '../view/add-event-button';
import { Filter, Sorting, RenderPosition } from '../enums';
import { render, remove, replace } from '../utils/render.js';
import { onEscKeyDown, addItem, deleteItem, updateItem, contains, filterTypeToCallBack, sortTypeToCallBack} from '../utils/common';
import TripInfoView from '../view/trip-info';
class Trip {
  constructor(pageContainer) {
    this._filterType = Filter.EVERYTHING;
    this._sortType = Sorting.DAY;

    this._headerElement = pageContainer.querySelector('.page-header .trip-main');
    this._controlsElement = this._headerElement.querySelector('.trip-controls');
    this._tripContainer = pageContainer.querySelector('.trip-events');

    this._tripInfoComponent = null;
    this._eventsFiltersComponent = null;
    this._eventsSortComponent = null;

    this._eventPresenter = new Map();
    this._eventsListComponent = null;
    this._noEventsComponent = null;
    this._addEventButtonComponent = new AddEventButtonView();


    this._handleEventAdd = this._handleEventAdd.bind(this);
    this._handleEventChange = this._handleEventChange.bind(this);
    this._removeAddEventForm = this._removeAddEventForm.bind(this);
    this._handleEventDelete = this._handleEventDelete.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
    this._handleEnterAddMode = this._handleEnterAddMode.bind(this);
    this._handleFilterTypeChange = this._handleFilterTypeChange.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
  }

  init(events) {
    this._events = events.slice();

    this._sortEvents();
    this._renderSiteNav();
    this._renderFilters();
    this._renderAddEventButton();
    this._renderTrip();
  }

  _sortEvents() {
    const filteredEvents = filterTypeToCallBack[this._filterType](this._events.slice());

    this._sortedEvents = sortTypeToCallBack[this._sortType](filteredEvents);
  }

  _handleEventAdd(newEvent) {
    this._events = addItem(this._events, newEvent);
    this._removeAddEventForm();
    this._reRenderTrip();
  }

  _handleEventDelete(event) {
    this._events = deleteItem(this._events, event);
    this._reRenderTrip();
  }

  _handleEventChange(updatedEvent) {
    this._events = updateItem(this._events, updatedEvent);
    this._eventPresenter.get(updatedEvent.id).init(updatedEvent);
  }


  _handleModeChange() {
    this._eventPresenter.forEach((presenter) => presenter.resetView());
  }

  _handleEnterAddMode() {
    if (contains(this._tripContainer, this._noEventsComponent)) {
      replace(this._eventsListComponent, this._noEventsComponent);
    }

    this._renderAddEventForm();
    this._addEventButtonComponent.setDisabled(true);
  }

  _handleFilterTypeChange(filterType) {
    if (this._filterType !== filterType) {
      this._filterType = filterType;
      this._reRenderTrip();
    }
  }

  _handleSortTypeChange(sortType) {
    if (this._sortType !== sortType) {
      this._sortType = sortType;
      this._reRenderTrip();
    }
  }

  _renderAddEventButton() {
    this._addEventButtonComponent.setEnterAddModeHandler(this._handleEnterAddMode);
    render(this._headerElement, this._addEventButtonComponent, RenderPosition.BEFOREEND);
  }

  _renderAddEventForm() {
    this._addEventFormListItemComponent = new EventsListItemView();
    this._addEventFormComponent = new AddEventFormView();

    render(this._addEventFormListItemComponent, this._addEventFormComponent, RenderPosition.AFTERBEGIN);
    render(this._eventsListComponent, this._addEventFormListItemComponent, RenderPosition.AFTERBEGIN);

    this._addEventFormComponent.setCancelClickHandler(() => {
      this._removeAddEventForm();
    });
    this._addEventFormComponent.setSaveClickHandler(this._handleEventAdd);

    document.addEventListener('keydown', (evt) => onEscKeyDown(evt, () => {
      this._removeAddEventForm();
    }));
  }

  _removeAddEventForm() {
    remove(this._addEventFormComponent);
    remove(this._addEventFormListItemComponent);

    if (!this._events.length) {
      replace(this._noEventsComponent, this._eventsListComponent);
    }

    this._addEventButtonComponent.setDisabled(false);
    document.removeEventListener('keydown', onEscKeyDown);
  }

  _renderTripInfo() {
    const prevTripInfoComponent = this._tripInfoComponent;

    this._tripInfoComponent = new TripInfoView(this._sortedEvents);

    if (!prevTripInfoComponent) {
      render(this._headerElement, this._tripInfoComponent, RenderPosition.AFTERBEGIN);
    } else {
      replace(this._tripInfoComponent, prevTripInfoComponent);
    }
  }

  _renderSiteNav() {
    render(this._controlsElement, new SiteNavigationView(), RenderPosition.BEFOREEND);
  }

  _renderFilters() {
    const prevEventsFiltersComponent = this._eventsFiltersComponent;
    this._eventsFiltersComponent = new EventsFiltersView();

    if (!prevEventsFiltersComponent) {
      render(this._controlsElement, this._eventsFiltersComponent, RenderPosition.BEFOREEND);
    } else {
      replace(this._eventsFiltersComponent, prevEventsFiltersComponent);
    }

    this._eventsFiltersComponent.setFilterTypeChangeHandler(this._handleFilterTypeChange);
  }

  _renderSort() {
    const prevEventSortComponent = this._eventsSortComponent;

    this._eventsSortComponent = new EventsSortView(this._sortType);

    if (!prevEventSortComponent) {
      render(this._tripContainer , this._eventsSortComponent, RenderPosition.BEFOREEND);
    } else {
      replace(this._eventsSortComponent, prevEventSortComponent);
    }

    this._eventsSortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);
  }

  _initEventPresenter(event) {
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
    this._sortedEvents.forEach((event) => this._initEventPresenter(event));
    render(this._tripContainer , this._eventsListComponent, RenderPosition.BEFOREEND);
  }

  _clearEventsList() {
    this._eventPresenter.forEach((presenter) => presenter.destroy);
    this._eventPresenter.clear();
  }

  _removeTripInfo() {
    if (this._tripInfoComponent) {
      remove(this._tripInfoComponent);
      this._tripInfoComponent = null;
    }
  }

  _removeEventSort() {
    if (this._eventsSortComponent) {
      remove(this._eventsSortComponent);
      this._eventsSortComponent = null;
    }
  }

  _replaceEventsListToNoEvents(eventsListComponent) {
    if (!this._noEventsComponent) {
      this._noEventsComponent = new NoEventsView(this._filterType);
    }

    this._removeEventSort();
    replace(this._noEventsComponent, eventsListComponent);
  }

  _renderNoEvents() {
    const prevNoEventsComponent = this._noEventsComponent;

    this._noEventsComponent = new NoEventsView(this._filterType);
    this._removeEventSort();

    if (!prevNoEventsComponent) {
      render(this._tripContainer , this._noEventsComponent, RenderPosition.BEFOREEND);
    } else {
      replace(this._noEventsComponent, prevNoEventsComponent);
    }
  }

  _renderTrip() {
    const prevEventListComponent = this._eventsListComponent;
    const isNoEventsRendered = contains(this._tripContainer, this._noEventsComponent);

    let elementToReplace = prevEventListComponent;

    if (isNoEventsRendered) {
      elementToReplace = this._noEventsComponent;
    }

    this._eventsListComponent = new EventsListView();

    this._sortEvents();

    if (!this._sortedEvents.length) {
      this._removeTripInfo();

      if (!prevEventListComponent) {
        this._renderNoEvents();
      } else {
        this._replaceEventsListToNoEvents(prevEventListComponent);
      }

      return;
    }

    if (elementToReplace) {
      replace(this._eventsListComponent, elementToReplace);
    }

    this._renderTripInfo();
    this._renderSort();
    this._renderEventsList();
  }

  _reRenderTrip() {

    this._renderTrip();
  }
}

export default Trip;
