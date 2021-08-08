import { RenderPosition } from '../enums';
import { renderNestedElement, createElement, createPriceTemplate } from '../utils';

const createEventOfferTemplate = ({ title, price }) => `<li class="event__offer">
                                                          <span class="event__offer-title">${title}</span>
                                                          +${createPriceTemplate('event__offer-price ', price)}
                                                        </li>`;

const createEventOfferListTemplate = () => '<ul class="event__selected-offers"></ul>';

class EventOffersListView {
  constructor(offers) {
    this._offers = offers;
    this._element = null;
  }

  getTemplate() {
    return createEventOfferListTemplate();
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
      this._offers.forEach((offer) => {
        const eventOfferElement = createElement(createEventOfferTemplate(offer));

        renderNestedElement(this._element, eventOfferElement, RenderPosition.BEFOREEND);
      });
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}

export default EventOffersListView;
