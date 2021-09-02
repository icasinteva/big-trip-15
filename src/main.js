import { AUTHORIZATION, END_POINT } from './const';
import EventsModel from './model/events';
import FiltersModel from './model/filters';
import Trip from './presenter/trip';
import Api from './api.js';
import { UpdateType } from './enums';

const bodyElement = document.querySelector('body.page-body');
const eventsModel = new EventsModel();
const filtersModel = new FiltersModel();
const api = new Api(END_POINT, AUTHORIZATION);

const tripPresenter = new Trip(bodyElement, filtersModel, eventsModel, api);

tripPresenter.init();

api.getEvents()
  .then((events) => {
    eventsModel.setEvents(UpdateType.INIT, events);
  })
  .catch(() => {
    eventsModel.setEvents(UpdateType.INIT, []);
  });

