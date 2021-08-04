import { priceTemplate } from './price';

const eventOfferList = (offers) => {
  const eventOffersTemplate = offers
    .map(
      ({ title, price }) => `<li class="event__offer">
                    <span class="event__offer-title">${title}</span>
                    +${priceTemplate('event__offer-price ', price)}
                  </li>`,
    )
    .join('');
  return `<ul class="event__selected-offers">
                  ${eventOffersTemplate}
                </ul>`;
};

export { eventOfferList };
