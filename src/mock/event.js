import { nanoid } from 'nanoid';
import { getRandomInteger } from '../utils/common';
import { generateDate, generateEventType, generateDestination } from '../utils/event';
import { generateOffers } from './offers';

const generateEvent = () => {
  const startDate = generateDate();
  const endDate = startDate
    .add(getRandomInteger(0, 5), 'day')
    .add(getRandomInteger(0, 24), 'hour')
    .add(getRandomInteger(0, 56), 'minute');
  const eventType = generateEventType();
  const destination = generateDestination();

  return {
    price: getRandomInteger(0, 1000),
    startDate,
    endDate,
    destination,
    id: nanoid(),
    isFavorite: Boolean(getRandomInteger(0, 1)),
    offers: generateOffers(destination, eventType),
    eventType,
  };
};

export { generateEvent };
