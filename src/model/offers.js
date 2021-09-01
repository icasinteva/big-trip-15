import AbstractObserver from '../utils/abstract-observer';

class Offers extends AbstractObserver {
  constructor() {
    super();
    this._offers = [];
  }

  setEvents(offers) {
    this._offers = offers.slice();
  }

  getEvents() {
    return this._offers;
  }
}

export default Offers;
