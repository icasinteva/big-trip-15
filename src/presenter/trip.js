import LoadingView from '../view/loading';
import Event from './event';
import Filters from '../presenter/filters';
import SiteNavigationView from '../view/site-navigation';
import EventsFiltersView from '../view/events-filters';
import EventsSortView from '../view/events-sort';
import EventsListView from '../view/events-list-section';
import EventsListItemView from '../view/events-list-item';
import AddEventFormView from '../view/event-add';
import NoEventsView from '../view/no-events';
import AddEventButtonView from '../view/add-event-button';
import { Sorting, RenderPosition, UserAction, UpdateType } from '../enums';
import { render, remove, replace } from '../utils/render.js';
import { filterTypeToCallBack } from '../utils/filters';
import { onEscKeyDown, contains, sortTypeToCallBack} from '../utils/common';
import TripInfoView from '../view/trip-info';
import { DEFAULT_SORTING } from '../const';

class Trip {
  constructor(pageContainer, filtersModel, eventsModel, api) {
    this._api = api;
    this._eventsModel = eventsModel;
    this._filtersModel = filtersModel;
    this._sortType = Sorting.DAY;
    this._isLoading = true;

    this._headerElement = pageContainer.querySelector('.page-header .trip-main');
    this._controlsElement = this._headerElement.querySelector('.trip-controls');
    this._tripContainer = pageContainer.querySelector('.trip-events');

    this._tripInfoComponent = null;
    this._eventsSortComponent = null;

    this._eventPresenter = new Map();
    this._eventsListComponent = null;
    this._noEventsComponent = null;
    this._addEventButtonComponent = new AddEventButtonView();
    this._loadingComponent = new LoadingView();

    this._handleEventAdd = this._handleEventAdd.bind(this);
    this._handleViewAction = this._handleViewAction.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._removeAddEventForm = this._removeAddEventForm.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
    this._handleEnterAddMode = this._handleEnterAddMode.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
    this._eventsModel.addObserver(this._handleModelEvent);
    this._filtersModel.addObserver(this._handleModelEvent);
  }

  init() {
    const filtersPresenter = new Filters(this._controlsElement, this._filtersModel, this._eventsModel);

    this._renderSiteNav();
    filtersPresenter.init();
    this._renderAddEventButton();
    this._renderTrip();
  }

  _getEvents() {
    const filterType = this._filtersModel.getFilter();
    const events = this._eventsModel.getEvents().slice();
    const filteredEvents = filterTypeToCallBack[filterType](events);

    return sortTypeToCallBack[this._sortType](filteredEvents);
  }

  _handleEventAdd(newEvent) {
    this._handleViewAction(
      UserAction.ADD_EVENT,
      UpdateType.MAJOR,
      newEvent,
    );
  }

  _handleViewAction(actionType, updateType, update) {
    switch (actionType) {
      case UserAction.UPDATE_EVENT: {
        this._api.updateEvent(update).then((response) => {
          this._eventsModel.updateEvent(updateType, response);
        });
        break;
      }
      case UserAction.ADD_EVENT: {
        this._eventsModel.addEvent(updateType, update);
        break;
      }
      case UserAction.DELETE_EVENT: {
        this._eventsModel.deleteEvent(updateType, update);
        break;
      }
    }
  }

  _handleModelEvent(updateType, data) {
    switch (updateType) {
      case UpdateType.PATCH: {
        this._eventPresenter.get(data.id).init(data);
        break;
      }
      case UpdateType.MINOR: {
        this._clearTrip();
        this._renderTrip();
        break;
      }
      case UpdateType.MAJOR: {
        this._clearTrip({resetSortType: true, resetTripInfo: true});
        this._renderTrip();
        break;
      }
      case UpdateType.INIT: {
        this._isLoading = false;
        remove(this._loadingComponent);
        this._renderTrip();
        break;
      }
    }
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

  _handleSortTypeChange(sortType) {
    if (this._sortType !== sortType) {
      this._sortType = sortType;
      this._clearTrip();
      this._renderTrip();
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
    const eventsCount = this._getEvents().length;

    remove(this._addEventFormComponent);
    remove(this._addEventFormListItemComponent);

    if (!eventsCount) {
      replace(this._noEventsComponent, this._eventsListComponent);
    }

    this._addEventButtonComponent.setDisabled(false);
    document.removeEventListener('keydown', onEscKeyDown);
  }

  _renderTripInfo(events) {
    this._tripInfoComponent = new TripInfoView(events);

    render(this._headerElement, this._tripInfoComponent, RenderPosition.AFTERBEGIN);
  }

  _renderSiteNav() {
    render(this._controlsElement, new SiteNavigationView(), RenderPosition.BEFOREEND);
  }

  _renderFilters() {
    this._eventsFiltersComponent = new EventsFiltersView(this._filterType);
    render(this._controlsElement, this._eventsFiltersComponent, RenderPosition.BEFOREEND);

    this._eventsFiltersComponent.setFilterTypeChangeHandler(this._handleFilterTypeChange);
  }

  _renderSort() {
    this._eventsSortComponent = new EventsSortView(this._sortType);

    render(this._tripContainer , this._eventsSortComponent, RenderPosition.BEFOREEND);

    this._eventsSortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);
  }

  _initEventPresenter(event) {
    const handlers = {
      updateEvent: this._handleViewAction,
      changeMode: this._handleModeChange,
    };
    const eventPresenter = new Event(this._eventsListComponent, handlers);
    eventPresenter.init(event);
    this._eventPresenter.set(event.id, eventPresenter);
  }

  _renderEventsList(events) {
    events.forEach((event) => this._initEventPresenter(event));
    render(this._tripContainer , this._eventsListComponent, RenderPosition.BEFOREEND);
  }

  _renderLoading() {
    render(this._tripContainer, this._loadingComponent, RenderPosition.AFTERBEGIN);
  }

  _renderNoEvents(filterType) {
    this._noEventsComponent = new NoEventsView(filterType);
    render(this._tripContainer , this._noEventsComponent, RenderPosition.BEFOREEND);
  }

  _clearTrip({ resetSortType = false, resetTripInfo = false } = {}) {
    const eventsCount = this._getEvents().length;
    this._eventPresenter.forEach((presenter) => presenter.destroy());
    this._eventPresenter.clear();

    remove(this._eventsSortComponent);
    remove(this._noEventsComponent);
    remove(this._eventsListComponent);
    remove(this._loadingComponent);
    this._addEventButtonComponent.setDisabled(false);

    if (!eventsCount || resetTripInfo) {
      remove(this._tripInfoComponent);
    }

    if (resetSortType) {
      this._sortType = DEFAULT_SORTING;
    }
  }


  _renderTrip() {
    if (this._isLoading) {
      this._renderLoading();
      return;
    }

    const events = this._getEvents();
    const eventsCount = events.length;
    const filter = this._filtersModel.getFilter();

    if (!eventsCount) {
      this._renderNoEvents(filter);
      return;
    }

    this._eventsListComponent = new EventsListView();

    if (!contains(this._headerElement, this._tripInfoComponent)) {
      this._renderTripInfo(events);
    }
    this._renderSort();
    this._renderEventsList(events);
  }
}

export default Trip;
