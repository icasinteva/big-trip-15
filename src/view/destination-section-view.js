import AbstractView from './abstract-view';
import { RenderPosition } from '../enums';
import { createElement, render } from '../utils/render';
import GallerySectionView from './gallery-section-view';

const createDescriptionSectionTemplate = (description = '') => {
  const descriptionSection = description ? `<p class="event__destination-description">${description}</p>` : '';

  return descriptionSection;
};
const createDestinationSectionTemplate = () => `<section class="event__section  event__section--destination">
            <h3 class="event__section-title  event__section-title--destination">Destination</h3>
          </section>`;

class DestinationSectionView extends AbstractView {
  constructor(description, pictures) {
    super();
    this._description = description;
    this._pictures = pictures;
  }

  getTemplate() {
    return createDestinationSectionTemplate();
  }

  getElement() {
    if (!this._element) {
      const arePicturesPresent = this._pictures.length;
      const descriptionElement = createElement(createDescriptionSectionTemplate(this._description));

      if (descriptionElement || arePicturesPresent) {
        this._element = createElement(this.getTemplate());
      }

      if (descriptionElement) {
        render(this._element, descriptionElement, RenderPosition.BEFOREEND);
      }

      if (arePicturesPresent) {
        render(this._element, new GallerySectionView(this._pictures).getElement(), RenderPosition.BEFOREEND);
      }
    }

    return this._element;
  }
}

export default DestinationSectionView;
