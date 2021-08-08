import NoEventsView from './view/no-events';
import TripInfoView from './view/trip-info';
import SiteNavigationView  from './view/site-navigation';
import EventsFiltersView from './view/events-filters';
import EventsSortView from './view/events-sort';
import EventsListView from './view/events-list-section';
import EventView from './view/event';
import EventsListItemView from './view/events-list-item';
import EventAddView from './view/event-add';
import EventEditView from './view/event-edit';
import EventDetailsView from './view/event-details-section';
import { generateEvent } from './mock/event';
import { RenderPosition } from './enums';
import { DEFAULT_SORTING } from './const';
import {
  render,
  calculateCost,
  getTripRange,
  filterEvents,
  sortEvents,
  generateFilter,
  generateSorting,
  getDestinations,
  remove,
  onEscKeyDown
} from './utils';

const EVENTS_COUNT = 5;
const events = new Array(EVENTS_COUNT).fill().map(generateEvent);

const selectedFilter = generateFilter();
const selectedSorting = generateSorting();
const selectedFilterMethod = filterEvents[selectedFilter];
const selectedSortingMethod = sortEvents[selectedSorting] || sortEvents[DEFAULT_SORTING];

const siteHeaderElement = document.querySelector('.page-header .trip-main');
const siteNavContainer = siteHeaderElement.querySelector('.trip-controls__navigation');
const eventsFiltersContainer = siteHeaderElement.querySelector('.trip-controls__filters');
const addEventBtn = siteHeaderElement.querySelector('.trip-main__event-add-btn');
const siteMainElement = document.querySelector('.page-main .page-body__container');
const eventsListContainer = siteMainElement.querySelector('.trip-events');

const eventsFiltersComponent = new EventsFiltersView(selectedFilter);
const eventsSortComponent = new EventsSortView(selectedSorting);
const noEventsComponent = new NoEventsView(selectedFilter);

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

  eventComponent.getElement().querySelector('.event__rollup-btn').addEventListener('click', () => {
    replaceEventToForm();
    document.addEventListener('keydown', (evt) => onEscKeyDown(evt, replaceFormToEvent));
  });

  eventEditComponent.getElement().querySelector('.event__rollup-btn').addEventListener('click', replaceFormToEvent);

  eventEditComponent.getElement().addEventListener('submit', (evt) => {
    evt.preventDefault();
    replaceFormToEvent();
    document.removeEventListener('keydown', (ev) => onEscKeyDown(ev, replaceFormToEvent));
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
    remove(eventListItemComponent.getElement());
    const eventsListElement = eventsListContainer.querySelector('.trip-events__list');

    if (!eventsListElement.children.length) {
      remove(eventsListElement);
      render(eventsListContainer, noEventsComponent.getElement(), RenderPosition.BEFOREEND);
    }

    addEventBtn.disabled = false;
  };

  eventAddComponent.getElement().querySelector('.event__reset-btn').addEventListener('click', removeForm);
  eventAddComponent.getElement().addEventListener('submit', (evt) => {
    evt.preventDefault();
    removeForm();
    document.removeEventListener('keydown', onEscKeyDown);
  });
  document.addEventListener('keydown', (evt) => onEscKeyDown(evt, removeForm));

  eventAddComponent.getElement().querySelector('.event__input--destination').addEventListener('change', (evt) => {
    const eventDetailsComponent = new EventDetailsView({ destination: evt.target.value, eventType: eventAddComponent.getElement().querySelector('.event__type-input:checked').value });

    if (eventAddComponent.getElement().querySelector('.event__details')) {
      eventAddComponent.getElement().querySelector('.event__details').parentNode.removeChild(eventAddComponent.getElement().querySelector('.event__details'));
    }

    if (eventDetailsComponent.getElement()) {
      render(eventAddComponent.getElement(), eventDetailsComponent.getElement(), RenderPosition.BEFOREEND);
    }
  });

  Array.from(eventAddComponent.getElement().querySelectorAll('.event__type-input')).forEach((eventTypeInput) => eventTypeInput.addEventListener('click', (evt) => {
    const eventDetailsComponent = new EventDetailsView({ destination: eventAddComponent.getElement().querySelector('.event__input--destination').value, eventType: evt.target.value});

    eventAddComponent.getElement().querySelector('.event__type-output').textContent = evt.target.value;
    eventAddComponent.getElement().querySelector('.event__type-icon').src = eventAddComponent.getElement().querySelector('.event__type-icon').getAttribute('src').replace(/(img\/icons\/)[a-z]+(-[a-z]+){0,}/, `$1${evt.target.value}`);
    eventAddComponent.getElement().querySelector('.event__type-toggle').checked = false;

    if (eventAddComponent.getElement().querySelector('.event__details')) {
      eventAddComponent.getElement().querySelector('.event__details').parentNode.removeChild(eventAddComponent.getElement().querySelector('.event__details'));
    }

    if (eventDetailsComponent.getElement()) {
      render(eventAddComponent.getElement(), eventDetailsComponent.getElement(), RenderPosition.BEFOREEND);
    }
  }));

  render(eventListItemComponent.getElement(), eventAddComponent.getElement(), RenderPosition.AFTERBEGIN);
  render(listContainer, eventListItemComponent.getElement(), RenderPosition.AFTERBEGIN);
};

addEventBtn.addEventListener('click', (ev) => {
  let eventsListElement = eventsListContainer.querySelector('.trip-events__list');

  if (!eventsListElement) {
    remove(noEventsComponent.getElement());
    renderEventsList(eventsListContainer, []);
    eventsListElement = eventsListContainer.querySelector('.trip-events__list');
  }

  renderAddEventForm(eventsListElement);
  ev.target.disabled = true;
});

render(siteNavContainer, new SiteNavigationView().getElement(), RenderPosition.BEFOREEND);
render(eventsFiltersContainer, eventsFiltersComponent.getElement(), RenderPosition.BEFOREEND);

const filteredEvents = selectedFilterMethod(events);
const sortedEvents = filteredEvents.length ? selectedSortingMethod(filteredEvents) : [];
const areEventsPresent = events.length && filteredEvents.length;

if (areEventsPresent) {
  render(eventsListContainer, eventsSortComponent.getElement(), RenderPosition.BEFOREEND);
  const dates = getTripRange(events);
  const destinations = getDestinations(sortedEvents);

  render(
    siteHeaderElement,
    new TripInfoView({ dates, destinations, price: calculateCost(events) }).getElement(),
    RenderPosition.AFTERBEGIN,
  );

  renderEventsList(eventsListContainer, sortedEvents);
} else {
  render(eventsListContainer, noEventsComponent.getElement(), RenderPosition.BEFOREEND);
}
