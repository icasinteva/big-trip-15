import AbstractView from './abstract';
import EventOffersListView from './event-offers-list';
import { render, createElement, createPriceTemplate } from '../utils/render';
import { humanizeEventDate, humanizeEventStartDate } from '../utils/common';
import { getDuration } from '../utils/event';
import { RenderPosition } from '../enums';

const createEventTemplate = (event) => {
  const { eventType, destination, startDate, endDate, price, isFavorite } =
    event;
  const startTime = humanizeEventDate(startDate, 'HH:mm');
  const endTime = humanizeEventDate(endDate, 'HH:mm');
  const duration = getDuration(startDate, endDate);
  const favoriteClassName = isFavorite
    ? 'event__favorite-btn event__favorite-btn--active'
    : 'event__favorite-btn';
  const humanizedEventStartDate = humanizeEventStartDate(startDate);

  return `<div class="event">
                <time class="event__date" datetime=${startDate.format()}>${humanizedEventStartDate}</time>
                <div class="event__type">
                  <img class="event__type-icon" width="42" height="42" src="img/icons/${eventType}.png" alt="Event type icon">
                </div>
                <h3 class="event__title">${eventType} ${destination.name}</h3>
                <div class="event__schedule">
                  <p class="event__time">
                    <time class="event__start-time" datetime=${startDate.format()}>${startTime}</time>
                    —
                    <time class="event__end-time" datetime=${endDate.format()}>${endTime}</time>
                  </p>
                  <p class="event__duration">${duration}</p>
                </div>
                <p class="event__price">
                  ${createPriceTemplate('event__price', price)}
                </p>
                <h4 class="visually-hidden">Offers:</h4>
                <button class="${favoriteClassName}" type="button">
                  <span class="visually-hidden">Add to favorite</span>
                  <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
                    <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"></path>
                  </svg>
                </button>
                <button class="event__rollup-btn" type="button">
                  <span class="visually-hidden">Open event</span>
                </button>
              </div>`;
};

class EventView extends AbstractView {
  constructor(event) {
    super();
    this._event = event;
    this._editClickHandler = this._editClickHandler.bind(this);
    this._favoriteClickHandler = this._favoriteClickHandler.bind(this);
  }

  getTemplate() {
    return createEventTemplate(this._event);
  }

  getElement() {
    if (!this._element) {
      const { offers } = this._event;

      this._element = createElement(this.getTemplate());
      render(this._element.querySelector('button.event__favorite-btn'), new EventOffersListView(offers).getElement(), RenderPosition.BEFOREBEGIN);
    }

    return this._element;
  }

  _editClickHandler(evt) {
    evt.preventDefault();
    this._callback.editClick();
  }

  _favoriteClickHandler(evt) {
    evt.preventDefault();
    this._callback.favoriteClick();
  }

  setEditClickHanlder(callback) {
    this._callback.editClick = callback;
    this.queryChildElement('.event__rollup-btn').addEventListener('click', this._editClickHandler);
  }

  setFavoriteClickHandler(callback) {
    this._callback.favoriteClick = callback;
    this.queryChildElement('.event__favorite-btn').addEventListener('click', this._favoriteClickHandler);
  }
}
export default EventView;
