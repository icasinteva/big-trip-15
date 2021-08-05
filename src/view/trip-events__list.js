import { createEventTemplate } from './event';
import { checkTag } from '../utils';

const createEventsListItem = (ev) => `<li class="trip-events__item">${ev}</li>`;

const createEventsListTemplate = (events) => {
  const [form, ...restEvents] = events;
  const isAddFormOpened = checkTag(form, 'FORM');

  const eventsTemplates = isAddFormOpened ? restEvents : events;
  const addFormListItem = isAddFormOpened ? createEventsListItem(form) : '';

  const eventsListItems = [
    addFormListItem,
    ...eventsTemplates.map(createEventTemplate).map(createEventsListItem),
  ].join('');

  return `<ul class="trip-events__list">${eventsListItems}</ul>`;
};

export { createEventsListTemplate };
