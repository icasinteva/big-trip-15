import { generateEvent } from './mock/event';
import Trip from './presenter/trip';

const EVENTS_COUNT = 2;
const events = new Array(EVENTS_COUNT).fill().map(generateEvent);

const bodyElement = document.querySelector('body.page-body');
const tripPresenter = new Trip(bodyElement);

tripPresenter.init(events);
