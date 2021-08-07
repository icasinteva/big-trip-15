import dayjs from 'dayjs';
import { Type, Destination } from '../enums';
import { createElement } from '../utils';

const createEventAddTemplate = () => {
  const type = Object.values(Type)[0];
  const typeItems = Object.values(Type).map((typeItem) => {
    const checked = typeItem ===  type ? 'checked' : '';
    return `<div class="event__type-item">
            <input id="event-type-${typeItem}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${typeItem}" ${checked}>
            <label class="event__type-label  event__type-label--${typeItem}" for="event-type-${typeItem}-1">${typeItem}</label>
          </div>`;
  }).join('');

  const startDate = dayjs();
  const endDate = dayjs();

  const destinations = Object.values(Destination).map(
    (dest) => `<option value=${dest}></option>`,
  );

  return `<form class="event event--edit" action="#" method="post">
            <header class="event__header">
              <div class="event__type-wrapper">
                <label class="event__type  event__type-btn" for="event-type-toggle-1">
                  <span class="visually-hidden">Choose event type</span>
                  <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
                </label>
                <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

                <div class="event__type-list">
                  <fieldset class="event__type-group">
                    <legend class="visually-hidden">Event type</legend>
                    ${typeItems}
                  </fieldset>
                </div>
              </div>

              <div class="event__field-group  event__field-group--destination">
                <label class="event__label  event__type-output" for="event-destination-1">
                  ${type}
                </label>
                <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="" list="destination-list-1">
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
                <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="">
              </div>

              <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
              <button class="event__reset-btn" type="reset">Cancel</button>
            </header>
          </form>`;
};

class EventAddView {
  constructor(event) {
    this._event = event;
    this._element = null;
  }

  getTemplate() {
    return createEventAddTemplate(this._event);
  }

  getElement() {
    if (!this._element) {
      this._element  = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
export default EventAddView;
