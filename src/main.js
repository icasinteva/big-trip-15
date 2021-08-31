import { EVENTS_COUNT } from './const';
import { generateEvent } from './mock/event';
import EventsModel from './model/events';
import FiltersModel from './model/filters';
import Trip from './presenter/trip';

const events = new Array(EVENTS_COUNT).fill().map(generateEvent);
const eventsModel = new EventsModel();
const filtersModel = new FiltersModel();

eventsModel.setEvents(events);

const bodyElement = document.querySelector('body.page-body');
const tripPresenter = new Trip(bodyElement, filtersModel, eventsModel);

tripPresenter.init();
