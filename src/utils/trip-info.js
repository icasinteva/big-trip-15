
import { MIN_DESTINATIONS_TO_SHOW, DESTINATIONS_TO_SHOW } from '../const';
import { humanizeEventStartDate } from '../utils/common';

const calculateTripCost = (items) =>
  items.reduce((acc, reducer) => {
    let offersCost = 0;
    const { price = 0, offers } = reducer;

    if (offers) {
      offersCost = calculateTripCost(offers);
    }

    return acc + price + offersCost;
  }, 0);


const getTripRange = (events) => {
  const sortedEvents = events;

  return {
    startDate: humanizeEventStartDate(sortedEvents[0].startDate),
    endDate: humanizeEventStartDate(sortedEvents[sortedEvents.length - 1].endDate),
  };
};

const getDestinations = (events) => {
  const start = events[0].destination ? events[0].destination.name : '';
  const end = events[events.length - 1].destination ? events[events.length - 1].destination.name : '';

  if (events.length === MIN_DESTINATIONS_TO_SHOW) {
    return [start];
  } else if (events.length > DESTINATIONS_TO_SHOW) {
    return [start, '...', end].join(' — ');
  }

  return [ start, ...Array.from(new Set(events.slice(1, events.length - 1).map(({ destination }) => destination.name))), end].join(' — ');
};

export {calculateTripCost, getTripRange, getDestinations};
