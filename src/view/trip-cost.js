import { price } from './price';

export const tripCost = () => `<p class="trip-info__cost">
              Total: ${price('trip-info__cost', 1230)}
            </p>`;
