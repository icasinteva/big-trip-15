import { tripEventsSort } from './tripe-events-sort';
import { tripEventsList } from './trip-events__list';

export const tripEventsSection = () => `<section class="trip-events">
          <h2 class="visually-hidden">Trip events</h2>

          ${tripEventsSort()}

          ${tripEventsList()}
        </section>`;
