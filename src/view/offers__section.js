import { offerItem } from './offer-item';

const offersSection = offers => {
  const offerItems = offers.map(offer => offerItem(offer)).join('');
  return `<section class="event__section  event__section--offers">
                    <h3 class="event__section-title  event__section-title--offers">Offers</h3>
                    <div class="event__available-offers">${offerItems}</div>
                  </section>`;
};
export { offersSection };
