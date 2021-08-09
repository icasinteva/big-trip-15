import { RenderPosition, EventType, Destination } from '../enums';
import { renderNestedElement, createElement } from '../utils';
import EventDetailsView from './event-details-section';

const createEventEditTemplate = (event) => {
  const { eventType, destination, startDate, endDate, price } =
  event;

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

  return `<form class="event event--edit" action="#" method="post">
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
                <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value=${destination} list="destination-list-1">
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
              <button class="event__reset-btn" type="reset">Delete</button>
              <button class="event__rollup-btn" type="button">
                <span class="visually-hidden">Open event</span>
              </button>
            </header>
          </form>`;
};

class EventEditView {
  constructor(event) {
    this._event = event;
    this._element = null;
  }

  getTemplate() {
    return createEventEditTemplate(this._event);
  }

  getElement() {
    if (!this._element) {
      this._element  = createElement(this.getTemplate());

      renderNestedElement(this._element, new EventDetailsView(this._event).getElement(), RenderPosition.BEFOREEND);

      this._element.querySelectorAll('.event__type-input').forEach((eventTypeInput) => eventTypeInput.addEventListener('click', (evt) => {
        this._element.querySelector('.event__type-output').textContent = evt.target.value;
        this._element.querySelector('.event__type-icon').src = this._element.querySelector('.event__type-icon').getAttribute('src').replace(/(img\/icons\/)[a-z]+(-[a-z]+){0,}/, `$1${evt.target.value}`);
        this._element.querySelector('.event__type-toggle').checked = false;
      }));
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
export default EventEditView;
