const RenderPosition = {
  AFTERBEGIN: 'afterBegin',
  AFTEREND: 'afterEnd',
  BEFOREBEGIN: 'beforeBegin',
  BEFOREEND: 'beforeEnd',
};
const EventType = {
  TAXI: 'taxi',
  BUS: 'bus',
  TRAIN: 'train',
  SHIP: 'ship',
  DRIVE: 'drive',
  FLIGHT: 'flight',
  CHECKIN: 'check-in',
  SIGHTSEEING: 'sightseeing',
  RESTAURANT: 'restaurant',
};
const Destination = {
  AMSTERDAM: 'Amsterdam',
  GENEVA: 'Geneva',
  CHAMONIX: 'Chamonix',
  WARSAW: 'Warsaw',
};
const OfferId = {
  LUGGAGE: 'event-offer-luggage',
  COMFORT: 'event-offer-comfort',
  MEAL: 'event-offer-meal',
  SEATS: 'event-offer-seats',
  TRAIN: 'event-offer-train',
  UBER: 'event-offer-uber',
};
const OfferName = {
  LUGGAGE: 'Add luggage',
  COMFORT: 'Switch to comfort',
  MEAL: 'Add meal',
  SEATS: 'Choose seats',
  TRAIN: 'Travel by train',
  UBER: 'Order uber',
};

const Sorting = {
  DAY: 'day',
  EVENT: 'event',
  TIME: 'time',
  PRICE: 'price',
  OFFERS: 'offers',
};

const Filter = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PAST: 'past',
};

const Keydown = {
  ESCAPE: 'Escape',
};

const UserAction = {
  UPDATE_EVENT: 'UPDATE_EVENT',
  ADD_EVENT: 'ADD_EVENT',
  DELETE_EVENT: 'DELETE_EVENT',
};

const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
  INIT: 'INIT',
};

const MenuItem = {
  TABLE: 'Table',
  STATS: 'Stats',
};

export { RenderPosition, EventType, Destination, OfferId, OfferName, Filter, Sorting, Keydown, UserAction, UpdateType, MenuItem };
