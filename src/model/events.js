import AbstractObserver from '../utils/abstract-observer';
import { updateItem, addItem, deleteItem } from '../utils/common';

class EventsModel extends AbstractObserver {
  constructor() {
    super();
    this._events = [];
  }

  setEvents(events) {
    this._events = events.slice();
  }

  getEvents() {
    return this._events;
  }

  updateEvent(updateType, updatedEvent) {
    this._events = updateItem(this._events, updatedEvent);
    this._notify(updateType, updatedEvent);
  }

  addEvent(updateType, newEvent) {
    this._events = addItem(this._events, newEvent);
    this._notify(updateType, newEvent);
  }

  deleteEvent(updateType, deletedEvent) {
    this._events = deleteItem(this._events, deletedEvent);
    this._notify(updateType);
  }
}

export default EventsModel;
