import { createElement, createPriceTemplate } from '../utils';

const createTripInfoTemplate = ({
  dates: { startDate, endDate },
  destinations,
  price,
}) => `<section class="trip-main__trip-info  trip-info">
        <div class="trip-info__main">
          <h1 class="trip-info__title">${destinations.join(' — ')}</h1>
          <p class="trip-info__dates">${startDate}&nbsp;—&nbsp;${endDate}</p>
        </div>
        <p class="trip-info__cost">
          Total: ${createPriceTemplate('trip-info__cost', price)}
        </p>
      </section>`;
class TripInfoView {
  constructor(tripInfo) {
    this._tripInfo = tripInfo;
    this._element = null;
  }

  getTemplate() {
    return createTripInfoTemplate(this._tripInfo);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}

export default TripInfoView;
