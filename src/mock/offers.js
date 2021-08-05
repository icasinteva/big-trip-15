import { getRandomInteger } from '../utils';

const generateOffers = (type) => {
  const offers = {
    taxi: [
      {
        title: 'Order uber',
        id: 'event-offer-uber',
        price: 20,
        selected: Boolean(getRandomInteger(0, 1)),
      },
    ],
    flight: [
      {
        title: 'Add luggage',
        id: 'event-offer-luggage',
        price: 50,
        selected: Boolean(getRandomInteger(0, 1)),
      },
      {
        title: 'Switch to comfort',
        id: 'event-offer-comfort',
        price: 80,
        selected: true,
      },
      {
        title: 'Add meal',
        id: 'event-offer-meal',
        price: 15,
        selected: Boolean(getRandomInteger(0, 1)),
      },
      {
        title: 'Choose seats',
        id: 'event-offer-seats',
        price: 5,
        selected: false,
      },
      {
        title: 'Travel by train',
        id: 'event-offer-train',
        price: 40,
        selected: Boolean(getRandomInteger(0, 1)),
      },
    ],
  };

  return offers[type] ? offers[type].filter(({ selected }) => selected) : [];
};

export { generateOffers };
