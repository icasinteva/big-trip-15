import { nanoid } from 'nanoid';
import { BLANK_EVENT } from '../const';
import { RenderPosition } from '../enums';
import { createElement, render } from '../utils/render';
import { createFormTemplate } from '../utils/add-edit-form';
import Smart from './smart';
import EventDetailsView from './event-details-section';
import flatpickr from 'flatpickr';
import { destinations } from '../mock/destinations';

import '../../node_modules/flatpickr/dist/flatpickr.min.css';
import { humanizeEventDate, transformDateToUsFormat } from '../utils/common';

class AddEventFormView extends Smart {
  constructor(event = BLANK_EVENT) {
    super();
    this._data = AddEventFormView.parseEventToData(event);
    this._startDatePicker = null;
    this._endDatePicker = null;
    this._eventTypeChangeHandler = this._eventTypeChangeHandler.bind(this);
    this._destinationChangeHandler = this._destinationChangeHandler.bind(this);
    this._startDateChangeHandler = this._startDateChangeHandler.bind(this);
    this._endDateChangeHandler = this._endDateChangeHandler.bind(this);
    this._offersChangeHandler = this._offersChangeHandler.bind(this);
    this._priceChangeHandler = this._priceChangeHandler.bind(this);
    this._cancelClickHandler = this._cancelClickHandler.bind(this);
    this._saveClickHandler = this._saveClickHandler.bind(this);

    this._setInnerHandlers();
    this._setDatepickers();
  }

  static parseEventToData(event) {
    return Object.assign(
      {},
      event,
    );
  }

  static parseDataToEvent(data) {
    let { startDate, endDate } = data;

    if (typeof startDate === 'string') {
      startDate = transformDateToUsFormat(startDate);
    }
    if (typeof endDate === 'string') {
      endDate = transformDateToUsFormat(endDate);
    }

    return Object.assign(
      {},
      { id: nanoid() },
      data,
      { startDate, endDate },
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
    this._setDatepickers();
    if (this.setExitEditModeListener) {
      this.setExitEditModeListener(this._callback.exitEditMode);
    }
    this.setCancelClickHandler(this._callback.cancelClick);
    this.setSaveClickHandler(this._callback.saveClick);
  }

  _setDatepickers() {
    if (this._startDatePicker) {
      this._startDatePicker.destroy();
      this._startDatePicker = null;
    }

    if (this._endDatePicker) {
      this._endDatePicker.destroy();
      this._endDatePicker = null;
    }

    this._startDatePicker = flatpickr(
      this.queryChildElement('[name="event-start-time"]'),
      {
        dateFormat: 'd/m/y H:i',
        defaultDate: this._data.startDate,
        minDate: 'today',
        enableTime:true,
        allowInput: true,
        'time_24hr': true,
        onChange: this._startDateChangeHandler,
      },
    );

    this._endDatePicker = flatpickr(
      this.queryChildElement('[name="event-end-time"]'),
      {
        dateFormat: 'd/m/y H:i',
        defaultDate: this._data.endDate,
        minDate: this._data.startDate,
        enableTime:true,
        allowInput: true,
        'time_24hr': true,
        onChange: this._endDateChangeHandler,
      },
    );
  }

  _setInnerHandlers() {
    this.queryChildElements('.event__type-input').forEach((eventTypeInput) => eventTypeInput.addEventListener('change', this._eventTypeChangeHandler));
    this.queryChildElement('.event__input--destination').addEventListener('change', this._destinationChangeHandler);
    this.queryChildElement('.event__input--price').addEventListener('change', this._priceChangeHandler);
  }

  _eventTypeChangeHandler({target}) {
    this.updateData({ eventType: target.value });
  }

  _destinationChangeHandler({ target }) {
    const destination = destinations.find(({ name }) => name === target.value) || { name: '' };
    this.updateData({ destination });
  }

  _startDateChangeHandler([startDate]) {
    this.updateData({startDate: humanizeEventDate(startDate)});
  }

  _endDateChangeHandler([endDate]) {
    this.updateData({endDate: humanizeEventDate(endDate)});
  }

  _offersChangeHandler({ target }) {
    const { price, title } = target.dataset;
    if (target.checked) {
      this.updateData({ offers: [...this._data.offers, { id: target.name, price: +price, title }] });
    } else {
      this.updateData({ offers: [...this._data.offers.filter((offer) => offer.title !== title)] });
    }

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
