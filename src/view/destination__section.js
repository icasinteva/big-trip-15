import { gallerySection } from './gallery__section';

const destinationSection = (description = '', photos = []) => {
  if (!description && !photos.length) {
    return '';
  }

  return `<section class="event__section  event__section--destination">
                    <h3 class="event__section-title  event__section-title--destination">Destination</h3>
                    <p class="event__destination-description">${description}</p>

                    ${gallerySection(photos)}
                  </section>`;
};

export { destinationSection };
