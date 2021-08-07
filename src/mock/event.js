import { getRandomInteger, generateDate, generateType, generateDestination } from '../utils';
import { generateOffers } from './offers';

const generateEvent = () => {
  const startDate = generateDate();
  const endDate = startDate
    .add(getRandomInteger(0, 5), 'day')
    .add(getRandomInteger(0, 24), 'hour')
    .add(getRandomInteger(0, 56), 'minute');
  const type = generateType();
  const destination = generateDestination();

  return {
    price: getRandomInteger(0, 1000),
    startDate,
    endDate,
    destination,
    id: '0',
    isFavorite: Boolean(getRandomInteger(0, 1)),
    offers: generateOffers(destination, type),
    type,
  };
};

export { generateEvent };
