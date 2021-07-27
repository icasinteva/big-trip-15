/* eslint-disable arrow-parens */
import { event } from './event';
import { editForm } from './edit-form';

const getEvents = eventsArr => eventsArr.reduce((ev, r) => ev + r, '');
const events = [editForm(), ...Array(3).fill(event())];

export const tripEventsList = () => {
  const tripEvents = getEvents(events);

  return `<ul class="trip-events__list">
  ${tripEvents}
  </ul>`;
};
