import { RenderPosition } from '../enums';
import { renderNestedElement, createElement } from '../utils';
import OfferItemView from './offer-item';

const createOffersSectionTemplate = () => `<section class="event__section  event__section--offers">
                    <h3 class="event__section-title  event__section-title--offers">Offers</h3>
                    <div class="event__available-offers"></div>
                  </section>`;

class OffersSectionView {
  constructor(offers = []) {
    this._offers = offers;
    this._element = null;
  }

  getTemplate() {
    return createOffersSectionTemplate();
  }

  getElement() {
    if (!this._element && this._offers.length) {
      this._element = createElement(this.getTemplate());
      this._offers.forEach((offer) => renderNestedElement(this._element.querySelector('.event__available-offers'), new OfferItemView(offer).getElement(), RenderPosition.BEFOREEND));
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}

export default OffersSectionView;
