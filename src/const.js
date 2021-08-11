import dayjs from 'dayjs';
import { EventType, Filter, Sorting } from './enums';

const DEFAULT_FILTER = Filter.EVERYTHING;
const DEFAULT_SORTING = Sorting.DAY;
const BLANK_EVENT = { eventType: EventType.TAXI, destination: '', startDate: dayjs(), endDate: dayjs(), price: '' };

export { DEFAULT_FILTER, DEFAULT_SORTING, BLANK_EVENT };
