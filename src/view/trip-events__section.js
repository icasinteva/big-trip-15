import { createEventsListTemplate } from './trip-events__list';
import { generateEvent } from '../mock/event';

const EVENTS_COUNT = 4;
const events = new Array(EVENTS_COUNT).fill().map(generateEvent);

const tripEventsSection = () => `${createEventsListTemplate(events)}`;

export { tripEventsSection };
