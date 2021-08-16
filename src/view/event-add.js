import { nanoid } from 'nanoid';
import { BLANK_EVENT } from '../const';
import AbstractView from './abstract';
import { EventType, Destination } from '../enums';
import { remove } from '../utils/render';

const createEventAddTemplate = (event) => {
  const { eventType, destination, startDate, endDate, price } =
    event;
  const modeClass = destination ? 'event--edit' : 'event--add';
  const resetBtnTitle = destination ? 'Delete' : 'Cancel';
  const eventTypeItems = Object.values(EventType).map((eventTypeItem) => {
    const checked = eventTypeItem === eventType ? 'checked' : '';

    return `<div class="event__type-item">
            <input id="event-type-${eventTypeItem}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${eventTypeItem}" ${checked}>
            <label class="event__type-label  event__type-label--${eventTypeItem}" for="event-type-${eventTypeItem}-1">${eventTypeItem}</label>
          </div>`;
  }).join('');

  const destinations = Object.values(Destination).map(
    (dest) => `<option value=${dest}></option>`,
  );

  return `<form class="event ${modeClass}" action="#" method="post">
            <header class="event__header">
              <div class="event__type-wrapper">
                <label class="event__type  event__type-btn" for="event-type-toggle-1">
                  <span class="visually-hidden">Choose event type</span>
                  <img class="event__type-icon" width="17" height="17" src="img/icons/${eventType}.png" alt="Event type icon">
                </label>
                <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

                <div class="event__type-list">
                  <fieldset class="event__type-group">
                    <legend class="visually-hidden">Event type</legend>
                    ${eventTypeItems}
                  </fieldset>
                </div>
              </div>

              <div class="event__field-group  event__field-group--destination">
                <label class="event__label  event__type-output" for="event-destination-1">
                  ${eventType}
                </label>
                <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${destination}" list="destination-list-1">
                <datalist id="destination-list-1">
                  ${destinations}
                </datalist>
              </div>

              <div class="event__field-group  event__field-group--time">
                <label class="visually-hidden" for="event-start-time-1">From</label>
                <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${startDate.format('DD/MM/YY HH:MM')}">
                —
                <label class="visually-hidden" for="event-end-time-1">To</label>
                <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${endDate.format('DD/MM/YY HH:MM')}">
              </div>

              <div class="event__field-group  event__field-group--price">
                <label class="event__label" for="event-price-1">
                  <span class="visually-hidden">Price</span>
                  €
                </label>
                <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value=${price}>
              </div>

              <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
              <button class="event__reset-btn" type="reset">${resetBtnTitle}</button>
              <button class="event__rollup-btn" type="button">
                <span class="visually-hidden">Open event</span>
              </button>
            </header>
          </form>`;
};
class EventAddView extends AbstractView {
  constructor(event = BLANK_EVENT) {
    super();
    this._event = event;
    this._changeEventTypeListener = this._changeEventTypeListener.bind(this);
    this._changeDestinationListener = this._changeDestinationListener.bind(this);
    this._cancelClickHandler = this._cancelClickHandler.bind(this);
    this._saveClickHandler = this._saveClickHandler.bind(this);
  }

  getTemplate() {
    return createEventAddTemplate(this._event);
  }

  get eventType() {
    if (!this._evenType) {
      this._eventType = this.queryChildElement('.event__type-input:checked').value || '';
    }

    return this._eventType;
  }

  get destination() {
    if (!this._destination) {
      this._destination = this.queryChildElement('.event__input--destination').value || '';
    }

    return this._destination;
  }

  get price() {
    if (!this._price) {
      this._price = this.queryChildElement('.event__input--price').value || '';
    }

    return this._price;
  }

  get eventData() {
    return {
      price: +this.price,
      startDate: this._event.startDate,
      endDate: this._event.endDate,
      destination: this.destination,
      id: this._event.id || nanoid(),
      isFavorite: this._event.isFavorite,
      offers: this._event.offers || [],
      eventType: this.eventType,
    };
  }

  _changeEventTypeListener(evt) {
    this._callback.changeEventType(evt);
  }

  _changeDestinationListener(evt) {
    this._callback.changeDestination(evt);
  }

  _cancelClickHandler(evt) {
    evt.preventDefault();
    this._callback.cancel();
  }

  _saveClickHandler(evt) {
    evt.preventDefault();
    this._callback.saveClick(this.eventData);
  }

  setChangeEventTypeListener(callback) {
    this._callback.changeEventType = callback;
    this.queryChildElements('.event__type-input').forEach((eventTypeInput) => eventTypeInput.addEventListener('change', this._changeEventTypeListener));
  }

  setChangeDestinationListener(callback) {
    this._callback.changeDestination = callback;
    this.queryChildElement('.event__input--destination').addEventListener('change', this._changeDestinationListener);
  }

  setCancelClickHandler(callback) {
    this._callback.cancel = callback;
    this.queryChildElement('.event__reset-btn').addEventListener('click', this._cancelClickHandler);
  }

  setSaveClickHandler(callback) {
    this._callback.saveClick = callback;
    this.getElement().addEventListener('submit', this._saveClickHandler);
  }

  changeEventType(value) {
    const eventTypeIconElement = this.queryChildElement('.event__type-icon');

    eventTypeIconElement.src = eventTypeIconElement.getAttribute('src').replace(/(img\/icons\/)[a-z]+(-[a-z]+){0,}/, `$1${value}`);
    this.queryChildElement('.event__type-output').textContent = value;
    this.queryChildElement('.event__type-toggle').checked = false;
  }

  removeForm() {
    remove(this);
  }
}
export default EventAddView;
