import dayjs from 'dayjs';
import { EventType, Destination, Filter, Sorting, Keydown } from './enums';

const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const generateDate = () => {
  const maxDaysGap = 7;
  const daysGap = getRandomInteger(-maxDaysGap, maxDaysGap);
  const hoursGap = getRandomInteger(0, 72);

  return dayjs()
    .add(daysGap, 'day')
    .add(hoursGap, 'hour')
    .add(getRandomInteger(0, 34), 'minute');
};

const convertMS = (diffMinutes) => {
  const dayMinutes = 24 * 60;
  const days = Math.trunc(diffMinutes / dayMinutes);
  const hours = Math.trunc((diffMinutes - dayMinutes * days) / 60);
  const minutes = diffMinutes % 60;

  return new Map([
    ['D', days],
    ['H', hours],
    ['M', minutes],
  ]);
};

const getDuration = (startDate, endDate) => {
  const diff = endDate.diff(startDate, 'minute');
  const duration = convertMS(diff);
  const res = [];

  for (const [key, value] of duration) {
    if (value) {
      res.push(`${value}${key}`);
    }
  }

  return res.join(' ');
};

const humanizeEventStartDate = (dateStr) => dayjs(dateStr).format('MMM DD');

const checkTag = (template, tagName) => {
  let htmlObject = document.createElement('div');
  htmlObject.innerHTML = template;
  htmlObject = htmlObject.firstElementChild;

  return htmlObject.tagName === tagName;
};

const calculateTripCost = (arr) =>
  arr.reduce((acc, reducer) => {
    let offersCost = 0;
    const { price, offers } = reducer;

    if (offers) {
      offersCost = calculateTripCost(offers);
    }

    return acc + price + offersCost;
  }, 0);

const sortDateUp = (a, b) => {
  if (a.isAfter(b)) {
    return 1;
  }
  return -1;
};
const sortDateDown = (a, b) => {
  if (a.isAfter(b)) {
    return -1;
  }
  return 1;
};

const sortEventsByDate = (events, callBack) =>
  events.sort((a, b) => callBack(a.startDate, b.startDate));

const sortEventsByDateUp = (events) => sortEventsByDate(events, sortDateUp);

const sortEventsByTime = (events) =>
  events.sort((a, b) => {
    const durationA = a.endDate.diff(a.startDate);
    const durationB = b.endDate.diff(b.startDate);

    if (durationA > durationB) {
      return 1;
    }

    return -1;
  });

const sortEventsByPrice = (events) =>
  events.sort((a, b) => {
    if (a.price > b.price) {
      return 1;
    }
    return -1;
  });

const getTripRange = (events) => {
  const startDates = events.map(({ startDate }) => startDate);
  const sortedStartDates = startDates.sort(sortDateUp);
  const endDates = events.map(({ endDate }) => endDate);
  const sortedEndDates = endDates.sort(sortDateDown);

  return {
    startDate: humanizeEventStartDate(sortedStartDates[0]),
    endDate: humanizeEventStartDate(sortedEndDates[0]),
  };
};

const getDestinations = (events) => {
  const start = events[0].destination;
  const end = events[events.length - 1].destination;

  return [ start, ...Array.from(new Set(events.slice(1, events.length - 1).map(({ destination }) => destination))), end];
};

const filterEverything = (events) => events;

const filterFutureEvents = (events) =>
  events.filter(({ startDate }) => startDate.isAfter(dayjs()));

const filterPastEvents = (events) =>
  events.filter(({ startDate }) => !startDate.isAfter(dayjs()));

const generateEventType = () => {
  const eventTypes = Object.keys(EventType);
  return EventType[
    eventTypes[getRandomInteger(0, eventTypes.length - 1)]
  ];
};

const generateDestination = () => {
  const destinations = Object.keys(Destination);
  return Destination[
    destinations[getRandomInteger(0, destinations.length - 1)]
  ];
};

const onEscKeyDown = (evt, callback) => {
  if (evt.key === Keydown.ESCAPE) {
    evt.preventDefault();
    callback();
    document.removeEventListener('keydown', onEscKeyDown);
  }
};

export {
  getRandomInteger,
  generateDate,
  humanizeEventStartDate,
  getDuration,
  checkTag,
  calculateTripCost,
  getTripRange,
  generateEventType,
  generateDestination,
  getDestinations,
  filterEverything,
  filterFutureEvents,
  filterPastEvents,
  sortEventsByDateUp,
  sortEventsByTime,
  sortEventsByPrice,
  onEscKeyDown
};
