import TripInfoView from './view/trip-info';
import SiteNavigationView  from './view/site-navigation';
import EventsFiltersView from './view/events-filters';
import { generateEvent } from './mock/event';
import { RenderPosition, FilterEventsTypeToMethod, SortEventsTypeToMethod } from './enums';
import { DEFAULT_FILTER, DEFAULT_SORTING } from './const';
import { render } from './utils/render';
import Trip from './presenter/trip';

const EVENTS_COUNT = 2;
const events = new Array(EVENTS_COUNT).fill().map(generateEvent);

const filter = () => FilterEventsTypeToMethod[DEFAULT_FILTER](events);
const selectedSortingMethod = SortEventsTypeToMethod[DEFAULT_SORTING];

const filteredEvents = filter();
const sortedEvents = selectedSortingMethod(filteredEvents);

const siteHeaderElement = document.querySelector('.page-header .trip-main');
const siteNavContainer = siteHeaderElement.querySelector('.trip-controls__navigation');
const eventsFiltersContainer = siteHeaderElement.querySelector('.trip-controls__filters');
const bodyElement = document.querySelector('body.page-body');

const eventsFiltersComponent = new EventsFiltersView();

eventsFiltersComponent.setFilterEventsListeners(sortedEvents);

const tripPresenter = new Trip(bodyElement);

render(siteHeaderElement, new TripInfoView(sortedEvents), RenderPosition.AFTERBEGIN);
render(siteNavContainer, new SiteNavigationView(), RenderPosition.BEFOREEND);
render(eventsFiltersContainer, eventsFiltersComponent, RenderPosition.BEFOREEND);
tripPresenter.init(sortedEvents);
