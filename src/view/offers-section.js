import { offerItem } from './offer-item';
const offers = {
  flight: [
    {
      name: 'Add luggage',
      id: 'event-offer-luggage',
      priceAmount: 50,
      selected: true,
    },
    {
      name: 'Switch to comfort',
      id: 'event-offer-comfort',
      priceAmount: 80,
      selected: true,
    },
    {
      name: 'Add meal',
      id: 'event-offer-meal',
      priceAmount: 15,
      selected: false,
    },
    {
      name: 'Choose seats',
      id: 'event-offer-seats',
      priceAmount: 5,
      selected: false,
    },
    {
      name: 'Travel by train',
      id: 'event-offer-train',
      priceAmount: 40,
      selected: false,
    },
  ],
};

export const offersSection = type => {
  const offerItems = offers[type].map(offer => offerItem(offer)).join('');
  return `<section class="event__section  event__section--offers">
                    <h3 class="event__section-title  event__section-title--offers">Offers</h3>
                    <div class="event__available-offers">${offerItems}</div>
                  </section>`;
};
