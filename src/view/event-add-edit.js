import { nanoid } from 'nanoid';
import { BLANK_EVENT } from '../const';
import { RenderPosition } from '../enums';
import { createElement, render } from '../utils/render';
import { createFormTemplate } from '../utils/add-edit-form';
import Smart from './smart';
import EventDetailsView from './event-details-section';
import flatpickr from 'flatpickr';
import Api from '../api/api';
import { END_POINT, AUTHORIZATION } from '../const';

import '../../node_modules/flatpickr/dist/flatpickr.min.css';
import { humanizeEventDate, transformDateToUsFormat } from '../utils/common';

class EventFormView extends Smart {
  constructor(eventsModel, event = BLANK_EVENT) {
    super();
    this._eventsModel = eventsModel;
    this._data = EventFormView.parseEventToData(event);
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
    this._exitEditModeListener = this._exitEditModeListener.bind(this);
    this._deleteClickHandler = this._deleteClickHandler.bind(this);
    this._api = new Api(END_POINT, AUTHORIZATION);

    this._setInnerHandlers();
    this._setDatepickers();
  }

  static parseEventToData(event) {
    return Object.assign(
      {},
      event,
      {
        isDisabled: false,
        isSaving: false,
        isDeleting: false,
      },
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

    delete data.isDisabled;
    delete data.isSaving;
    delete data.isDeleting;

    return Object.assign(
      {},
      { id: nanoid() },
      data,
      { startDate, endDate },
    );
  }

  getTemplate() {
    return createFormTemplate(this._eventsModel.destinations, this._data);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());

      render(this._element, new EventDetailsView(this._data, this._eventsModel.offers, this._offersChangeHandler).getElement(), RenderPosition.BEFOREEND);
    }

    return this._element;
  }

  removeElement() {
    super.removeElement();

    if (this._startDatepicker) {
      this._startDatepicker.destroy();
      this._startDatepicker = null;
    }

    if (this._endDatepicker) {
      this._endDatepicker.destroy();
      this._endDatepicker = null;
    }
  }

  restoreHandlers() {
    this._setInnerHandlers();
    this._setDatepickers();

    if (this._callback.exitEditMode && this.setExitEditModeListener) {
      this.setExitEditModeListener(this._callback.exitEditMode);
    }

    if (this._callback.deleteClick && this.setDeleteClickHandler) {
      this.setDeleteClickHandler(this._callback.deleteClick);
    }

    if (this._callback.cancelClick && this.setCancelClickHandler) {
      this.setCancelClickHandler(this._callback.cancelClick);
    }

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
        defaultDate: new Date(this._data.startDate),
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
        defaultDate: new Date(this._data.endDate),
        minDate: new Date(this._data.startDate),
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

  _eventTypeChangeHandler({ target }) {
    this.updateData({ eventType: target.value });
  }

  _destinationChangeHandler({ target }) {
    const destination = this._eventsModel.destinations.find(({ name }) => name === target.value) || { name: '' };
    this.updateData({ destination });
  }

  _startDateChangeHandler([startDate]) {
    this.updateData({startDate: humanizeEventDate(startDate)}, true);
  }

  _endDateChangeHandler([endDate]) {
    this.updateData({endDate: humanizeEventDate(endDate)}, true);
  }

  _offersChangeHandler({ target }) {
    const { price, title } = target.dataset;
    const availableEventTypeOffers = this._eventsModel.offers.find((of) => of.type === this._data.eventType).offers;
    const eventTypeOffers = availableEventTypeOffers.filter((offer) => this._data.offers.find((of) => of.title === offer.title ));
    let updatedOffers;

    if (target.checked) {
      updatedOffers = [...eventTypeOffers, { id: target.name, price: +price, title }];
    } else {
      updatedOffers = [...eventTypeOffers.filter((offer) => offer.title !== title)];
    }

    this.updateData({ offers: updatedOffers }, true);
  }

  _priceChangeHandler({ target }) {
    this.updateData({ price: +target.value });
  }

  _cancelClickHandler(evt) {
    evt.preventDefault();
    this._callback.cancelClick();
  }

  _exitEditModeListener(evt) {
    evt.preventDefault();
    this._callback.exitEditMode();
  }

  _deleteClickHandler(evt) {
    evt.preventDefault();
    this._callback.deleteClick(EventFormView.parseDataToEvent(this._data));
  }

  setExitEditModeListener(callback) {
    this._callback.exitEditMode = callback;
    this.getElement().querySelector('.event__rollup-btn').addEventListener('click', this._exitEditModeListener);
  }

  setDeleteClickHandler(callback) {
    this._callback.deleteClick = callback;
    this.queryChildElement('[data-title^="delet"]').addEventListener('click', this._deleteClickHandler);
  }

  _saveClickHandler(evt) {
    evt.preventDefault();
    this._callback.saveClick(EventFormView.parseDataToEvent(this._data));
  }

  setCancelClickHandler(callback) {
    this._callback.cancelClick = callback;
    this.queryChildElement('[data-title="cancel"]').addEventListener('click', this._cancelClickHandler);
  }

  setSaveClickHandler(callback) {
    this._callback.saveClick = callback;
    this.getElement().addEventListener('submit', this._saveClickHandler);
  }
}
export default EventFormView;
