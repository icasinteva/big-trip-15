import AbstractView from './abstract-view';
import { createPriceTemplate } from '../utils/render';
import { nanoid } from 'nanoid';

const createOfferItemTemplate = ({ title, id = nanoid(), selected, price }) => {
  const checked = selected ? 'checked' : '';

  return `<div class="event__offer-selector">
  <input class="event__offer-checkbox  visually-hidden" id="${id}" type="checkbox" name=${id} ${checked} data-price=${price} data-title="${title}">
  <label class="event__offer-label" for="${id}">
    <span class="event__offer-title">${title}</span>
    +${createPriceTemplate('event__offer-price ', price)}
  </label>
</div>`;
};

class OfferItemView extends AbstractView {
  constructor(offerData, offersChangeHandler) {
    super();
    this._offerData = offerData;
    this.queryChildElement('.event__offer-checkbox').addEventListener(
      'change',
      offersChangeHandler,
    );
  }

  getTemplate() {
    return createOfferItemTemplate(this._offerData);
  }
}
export default OfferItemView;
