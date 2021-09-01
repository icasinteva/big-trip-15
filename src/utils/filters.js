import dayjs from 'dayjs';
import { Filter } from '../enums';

const filterEverything = (events) => events;

const filterFutureEvents = (events) =>
  events.filter(({ startDate }) => startDate.isAfter(dayjs()));

const filterPastEvents = (events) =>
  events.filter(({ startDate }) => !startDate.isAfter(dayjs()));

const filterTypeToCallBack = {
  [Filter.EVERYTHING]: filterEverything,
  [Filter.FUTURE]: filterFutureEvents,
  [Filter.PAST]: filterPastEvents,
};

export {filterTypeToCallBack};
