import { EventType } from '../enums';
import { humanizeEventDate } from './common';

const createFormTemplate = (destinations, data) => {
  const { eventType, destination = {name: ''}, price, id, isDisabled, isSaving, isDeleting } = data;
  const startDate = humanizeEventDate(data.startDate);
  const endDate = humanizeEventDate(data.endDate);
  const isSaveDisabled = !price || !destination.name;
  const disabled = isDisabled ? 'disabled' : '';
  const saveDisabled = isSaveDisabled ? 'disabled' : '';

  const modeClassName = !id ? 'event--add' : 'event--edit';
  const deleteBtnTitle = isDeleting ? 'Deleting...' : 'Delete';
  const resetButtonTitle = !id ? 'Cancel' : deleteBtnTitle;
  const saveButtonTitle = isSaving ? 'Saving...' : 'Save';
  const eventTypeItems = Object.values(EventType).map((eventTypeItem) => {
    const checked = eventTypeItem === eventType ? 'checked' : '';

    return `<div class="event__type-item">
              <input id="event-type-${eventTypeItem}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${eventTypeItem}" ${checked}>
              <label class="event__type-label  event__type-label--${eventTypeItem}" for="event-type-${eventTypeItem}-1">${eventTypeItem}</label>
            </div>`;
  }).join('');

  const availableDestinations = (Object.values(destinations || [])).map(
    ({ name }) => `<option value=${name}></option>`,
  );

  return `<form class="event ${modeClassName}" action="#" method="post">
              <header class="event__header">
                <div class="event__type-wrapper">
                  <label class="event__type  event__type-btn" for="event-type-toggle-1">
                    <span class="visually-hidden">Choose event type</span>
                    <img class="event__type-icon" width="17" height="17" src="img/icons/${eventType}.png" alt="Event type icon">
                  </label>
                  <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox" ${disabled}>
  
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
                  <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${destination.name}" list="destination-list-1" ${disabled}>
                  <datalist id="destination-list-1">
                    ${availableDestinations}
                  </datalist>
                </div>
  
                <div class="event__field-group  event__field-group--time">
                  <label class="visually-hidden" for="event-start-time-1">From</label>
                  <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${startDate}" ${disabled}>
                  —
                  <label class="visually-hidden" for="event-end-time-1">To</label>
                  <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${endDate}" ${disabled}>
                </div>
  
                <div class="event__field-group  event__field-group--price">
                  <label class="event__label" for="event-price-1">
                    <span class="visually-hidden">Price</span>
                    €
                  </label>
                  <input class="event__input  event__input--price" id="event-price-1" type="number" name="event-price" value=${price} ${disabled}>
                </div>
  
                <button class="event__save-btn  btn  btn--blue" type="submit" ${saveDisabled || disabled}>${saveButtonTitle}</button>
                <button class="event__reset-btn" type="reset" data-title="${resetButtonTitle.toLocaleLowerCase()}" ${disabled}>${resetButtonTitle}</button>
                <button class="event__rollup-btn" type="button">
                  <span class="visually-hidden">Open event</span>
                </button>
              </header>
            </form>`;
};

export { createFormTemplate };
