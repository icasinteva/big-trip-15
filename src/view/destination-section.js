import { RenderPosition } from '../enums';
import { renderNestedElement, createElement } from '../utils';
import GallerySectionView from './gallery-section';

const createDescriptionSectionTemplate = (description = '') => {
  const descriptionSection = description ? `<p class="event__destination-description">${description}</p>` : '';

  return descriptionSection;
};
const createDestinationSectionTemplate = () => `<section class="event__section  event__section--destination">
            <h3 class="event__section-title  event__section-title--destination">Destination</h3>
          </section>`;

class DestinationSectionView {
  constructor(description, photos) {
    this._description = description;
    this._photos = photos;
    this._element = null;
  }

  getTemplate() {
    return createDestinationSectionTemplate();
  }

  getElement() {
    if (!this._element) {
      const gallerySectionComponent = new GallerySectionView(this._photos);
      const descriptionElement = createElement(createDescriptionSectionTemplate(this._description));

      if (descriptionElement || gallerySectionComponent.getElement()) {
        this._element = createElement(this.getTemplate());
      }

      if (descriptionElement) {
        renderNestedElement(this._element, descriptionElement, RenderPosition.BEFOREEND);
      }

      if (gallerySectionComponent.getElement()) {
        renderNestedElement(this._element, gallerySectionComponent.getElement(), RenderPosition.BEFOREEND);
      }
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}

export default DestinationSectionView;
