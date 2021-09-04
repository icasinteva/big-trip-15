import { createPriceTemplate } from '../utils/render';
import { calculateTripCost, getTripRange, getDestinations } from '../utils/trip-info';
import AbstractView from './abstract';

const createTripInfoTemplate = (events) => {
  const { startDate, endDate } = getTripRange(events);
  const destinations = getDestinations(events);
  const price = calculateTripCost(events);

  return `<section class="trip-main__trip-info  trip-info">
            <div class="trip-info__main">
              <h1 class="trip-info__title">${destinations}</h1>
              <p class="trip-info__dates">${startDate}&nbsp;—&nbsp;${endDate}</p>
            </div>
            <p class="trip-info__cost">
              Total: ${createPriceTemplate('trip-info__cost', price)}
            </p>
          </section>`;
};
class TripInfoView extends AbstractView {
  constructor(events) {
    super();
    this._events = events;
  }

  getTemplate() {
    return createTripInfoTemplate(this._events);
  }
}

export default TripInfoView;
