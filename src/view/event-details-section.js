import { renderNestedElement, createElement } from '../utils';
import { RenderPosition, DestinationData } from '../enums';
import DestinationSectionView from './destination-section';
import OffersSectionView from './offers-section';


const createEventDetailsTemaplate = () => '<section class="event__details"></section>';
class EventDetailsView {
  constructor(event) {
    this._event = event;
    this._element = null;
  }

  getTemplate() {
    return createEventDetailsTemaplate();
  }

  getElement() {
    if (!this._element) {
      const { destination, eventType } = this._event;
      const { offers = {}, description, photos = [] } = DestinationData[destination];
      const eventTypeOffers = offers[eventType];
      const offersSectionComponent = new OffersSectionView(eventTypeOffers);
      const destinationSectionComponent = new DestinationSectionView(description, photos);


      if (offersSectionComponent.getElement() || destinationSectionComponent.getElement()) {
        this._element = createElement(this.getTemplate());
        renderNestedElement(this._element, offersSectionComponent.getElement(), RenderPosition.BEFOREEND);
        renderNestedElement(this._element, destinationSectionComponent.getElement(), RenderPosition.BEFOREEND);
      }
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}

export default EventDetailsView;
