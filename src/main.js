import { EVENTS_COUNT } from './const';
import { generateEvent } from './mock/event';
import SiteMenuView from './view/site-navigation';
import EventsModel from './model/events';
import FiltersModel from './model/filters';
import Trip from './presenter/trip';
import StatsView from './view/stats';
import { render, remove } from './utils/render';
import { RenderPosition, MenuItem } from './enums';

const events = new Array(EVENTS_COUNT).fill().map(generateEvent);
const eventsModel = new EventsModel();
const filtersModel = new FiltersModel();
const siteMenuComponent = new SiteMenuView();
let statisticsComponent = null;


eventsModel.setEvents(events);

const bodyElement = document.querySelector('body.page-body');
const tripPresenter = new Trip(bodyElement, filtersModel, eventsModel);

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
