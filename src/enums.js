const Type = [
  'taxi',
  'bus',
  'train',
  'ship',
  'drive',
  'flight',
  'check-in',
  'sightseeing',
  'restaurant',
];
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
};
const OfferName = {
  LUGGAGE: 'Add luggage',
  COMFORT: 'Switch to comfort',
  MEAL: 'Add meal',
  SEATS: 'Choose seats',
  TRAIN: 'Travel by train',
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

export { Type, Destination, OfferId, OfferName, Filter, Sorting };
