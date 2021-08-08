import { generatePhotos } from './mock/photos';

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

const DestinationData = {
  [Destination.AMSTERDAM]: {
    description: '',
    photos: generatePhotos(),
    offers: {
      [EventType.TAXI]: [
        {
          title: OfferName.UBER,
          id: OfferId.UBER,
          price: 20,
        },
      ],
      [EventType.FLIGHT]: [
        {
          title: OfferName.LUGGAGE,
          id: OfferId.LUGGAGE,
          price: 300,
        },
        {
          title: OfferName.COMFORT,
          id: OfferId.COMFORT,
          price: 100,
        },
        {
          title: OfferName.MEAL,
          id: OfferId.MEAL,
          price: 15,
        },
        {
          title: OfferName.SEATS,
          id: OfferId.SEATS,
          price: 5,
        },
        {
          title: OfferName.TRAIN,
          id: OfferId.TRAIN,
          price: 40,
        },
      ],
    },
  },
  [Destination.GENEVA]: {
    offers: {
      [EventType.TAXI]: [
        {
          title: OfferName.UBER,
          id: OfferId.UBER,
          price: 20,
        },
      ],
      [EventType.FLIGHT]: [
        {
          title: OfferName.LUGGAGE,
          id: OfferId.LUGGAGE,
          price: 300,
        },
        {
          title: OfferName.COMFORT,
          id: OfferId.COMFORT,
          price: 100,
        },
        {
          title: OfferName.MEAL,
          id: OfferId.MEAL,
          price: 15,
        },
        {
          title: OfferName.SEATS,
          id: OfferId.SEATS,
          price: 5,
        },
        {
          title: OfferName.TRAIN,
          id: OfferId.TRAIN,
          price: 40,
        },
      ],
    },
    description:
      'Geneva is a city in Switzerland that lies at the southern tip of expansive Lac Léman (Lake Geneva). Surrounded by the Alps and Jura mountains, the city has views of dramatic Mont Blanc.',
    photos: generatePhotos(),
  },
  [Destination.CHAMONIX]: {
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus',
    photos: generatePhotos(),
    offers: {},
  },
  [Destination.WARSAW]: {
    description: '',
    offers: {},
  },
};

export { RenderPosition, EventType, Destination, OfferId, OfferName, Filter, Sorting, DestinationData };
