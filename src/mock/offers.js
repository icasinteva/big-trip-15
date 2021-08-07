import { getRandomInteger } from '../utils';
import { DestinationData } from '../enums';

const generateOffers = (destination, eventType) => {
  const destinationData = DestinationData[destination];
  const destinationOffers = destinationData.offers;
  const eventTypeOffers = destinationOffers[eventType];

  if (eventTypeOffers && eventTypeOffers.length) {
    eventTypeOffers.forEach((offer) => offer.selected = Boolean(getRandomInteger(0, 1)));

    return eventTypeOffers.filter(({ selected }) => selected);
  }

  return [];
};

export { generateOffers };
