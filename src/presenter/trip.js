import LoadingView from '../view/loading';
import EventPresenter, { State as EventPresenterViewState } from './event';
import Filters from '../presenter/filters';
import EventsSortView from '../view/events-sort';
import EventsListView from '../view/events-list-section';
import NoEventsView from '../view/no-events';
import AddEventButtonView from '../view/add-event-button';
import { Sorting, RenderPosition, UserAction, UpdateType } from '../enums';
import { contains, render, remove, replace } from '../utils/render.js';
import { filterTypeToCallBack } from '../utils/filters';
import { sortTypeToCallBack } from '../utils/sorting';
import { isOnline } from '../utils/common';
import { toast } from '../utils/toast';
import TripInfoView from '../view/trip-info';
import { DEFAULT_SORTING } from '../const';
import EventForm from './eventForm';

class Trip {
  constructor(pageContainer, filtersModel, sortingModel, eventsModel, api) {
    this._api = api;
    this._eventsModel = eventsModel;
    this._filtersModel = filtersModel;
    this._sortingModel = sortingModel;
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

    this._handleViewAction = this._handleViewAction.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._exitAddMode = this._exitAddMode.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
    this._handleEnterAddMode = this._handleEnterAddMode.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
    this._filtersPresenter = null;
    this._eventsModel.addObserver(this._handleModelEvent);
    this._filtersModel.addObserver(this._handleModelEvent);
  }

  init() {
    if (!this._filtersPresenter) {
      this._filtersPresenter = new Filters(this._controlsElement, this._filtersModel, this._eventsModel);
      this._filtersPresenter.init();
    }
    this._renderAddEventButton();
    this._renderTrip();
  }

  destroy() {
    this._clearTrip({ resetSortType: true, disableFilters: true, disableAddBtn: true });
  }

  createEvent() {
    this._eventFormPresenter.init();
    this._addEventButtonComponent.setDisabled(true);
  }

  _getEvents() {
    const filterType = this._filtersModel.getFilter();
    const sortType = this._sortingModel.getSorting();
    const events = this._eventsModel.getEvents().slice();
    const filteredEvents = filterTypeToCallBack[filterType](events);

    return sortTypeToCallBack[sortType](filteredEvents);
  }

  _handleViewAction(actionType, updateType, update) {
    switch (actionType) {
      case UserAction.UPDATE_EVENT: {
        this._eventPresenter.get(update.id).setViewState(EventPresenterViewState.SAVING);
        this._api.updateEvent(update)
          .then((response) => {
            this._eventsModel.updateEvent(updateType, response);
          })
          .catch(() => {
            this._taskPresenter.get(update.id).setViewState(EventPresenterViewState.ABORTING);
          });
        break;
      }
      case UserAction.ADD_EVENT: {
        this._eventFormPresenter.setSaving();
        this._api.addEvent(update).then((response) => {
          this._eventsModel.addEvent(updateType, response);
        })
          .catch(() => {
            this._eventFormPresenter.setAborting();
          });

        break;
      }
      case UserAction.DELETE_EVENT: {
        this._eventPresenter.get(update.id).setViewState(EventPresenterViewState.DELETING);
        this._api.deleteEvent(update).then(() => {
          this._eventsModel.deleteEvent(updateType, update);
        })
          .catch(() => {
            this._taskPresenter.get(update.id).setViewState(EventPresenterViewState.ABORTING);
          });
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
        this._clearTrip({resetSortType: true, removeTripInfo: true});
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
    this._eventFormPresenter.destroy();
    this._eventPresenter.forEach((presenter) => presenter.resetView());
  }

  _handleEnterAddMode() {
    if (!isOnline()) {
      toast('You can\'t create new event offline');
      return;
    }
    if (contains(this._tripContainer, this._noEventsComponent)) {
      replace(this._eventsListComponent, this._noEventsComponent);
    }

    this.createEvent();
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

  _exitAddMode() {
    const eventsCount = this._getEvents().length;

    if (!eventsCount) {
      replace(this._noEventsComponent, this._eventsListComponent);
    }

    this._addEventButtonComponent.setDisabled(false);
  }

  _renderTripInfo(events) {
    this._tripInfoComponent = new TripInfoView(events);

    render(this._headerElement, this._tripInfoComponent, RenderPosition.AFTERBEGIN);
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
    const eventPresenter = new EventPresenter(this._eventsListComponent, this._eventsModel, handlers);
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

  _clearTrip({ removeTripInfo = false, disableFilters = false, resetSortType = false, disableAddBtn = false } = {}) {
    const eventsCount = this._getEvents().length;

    this._eventFormPresenter.destroy();
    this._eventPresenter.forEach((presenter) => presenter.destroy());
    this._eventPresenter.clear();

    remove(this._eventsSortComponent);
    remove(this._noEventsComponent);
    remove(this._eventsListComponent);
    remove(this._loadingComponent);

    this._addEventButtonComponent.setDisabled(false);

    if (disableAddBtn) {
      this._addEventButtonComponent.setDisabled(true);
    }

    if (!eventsCount || removeTripInfo) {
      remove(this._tripInfoComponent);
    }

    if (disableFilters) {
      this._filtersPresenter.disabled = true;
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
    const isAddBtnDisbaled = this._addEventButtonComponent.getElement().disabled;
    const isFiltersDisabled = this._filtersPresenter.disabled;

    if (isAddBtnDisbaled) {
      this._addEventButtonComponent.setDisabled(false);
    }

    if (isFiltersDisabled) {
      this._filtersPresenter.disabled = false;
    }

    this._eventsListComponent = new EventsListView();
    this._eventFormPresenter = new EventForm(this._eventsListComponent, this._eventsModel, this._handleViewAction, this._exitAddMode);

    if (!eventsCount) {
      this._renderNoEvents(filter);
      return;
    }

    if (!contains(this._headerElement, this._tripInfoComponent)) {
      this._renderTripInfo(events);
    }
    this._renderSort();
    this._renderEventsList(events);
  }
}

export default Trip;
