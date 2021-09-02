import { DESTINATIONS_TO_SHOW } from '../const';
import { createPriceTemplate } from '../utils/render';
import { calculateTripCost, getTripRange, getDestinations } from '../utils/trip-info';
import AbstractView from './abstract';

const createTripInfoTemplate = (events) => {
  const { startDate, endDate } = getTripRange(events);
  let destinations = getDestinations(events);
  const price = calculateTripCost(events);

  if (destinations.length > DESTINATIONS_TO_SHOW) {
    destinations = [destinations[0], '...', destinations[destinations.length - 1]];
  }

  return `<section class="trip-main__trip-info  trip-info">
            <div class="trip-info__main">
              <h1 class="trip-info__title">${destinations.join(' — ')}</h1>
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
