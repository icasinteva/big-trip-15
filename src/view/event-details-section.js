import AbstractView from './abstract';
import { createElement, render } from '../utils/render';
import { RenderPosition } from '../enums';
import { availableOffers } from '../mock/offers';
import DestinationSectionView from './destination-section';
import OffersSectionView from './offers-section';


const createEventDetailsTemaplate = () => '<section class="event__details"></section>';
class EventDetailsView extends AbstractView {
  constructor(data, offersChangeHandler) {
    super();
    this._data = data;
    this._offersChangeHandler = offersChangeHandler;
  }

  getTemplate() {
    return createEventDetailsTemaplate();
  }

  getElement() {
    if (!this._element) {
      const { destination, eventType, offers } = this._data;
      if (destination) {
        const { description, pictures = [] } = destination;
        const availableEventOffers = (availableOffers || []).find((item) => item.type === eventType).offers;
        const selectedEventTypeOffers = offers;


        let eventOffersToshow = [];

        if (availableEventOffers && selectedEventTypeOffers) {
          eventOffersToshow = availableEventOffers.map((obj) => Object.assign({}, obj));
          selectedEventTypeOffers.forEach((selected) => {
            const index = eventOffersToshow.findIndex((s) => s.title === selected.title);
            if (index !== -1) {
              eventOffersToshow[index].selected = true;
            }
          });
        }

        const offersSectionComponent = new OffersSectionView(eventOffersToshow, this._offersChangeHandler);
        const destinationSectionComponent = new DestinationSectionView(description, pictures);

        if (offersSectionComponent.getElement() || destinationSectionComponent.getElement()) {
          this._element = createElement(this.getTemplate());
          render(this._element, offersSectionComponent.getElement(), RenderPosition.BEFOREEND);
          render(this._element, destinationSectionComponent.getElement(), RenderPosition.BEFOREEND);
        }
      }
    }

    return this._element;
  }
}

export default EventDetailsView;
