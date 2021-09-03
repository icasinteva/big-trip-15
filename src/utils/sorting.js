import { Sorting } from '../enums';

const sortDateUp = (a, b) => a.isAfter(b) ? 1 : -1;

const sortEventsByDate = (events, callBack) =>
  events.slice().sort((a, b) => callBack(a.startDate, b.startDate));

const sortEventsByDateUp = (events) => sortEventsByDate(events, sortDateUp);

const sortEventsByTime = (events) =>
  events.slice().sort((a, b) => {
    const durationA = a.endDate.diff(a.startDate);
    const durationB = b.endDate.diff(b.startDate);

    return durationA > durationB ? 1 : -1;
  });

const sortEventsByPrice = (events) =>
  events.slice().sort((a, b) => a.price > b.price ? 1 : -1);

const sortTypeToCallBack = {
  [Sorting.DAY]: sortEventsByDateUp,
  [Sorting.TIME]: sortEventsByTime,
  [Sorting.PRICE]: sortEventsByPrice,
};

export {sortTypeToCallBack};
