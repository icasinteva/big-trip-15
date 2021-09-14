import { RenderPosition } from '../enums';
import { createElement, render } from '../utils/render';
import OfferItemView from './offer-item-view';
import Smart from './smart-view';

const createOffersSectionTemplate = () => `<section class="event__section  event__section--offers">
                    <h3 class="event__section-title  event__section-title--offers">Offers</h3>
                    <div class="event__available-offers"></div>
                  </section>`;

class OffersSectionView extends Smart {
  constructor(offers = [], offersChangeHandler) {
    super();
    this._offers = offers;
    this._offersChangeHandler = offersChangeHandler;
  }

  getTemplate() {
    return createOffersSectionTemplate();
  }

  getElement() {
    if (!this._element && this._offers.length) {
      this._element = createElement(this.getTemplate());
      this._offers.forEach((offer) => render(this._element.querySelector('.event__available-offers'), new OfferItemView(offer, this._offersChangeHandler).getElement(), RenderPosition.BEFOREEND));
    }

    return this._element;
  }
}

export default OffersSectionView;
