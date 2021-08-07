import { getRandomInteger } from '../utils';
import { DestinationData } from '../enums';

const generateOffers = (destination, type) => {
  const destinationData = DestinationData[destination];
  const destinationOffers = destinationData.offers;
  const typeOffers = destinationOffers[type];

  if (typeOffers && typeOffers.length) {
    typeOffers.forEach((offer) => offer.selected = Boolean(getRandomInteger(0, 1)));

    return typeOffers.filter(({ selected }) => selected);
  }

  return [];
};

export { generateOffers };
