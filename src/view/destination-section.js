import AbstractView from './abstract';
import { RenderPosition } from '../enums';
import { createElement, render } from '../utils/render';
import GallerySectionView from './gallery-section';

const createDescriptionSectionTemplate = (description = '') => {
  const descriptionSection = description ? `<p class="event__destination-description">${description}</p>` : '';

  return descriptionSection;
};
const createDestinationSectionTemplate = () => `<section class="event__section  event__section--destination">
            <h3 class="event__section-title  event__section-title--destination">Destination</h3>
          </section>`;

class DestinationSectionView extends AbstractView {
  constructor(description, photos) {
    super();
    this._description = description;
    this._photos = photos;
  }

  getTemplate() {
    return createDestinationSectionTemplate();
  }

  getElement() {
    if (!this._element) {
      const arePhotosPresent = this._photos.length;
      const descriptionElement = createElement(createDescriptionSectionTemplate(this._description));

      if (descriptionElement || arePhotosPresent) {
        this._element = createElement(this.getTemplate());
      }

      if (descriptionElement) {
        render(this._element, descriptionElement, RenderPosition.BEFOREEND);
      }

      if (arePhotosPresent) {
        render(this._element, new GallerySectionView(this._photos).getElement(), RenderPosition.BEFOREEND);
      }
    }

    return this._element;
  }
}

export default DestinationSectionView;
