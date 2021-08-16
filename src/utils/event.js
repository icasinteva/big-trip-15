import dayjs from 'dayjs';
import { EventType, Destination } from '../enums';
import { getRandomInteger } from '../utils/common';

const generateDate = () => {
  const maxDaysGap = 7;
  const daysGap = getRandomInteger(-maxDaysGap, maxDaysGap);
  const hoursGap = getRandomInteger(0, 72);

  return dayjs()
    .add(daysGap, 'day')
    .add(hoursGap, 'hour')
    .add(getRandomInteger(0, 34), 'minute');
};

const convertMS = (diffMinutes) => {
  const dayMinutes = 24 * 60;
  const days = Math.trunc(diffMinutes / dayMinutes);
  const hours = Math.trunc((diffMinutes - dayMinutes * days) / 60);
  const minutes = diffMinutes % 60;

  return new Map([
    ['D', days],
    ['H', hours],
    ['M', minutes],
  ]);
};

const getDuration = (startDate, endDate) => {
  const diff = endDate.diff(startDate, 'minute');
  const duration = convertMS(diff);
  const res = [];

  for (const [key, value] of duration) {
    if (value) {
      res.push(`${value}${key}`);
    }
  }

  return res.join(' ');
};

const generateEventType = () => {
  const eventTypes = Object.keys(EventType);
  return EventType[
    eventTypes[getRandomInteger(0, eventTypes.length - 1)]
  ];
};

const generateDestination = () => {
  const destinations = Object.keys(Destination);
  return Destination[
    destinations[getRandomInteger(0, destinations.length - 1)]
  ];
};


export {generateDate, getDuration, generateEventType, generateDestination};
