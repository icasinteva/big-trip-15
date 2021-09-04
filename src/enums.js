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

const StorageType = {
  EVENTS: 'events',
  DESTINATIONS: 'destinations',
  OFFERS: 'offers',
};

export { RenderPosition, EventType, Filter, Sorting, Keydown, UserAction, UpdateType, MenuItem, StorageType };
