import dayjs from 'dayjs';
import { EventType, Filter, Sorting } from './enums';

const AUTHORIZATION = 'Basic 1GmbiMbGFn';
const END_POINT = 'https://15.ecmascript.pages.academy/big-trip';

const DESTINATIONS_TO_SHOW = 3;

const SHAKE_ANIMATION_TIMEOUT = 600;

const DEFAULT_FILTER = Filter.EVERYTHING;
const DEFAULT_SORTING = Sorting.DAY;
const BLANK_EVENT = { eventType: EventType.TAXI, destination: {name: ''}, startDate: dayjs(), endDate: dayjs(), price: '', offers: [] };

export { AUTHORIZATION, END_POINT, DEFAULT_FILTER, DEFAULT_SORTING, BLANK_EVENT, DESTINATIONS_TO_SHOW, SHAKE_ANIMATION_TIMEOUT };
