import { getRandomInteger, generateDate, generateDestination } from '../utils';
import { generateOffers } from './offers';
import { Type } from '../enums';

const generateEvent = () => {
  const startDate = generateDate();
  const endDate = startDate
    .add(getRandomInteger(0, 5), 'day')
    .add(getRandomInteger(0, 24), 'hour')
    .add(getRandomInteger(0, 56), 'minute');
  const type = Type[getRandomInteger(0, Type.length - 1)];

  return {
    price: getRandomInteger(0, 1000),
    startDate,
    endDate,
    destination: generateDestination(),
    id: '0',
    isFavorite: Boolean(getRandomInteger(0, 1)),
    offers: generateOffers(type),
    type,
  };
};

export { generateEvent };
