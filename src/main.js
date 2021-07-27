import { tripInfo } from './view/trip-info';
import { tripControls } from './view/trip-controls';
import { tripEventsSection } from './view/trip-events-section';

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const tripMain = document.querySelector('.trip-main');
const addNewTripBtn = document.querySelector('.trip-main__event-add-btn');
const main = document.querySelector('main .page-body__container');

render(tripMain, tripInfo(), 'afterBegin');
render(addNewTripBtn, tripControls(), 'beforeBegin');
render(main, tripEventsSection(), 'afterBegin');
