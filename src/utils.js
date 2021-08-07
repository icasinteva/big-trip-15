import dayjs from 'dayjs';
import { RenderPosition, EventType, Destination, Filter, Sorting } from './enums';

const renderTemplate = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const render = (container, element, place) => {
  switch (place) {
    case RenderPosition.AFTERBEGIN:
      container.prepend(element);
      break;
    case RenderPosition.BEFOREEND:
      container.append(element);
      break;
    case RenderPosition.BEFOREBEGIN:
      container.parentNode.insertBefore(element, container);
  }
};

const renderNestedElement = (container, nestedElement, place) => {
  if (nestedElement) {
    render(container, nestedElement, place);
  }
};

const createElement = (template) => {
  const newElement = document.createElement('div');

  newElement.innerHTML = template;

  return newElement.firstChild;
};

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
  htmlObject = htmlObject.firstChild;

  return htmlObject.tagName === tagName;
};

const calculateCost = (arr) =>
  arr.reduce((acc, reducer) => {
    let offersCost = 0;
    const { price, offers } = reducer;

    if (offers) {
      offersCost = calculateCost(offers);
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
    if (
      getDuration(a.startDate, a.endDate) > getDuration(b.startDate, b.endDate)
    ) {
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

const getDestinations = (events) =>
  Array.from(new Set(events.map(({ destination }) => destination)));

const filterEvents = {
  [Filter.EVERYTHING]: (events) => events,
  [Filter.FUTURE]: (events) =>
    events.filter(({ startDate }) => startDate.isAfter(dayjs())),
  [Filter.PAST]: (events) =>
    events.filter(({ startDate }) => !startDate.isAfter(dayjs())),
};

const sortEvents = {
  [Sorting.DAY]: sortEventsByDateUp,
  [Sorting.TIME]: sortEventsByTime,
  [Sorting.PRICE]: sortEventsByPrice,
};

const generateSorting = () => {
  const sorting = Object.keys(Sorting);

  return Sorting[sorting[getRandomInteger(0, sorting.length - 1)]];
};

const generateFilter = () => {
  const filters = Object.keys(Filter);

  return Filter[filters[getRandomInteger(0, filters.length - 1)]];
};

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

const createPriceTemplate = (className, amount) =>
  `€&nbsp;<span class="${className}-value">${amount}</span>`;

export {
  getRandomInteger,
  renderTemplate,
  createElement,
  render,
  renderNestedElement,
  generateDate,
  humanizeEventStartDate,
  generateFilter,
  generateSorting,
  getDuration,
  checkTag,
  calculateCost,
  getTripRange,
  sortEventsByDateUp,
  generateEventType,
  generateDestination,
  getDestinations,
  filterEvents,
  sortEvents,
  createPriceTemplate
};
