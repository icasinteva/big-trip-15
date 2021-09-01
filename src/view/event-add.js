import { nanoid } from 'nanoid';
import { BLANK_EVENT } from '../const';
import { RenderPosition } from '../enums';
import { createElement, render } from '../utils/render';
import { createFormTemplate } from '../utils/add-edit-form';
import Smart from './smart';
import EventDetailsView from './event-details-section';

class AddEventFormView extends Smart {
  constructor(event = BLANK_EVENT) {
    super();
    this._data = AddEventFormView.parseEventToData(event);
    this._eventTypeChangeHandler = this._eventTypeChangeHandler.bind(this);
    this._destinationChangeHandler = this._destinationChangeHandler.bind(this);
    this._offersChangeHandler = this._offersChangeHandler.bind(this);
    this._priceChangeHandler = this._priceChangeHandler.bind(this);
    this._cancelClickHandler = this._cancelClickHandler.bind(this);
    this._saveClickHandler = this._saveClickHandler.bind(this);

    this._setInnerHandlers();
  }

  static parseEventToData(event) {
    return Object.assign(
      {},
      event,
    );
  }

  static parseDataToEvent(data) {
    return Object.assign(
      {},
      { id: nanoid()},
      data,
    );
  }

  getTemplate() {
    return createFormTemplate(this._data);
  }

  getElement() {
    if (!this._element) {
      this._element  = createElement(this.getTemplate());

      render(this._element, new EventDetailsView(this._data, this._offersChangeHandler).getElement(), RenderPosition.BEFOREEND);
    }

    return this._element;
  }

  restoreHandlers() {
    this._setInnerHandlers();
    this.setCancelClickHandler(this._callback.cancelClick);
    this.setSaveClickHandler(this._callback.saveClick);
  }

  _setInnerHandlers() {
    this.queryChildElements('.event__type-input').forEach((eventTypeInput) => eventTypeInput.addEventListener('change', this._eventTypeChangeHandler));
    this.queryChildElement('.event__input--destination').addEventListener('change', this._destinationChangeHandler);
    this.queryChildElement('.event__input--price').addEventListener('change', this._priceChangeHandler);
  }

  _eventTypeChangeHandler({target}) {
    this.updateData({ eventType: target.value });
  }

  _destinationChangeHandler({target}) {
    this.updateData({ destination: target.value });
  }

  _offersChangeHandler({target}) {
    const { price, title } = target.dataset;
    this.updateData({ offers: [...this._data.offers, { id: target.name, price: +price, title }] });
  }

  _priceChangeHandler({target}) {
    this.updateData({ price: +target.value });
  }

  _cancelClickHandler(evt) {
    evt.preventDefault();
    this._callback.cancelClick();
  }

  _saveClickHandler(evt) {
    evt.preventDefault();
    this._callback.saveClick(AddEventFormView.parseDataToEvent(this._data));
  }

  setCancelClickHandler(callback) {
    this._callback.cancelClick = callback;
    this.queryChildElement('.event__reset-btn').addEventListener('click', this._cancelClickHandler);
  }

  setSaveClickHandler(callback) {
    this._callback.saveClick = callback;
    this.getElement().addEventListener('submit', this._saveClickHandler);
  }
}
export default AddEventFormView;
