import { destinationSection } from './destination__section';
import { offersSection } from './offers__section';

const eventDetailsSection = (destination) => {
  const { offers = [], description, photos = [] } = destination;

  if (!offers.length && !description && !photos.length) {
    return '';
  }

  return `<section class="event__details">
              ${offers.length ? offersSection(offers) : ''}
              ${destinationSection(description, photos)}
          </section>`;
};
export { eventDetailsSection };
