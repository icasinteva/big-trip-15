import { getRandomInteger } from '../utils/common';
import { DestinationData } from '../enums';

const generateOffers = (destination, eventType) => {
  const destinationData = DestinationData[destination];
  const destinationOffers = destinationData.offers;
  const eventTypeOffers = destinationOffers[eventType];

  if (eventTypeOffers && eventTypeOffers.length) {
    const cloneEventTypeOffers = eventTypeOffers.map((offer) => {
      const clone = { ...offer };

      clone.selected = Boolean(getRandomInteger(0, 1));

      return clone;
    });

    const selectedEventOffers = [];

    cloneEventTypeOffers.forEach((eventTypeOffer) => {
      if (eventTypeOffer.selected) {
        selectedEventOffers.push(eventTypeOffer);
        delete eventTypeOffer.selected;
      }
    });

    return selectedEventOffers;
  }

  return [];
};

export { generateOffers };
