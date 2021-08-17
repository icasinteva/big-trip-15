import dayjs from 'dayjs';
import { Keydown } from '../enums';
import AbstractView from '../view/abstract';

const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const humanizeEventStartDate = (dateStr) => dayjs(dateStr).format('MMM DD');

const sortDateUp = (a, b) => a.isAfter(b) ? 1 : -1;

const sortEventsByDate = (events, callBack) =>
  events.slice().sort((a, b) => callBack(a.startDate, b.startDate));

const sortEventsByDateUp = (events) => sortEventsByDate(events, sortDateUp);

const sortEventsByTime = (events) =>
  events.slice().sort((a, b) => {
    const durationA = a.endDate.diff(a.startDate);
    const durationB = b.endDate.diff(b.startDate);

    return durationA > durationB ? 1 : -1;
  });

const sortEventsByPrice = (events) =>
  events.slice().sort((a, b) => a.price > b.price ? 1 : -1);

const filterEverything = (events) => events;

const filterFutureEvents = (events) =>
  events.filter(({ startDate }) => startDate.isAfter(dayjs()));

const filterPastEvents = (events) =>
  events.filter(({ startDate }) => !startDate.isAfter(dayjs()));

const onEscKeyDown = (evt, callback) => {
  if (evt.key === Keydown.ESCAPE) {
    evt.preventDefault();
    callback();
    document.removeEventListener('keydown', onEscKeyDown);
  }
};

const contains = (component, child) => {
  if (component instanceof AbstractView) {
    component = component.getElement();
  }

  if (child instanceof AbstractView) {
    child = child.getElement();
  }

  return component.contains(child);
};

const addItem = (items, newItem) => [
  newItem,
  ...items,
];

const updateItem = (items, updatedItem) => items.map((item) => item.id === updatedItem.id ? updatedItem : item);

const deleteItem = (items, deletedItem) => items.filter(({id}) => id !== deletedItem.id);

export {
  getRandomInteger,
  humanizeEventStartDate,
  filterEverything,
  filterFutureEvents,
  filterPastEvents,
  sortEventsByDateUp,
  sortEventsByTime,
  sortEventsByPrice,
  onEscKeyDown,
  contains,
  updateItem,
  addItem,
  deleteItem
};
