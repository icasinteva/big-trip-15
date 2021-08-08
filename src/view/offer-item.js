import { createElement, createPriceTemplate } from '../utils';


const createOfferItemTemplate = ({
  title,
  id,
  selected,
  price,
}) => {
  const checked = selected ? 'checked' : '';

  return `<div class="event__offer-selector">
  <input class="event__offer-checkbox  visually-hidden" id="${id}-1" type="checkbox" name=${id} ${checked}>
  <label class="event__offer-label" for="${id}-1">
    <span class="event__offer-title">${title}</span>
    +${createPriceTemplate('event__offer-price ', price)}
  </label>
</div>`;
};

class OfferItemView {
  constructor(offerData) {
    this._offerData = offerData;
    this._element = null;
  }

  getTemplate() {
    return createOfferItemTemplate(this._offerData);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
export default OfferItemView;
