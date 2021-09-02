import dayjs from 'dayjs';
import { EventType, Filter, Sorting } from './enums';

const AUTHORIZATION = 'Basic 1GmboMbGFn';
const END_POINT = 'https://15.ecmascript.pages.academy/big-trip';
const EVENTS_COUNT = 2;
const DEFAULT_FILTER = Filter.EVERYTHING;
const DEFAULT_SORTING = Sorting.DAY;
const BLANK_EVENT = { eventType: EventType.TAXI, destination: {name: ''}, startDate: dayjs(), endDate: dayjs(), price: '', offers: [] };

export { AUTHORIZATION, END_POINT, EVENTS_COUNT, DEFAULT_FILTER, DEFAULT_SORTING, BLANK_EVENT };
