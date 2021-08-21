import AbstractView from './abstract';
import { createElement, render } from '../utils/render';
import { RenderPosition, DestinationData } from '../enums';
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
      const { destination, eventType } = this._data;
      if (destination) {
        const { description, photos = [] } = DestinationData[destination];
        const availableEventOffers = DestinationData[destination].offers[eventType];
        const selectedEventTypeOffers = this._data.offers;

        let eventOffersToshow = [];

        if (availableEventOffers && selectedEventTypeOffers) {
          for (let i = 0; i < availableEventOffers.length; i++) {
            const eventOfferToShow = { ...availableEventOffers[i] };

            for (let j = 0; j < selectedEventTypeOffers.length; j++) {
              const selectedOffer = { ...selectedEventTypeOffers[j] };

              if (eventOfferToShow.title === selectedOffer.title) {
                eventOfferToShow.selected = true;
                continue;
              }
            }
            eventOffersToshow.push({ ...eventOfferToShow });
          }
        } else if (availableEventOffers) {
          eventOffersToshow = [...availableEventOffers];
        }

        const offersSectionComponent = new OffersSectionView(eventOffersToshow, this._offersChangeHandler);
        const destinationSectionComponent = new DestinationSectionView(description, photos);


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
