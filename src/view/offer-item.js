import { priceTemplate } from './price';

const offerItem = ({
  name,
  id,
  priceAmount,
  selected,
}) => `<div class="event__offer-selector">
                        <input class="event__offer-checkbox  visually-hidden" id="${id}-1" type="checkbox" name=${id} ${
  selected ? 'checked' : ''
}>
                        <label class="event__offer-label" for="${id}-1">
                          <span class="event__offer-title">${name}</span>
                          +${priceTemplate('event__offer-price ', priceAmount)}
                        </label>
                      </div>`;
export { offerItem };
