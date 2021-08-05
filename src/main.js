import { tripInfo } from './view/trip-info';
import { navigation } from './view/navigation';
import { createFiltersTemplate } from './view/filters';
import { tripEventsSort } from './view/trip-events-sort';
import { createEventsListTemplate } from './view/trip-events__list';
import { createAddEventFormTemplate } from './view/add-event-form';
import { generateEvent } from './mock/event';
import {
  calculateCost,
  getTripRange,
  filterEvents,
  sortEvents,
  getDestinations,
  generateFilter,
  generateSorting
} from './utils';

const EVENTS_COUNT = 4;
const events = new Array(EVENTS_COUNT).fill().map(generateEvent);

const tripMain = document.querySelector('.trip-main');
const navPlace = document.querySelector('.trip-controls__navigation');
const filtersPlace = document.querySelector('.trip-controls__filters');
const tripEventsPlace = document.querySelector('.trip-events');

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const selectedFilter = generateFilter();
const selectedFilterMethod =
  filterEvents[selectedFilter] || filterEvents.everything;
const filteredEvents = selectedFilterMethod(events);

const selectedSorting = generateSorting();
const selectedSortingMethod = sortEvents[selectedSorting] || sortEvents.day;
const sortedEvents = selectedSortingMethod(filteredEvents) || events;

const dates = getTripRange(events);
const destinations = getDestinations(sortedEvents);

render(
  tripMain,
  tripInfo({ dates, destinations, price: calculateCost(events) }),
  'afterBegin',
);
render(navPlace, navigation(), 'beforeEnd');
render(filtersPlace, createFiltersTemplate(selectedFilter), 'beforeEnd');
render(tripEventsPlace, tripEventsSort(selectedSorting), 'beforeEnd');
render(
  tripEventsPlace,
  createEventsListTemplate([createAddEventFormTemplate(), ...sortedEvents]),
  'beforeEnd',
);
