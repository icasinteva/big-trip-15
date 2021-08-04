import { createEventTemplate } from './event';
import { checkTag } from '../utils';

const eventData = [
  {
    date: '2019-03-18',
    type: 'taxi',
    title: 'Taxi Amsterdam',
    startTime: '2019-03-18T10:30',
    endTime: '2019-03-18T11:00',
    price: 20,
    offers: [
      {
        name: 'Order uber',
        id: 'event-offer-uber',
        priceAmount: 20,
        selected: true,
      },
    ],
    isFavorite: true,
  },
  {
    date: '2019-03-19',
    type: 'flight',
    title: 'Flight Geneva',
    startTime: '2019-03-18T18:00',
    endTime: '2019-03-18T10:00',
    price: 20,
    offers: [
      {
        name: 'Add luggage',
        id: 'event-offer-luggage',
        priceAmount: 300,
      },
      {
        name: 'Switch to comfort',
        id: 'event-offer-comport',
        priceAmount: 100,
      },
    ],
    isFavorite: false,
  },
  {
    date: '2019-03-20',
    type: 'sightseeing',
    title: 'Sightseeing Geneva',
    startTime: '2019-03-20T11:15',
    endTime: '2019-03-20T12:15',
    price: 180,
    isFavorite: false,
  },
];

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
