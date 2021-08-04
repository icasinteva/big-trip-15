import { OfferId, OfferName } from '../enums';
import { destinationSection } from './destination__section';
import { offersSection } from './offers__section';

const data = {
  Amsterdam: {
    taxi: {
      offers: [
        {
          name: 'Order uber',
          id: 'event-offer-uber',
          priceAmount: 20,
          selected: true,
        },
      ],
    },
  },
  Geneva: {
    flight: {
      offers: [
        {
          name: OfferName.LUGGAGE,
          id: OfferId.LUGGAGE,
          priceAmount: 300,
        },
        {
          name: OfferName.COMFORT,
          id: OfferId.COMFORT,
          priceAmount: 100,
        },
        {
          name: OfferName.MEAL,
          id: OfferId.MEAL,
          priceAmount: 15,
        },
        {
          name: OfferName.SEATS,
          id: OfferId.SEATS,
          priceAmount: 5,
        },
        {
          name: OfferName.TRAIN,
          id: OfferId.TRAIN,
          priceAmount: 40,
        },
      ],
      description:
        'Geneva is a city in Switzerland that lies at the southern tip of expansive Lac Léman (Lake Geneva). Surrounded by the Alps and Jura mountains, the city has views of dramatic Mont Blanc.',
      photos: [
        {
          src: 'img/photos/1.jpg',
        },
        {
          src: 'img/photos/2.jpg',
        },
        {
          src: 'img/photos/3.jpg',
        },
        {
          src: 'img/photos/4.jpg',
        },
        {
          src: 'img/photos/5.jpg',
        },
      ],
    },
  },
  Chamonix: {
    flight: {
      offers: [
        {
          name: 'Add luggage',
          id: 'event-offer-luggage',
          priceAmount: 50,
        },
        {
          name: 'Switch to comfort',
          id: 'event-offer-comport',
          priceAmount: 80,
        },
        {
          name: 'Add meal',
          id: 'event-offer-meal',
          priceAmount: 15,
        },
        {
          name: 'Choose seats',
          id: 'event-offer-seats',
          priceAmount: 5,
        },
        {
          name: 'Travel by train',
          id: 'event-offer-train',
          priceAmount: 40,
        },
      ],
    },
  },
};

const eventDetailsSection = (destination) => {
  const { offers = [], description, photos = [] } = destination;

  if (!offers.length && !description && !photos.length) {
    return '';
  }

  return `<section class="event__details">
              ${offers.length ? offersSection(offers) : ''}
              ${destinationSection(description, photos)}
          </section>`;
};
export { eventDetailsSection };
