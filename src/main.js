import { AUTHORIZATION, END_POINT } from './const';
import EventsModel from './model/events';
import FiltersModel from './model/filters';
import Trip from './presenter/trip';
import SiteMenuView from './view/site-navigation';
import StatsView from './view/stats';
import { render, remove } from './utils/render';
import { RenderPosition, UpdateType, MenuItem } from './enums';
import Api from './api.js';

const bodyElement = document.querySelector('body.page-body');
let statisticsComponent = null;
const eventsModel = new EventsModel();
const filtersModel = new FiltersModel();
const siteMenuComponent = new SiteMenuView();
const api = new Api(END_POINT, AUTHORIZATION);

const tripPresenter = new Trip(bodyElement, filtersModel, eventsModel, api);

render(bodyElement.querySelector('.trip-controls'), siteMenuComponent, RenderPosition.BEFOREEND);

const handleSiteMenuClick = (menuItem) => {
  switch (menuItem) {
    case MenuItem.TABLE: {
      remove(statisticsComponent);
      tripPresenter.init();
      siteMenuComponent.setMenuItem(menuItem);
      break;
    }
    case MenuItem.STATS: {
      tripPresenter.destroy();
      siteMenuComponent.setMenuItem(menuItem);
      statisticsComponent = new StatsView(eventsModel.getEvents());
      render(bodyElement.querySelector('.page-main .page-body__container'), statisticsComponent, RenderPosition.BEFOREEND);
      break;
    }
  }
};

siteMenuComponent.setMenuClickHandler(handleSiteMenuClick);

tripPresenter.init();

Promise.all([
  api.getEvents(),
  api.getDestinations(),
  api.getOffers(),
])
  .then(([events, destinations, offers]) => {
    eventsModel.destinations = destinations;
    eventsModel.offers = offers;
    eventsModel.setEvents(UpdateType.INIT, events);
  })
  .catch(() => {
    eventsModel.destinations = [];
    eventsModel.offers = [];
    eventsModel.setEvents(UpdateType.INIT, []);
  });

