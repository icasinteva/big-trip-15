import { AUTHORIZATION, END_POINT } from './const';
import EventsModel from './model/events-model';
import FiltersModel from './model/filters-model';
import FiltersPresenter from './presenter/filters-presenter';
import TripPresenter from './presenter/trip-presenter';
import SiteMenuView from './view/site-menu-view';
import StatsView from './view/stats-view';
import { render, remove } from './utils/render';
import { RenderPosition, UpdateType, MenuItem } from './enums';
import Api from './api/api';
import { STORE_NAME } from './const';
import Store from './api/store.js';
import Provider from './api/provider.js';
import SortingModel from './model/sorting-model';

const bodyElement = document.querySelector('body.page-body');
let statisticsComponent = null;
const api = new Api(END_POINT, AUTHORIZATION);
const store = new Store(STORE_NAME, window.localStorage);
const apiWithProvider = new Provider(api, store);
const eventsModel = new EventsModel();
const filtersModel = new FiltersModel();
const sortingModel = new SortingModel();
const siteMenuComponent = new SiteMenuView();
const tripPresenter = new TripPresenter(
  bodyElement,
  filtersModel,
  sortingModel,
  eventsModel,
  apiWithProvider,
);

const filtersPresenter = new FiltersPresenter(bodyElement.querySelector('.trip-controls'), filtersModel, eventsModel);

render(
  bodyElement.querySelector('.trip-controls'),
  siteMenuComponent,
  RenderPosition.BEFOREEND,
);

const handleSiteMenuClick = (menuItem) => {
  switch (menuItem) {
    case MenuItem.TABLE: {
      remove(statisticsComponent);
      tripPresenter.init();
      filtersPresenter.disabled = false;
      siteMenuComponent.setMenuItem(menuItem);
      break;
    }
    case MenuItem.STATS: {
      tripPresenter.destroy();
      filtersPresenter.disabled = true;
      siteMenuComponent.setMenuItem(menuItem);
      statisticsComponent = new StatsView(eventsModel.getEvents());
      render(
        bodyElement.querySelector('.page-main .page-body__container'),
        statisticsComponent,
        RenderPosition.BEFOREEND,
      );
      break;
    }
  }
};

siteMenuComponent.setMenuClickHandler(handleSiteMenuClick);

tripPresenter.init();

Promise.all([
  apiWithProvider.getEvents(),
  apiWithProvider.getDestinations(),
  apiWithProvider.getOffers(),
])
  .then(([events, destinations, offers]) => {
    eventsModel.destinations = destinations;
    eventsModel.offers = offers;
    eventsModel.setEvents(UpdateType.INIT, events);
    filtersPresenter.init();
  })
  .catch(() => {
    eventsModel.destinations = [];
    eventsModel.offers = [];
    filtersPresenter.disabled = true;
    eventsModel.setEvents(UpdateType.INIT, []);
  });

window.addEventListener('load', () => {
  navigator.serviceWorker.register('/sw.js');
});

window.addEventListener('online', () => {
  document.title = document.title.replace(' [offline]', '');
  apiWithProvider.sync();
});

window.addEventListener('offline', () => {
  document.title += ' [offline]';
});
