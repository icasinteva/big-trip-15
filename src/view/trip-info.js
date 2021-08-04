import { priceTemplate } from './price';

const tripCost = price => `<p class="trip-info__cost">
              Total: ${priceTemplate('trip-info__cost', price)}
            </p>`;

const tripInfo = ({
  dates: { startDate, endDate },
  destinations,
  price,
}) => `<section class="trip-main__trip-info  trip-info">
            <div class="trip-info__main">
              <h1 class="trip-info__title">${destinations.join(' — ')}</h1>

              <p class="trip-info__dates">${startDate}&nbsp;—&nbsp;${endDate}</p>
            </div>

            ${tripCost(price)}
          </section>`;
export { tripInfo };
