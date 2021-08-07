import TripInfoView from './view/trip-info';
import SiteNavigationView  from './view/site-navigation';
import EventsFiltersView from './view/events-filters';
import EventsSortView from './view/events-sort';
import EventsListView from './view/events-list-section';
import EventView from './view/event';
import EventsListItemView from './view/events-list-item';
import EventAddView from './view/event-add';
import EventEditView from './view/event-edit';
import { generateEvent } from './mock/event';
import { RenderPosition } from './enums';
import {
  render,
  calculateCost,
  getTripRange,
  filterEvents,
  sortEvents,
  getDestinations
} from './utils';

const EVENTS_COUNT = 13;
const events = new Array(EVENTS_COUNT).fill().map(generateEvent);

const siteHeaderElement = document.querySelector('.page-header .trip-main');
const siteNavContainer = siteHeaderElement.querySelector('.trip-controls__navigation');
const addEventBtn = siteHeaderElement.querySelector('.trip-main__event-add-btn');
const eventsFiltersContainer = siteHeaderElement.querySelector('.trip-controls__filters');
const siteMainElement = document.querySelector('.page-main .page-body__container');
const eventsListContainer = siteMainElement.querySelector('.trip-events');

const renderEvent = (eventsListElement, event) => {
  const eventListItemComponent = new EventsListItemView();
  const eventComponent = new EventView(event);
  const eventEditComponent = new EventEditView(event);

  const replaceEventToForm = () => {
    eventListItemComponent.getElement().replaceChild(eventEditComponent.getElement(), eventComponent.getElement());
  };

  const replaceFormToEvent = () => {
    eventListItemComponent.getElement().replaceChild(eventComponent.getElement(), eventEditComponent.getElement());
  };

  eventComponent.getElement().querySelector('.event__rollup-btn').addEventListener('click', replaceEventToForm);

  eventEditComponent.getElement().querySelector('.event__rollup-btn').addEventListener('click', replaceFormToEvent);

  eventEditComponent.getElement().addEventListener('submit', (evt) => {
    evt.preventDefault();
    replaceFormToEvent();
  });

  render(eventListItemComponent.getElement(), eventComponent.getElement(), RenderPosition.AFTERBEGIN);
  render(eventsListElement, eventListItemComponent.getElement(), RenderPosition.BEFOREEND);
};

const renderEventsList = (listContainer, eventsItems = []) => {
  const eventsListComponent = new EventsListView();

  eventsItems.forEach((eventsItem) => renderEvent(eventsListComponent.getElement(), eventsItem));

  render(listContainer, eventsListComponent.getElement(), RenderPosition.BEFOREEND);
};

const renderAddEventForm = (listContainer) => {
  const eventListItemComponent = new EventsListItemView();
  const eventAddComponent = new EventAddView();

  const removeForm = () => {
    eventAddComponent.getElement().parentNode.removeChild(eventAddComponent.getElement());
    addEventBtn.disabled = false;
  };

  eventAddComponent.getElement().querySelector('.event__reset-btn').addEventListener('click', removeForm);

  render(eventListItemComponent.getElement(), eventAddComponent.getElement(), RenderPosition.AFTERBEGIN);
  render(listContainer, eventListItemComponent.getElement(), RenderPosition.AFTERBEGIN);
};

const eventsFiltersComponent = new EventsFiltersView();
const eventsSortComponent = new EventsSortView();

render(siteNavContainer, new SiteNavigationView().getElement(), RenderPosition.BEFOREEND);
render(eventsFiltersContainer, eventsFiltersComponent.getElement(), RenderPosition.BEFOREEND);
render(eventsListContainer, eventsSortComponent.getElement(), RenderPosition.BEFOREEND);

const selectedFilter = eventsFiltersComponent.getElement().querySelector('.trip-filters__filter checked');
const selectedFilterMethod =
  filterEvents[selectedFilter] || filterEvents.everything;
const filteredEvents = selectedFilterMethod(events);

const selectedSorting = eventsFiltersComponent.getElement().querySelector('.trip-sort__item checked');
const selectedSortingMethod = sortEvents[selectedSorting] || sortEvents.day;
const sortedEvents = selectedSortingMethod(filteredEvents) || events;

const dates = getTripRange(events);
const destinations = getDestinations(sortedEvents);

addEventBtn.addEventListener('click', (ev) => {
  renderAddEventForm(eventsListContainer.querySelector('.trip-events__list'));
  ev.target.disabled = true;
});

render(
  siteHeaderElement,
  new TripInfoView({ dates, destinations, price: calculateCost(events) }).getElement(),
  RenderPosition.AFTERBEGIN,
);

renderEventsList(eventsListContainer, sortedEvents);
