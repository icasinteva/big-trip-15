
import { sortEventsByDateUp, humanizeEventStartDate } from '../utils/common';

const calculateTripCost = (arr) =>
  arr.reduce((acc, reducer) => {
    let offersCost = 0;
    const { price, offers } = reducer;

    if (offers) {
      offersCost = calculateTripCost(offers);
    }

    return acc + price + offersCost;
  }, 0);


const getTripRange = (events) => {
  const sortedEvents = sortEventsByDateUp(events);

  return {
    startDate: humanizeEventStartDate(sortedEvents[0].startDate),
    endDate: humanizeEventStartDate(sortedEvents[sortedEvents.length - 1].startDate),
  };
};

const getDestinations = (events) => {
  const start = events[0].destination;
  const end = events[events.length - 1].destination;

  return [ start, ...Array.from(new Set(events.slice(1, events.length - 1).map(({ destination }) => destination))), end];
};

export {calculateTripCost, getTripRange, getDestinations};
