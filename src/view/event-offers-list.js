import AbstractView from './abstract';
import { RenderPosition } from '../enums';
import { render, createElement } from '../utils/render';
import { createPriceTemplate } from '../utils/render';

const createEventOfferTemplate = ({ title, price }) => `<li class="event__offer">
                                                          <span class="event__offer-title">${title}</span>
                                                          +${createPriceTemplate('event__offer-price ', price)}
                                                        </li>`;

const createEventOfferListTemplate = () => '<ul class="event__selected-offers"></ul>';

class EventOffersListView extends AbstractView {
  constructor(offers) {
    super();
    this._offers = offers;
  }

  getTemplate() {
    return createEventOfferListTemplate();
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
      this._offers.forEach((offer) => {
        const eventOfferElement = createElement(createEventOfferTemplate(offer));

        render(this._element, eventOfferElement, RenderPosition.BEFOREEND);
      });
    }

    return this._element;
  }
}

export default EventOffersListView;
