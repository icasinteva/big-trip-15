import { price } from './price';

const eventPrice = () => `<p class="event-price">
              Total: ${price('event-price')}
            </p>`;

export { eventPrice };
