import EventsListItemView from '../view/events-list-item';
import EventView from '../view/event';
import EventEditView from '../view/event-edit';
import { RenderPosition } from '../enums';
import { render, replace, remove } from '../utils/render.js';
import { onEscKeyDown } from '../utils/common';

const Mode = {
  DEFAULT: 'DEFAULT',
  EDIT: 'EDIT',
};

class Event {
  constructor(eventsListContainer, {updateEvent, deleteEvent, changeMode}) {
    this._eventsListContainer = eventsListContainer;
    this._updateEvent = updateEvent;
    this._deleteEvent = deleteEvent;
    this._changeMode = changeMode;

    this._eventListItemComponent = null;
    this._eventComponent = null;
    this._eventEditComponent = null;
    this._mode = Mode.DEFAULT;

    this._handleFavoriteClick = this._handleFavoriteClick.bind(this);
    this._handleEditClick = this._handleEditClick.bind(this);
    this._handleExitEditModeClick = this._handleExitEditModeClick.bind(this);
    this._handleSaveClick = this._handleSaveClick.bind(this);
    this._handleDeleteClick = this._handleDeleteClick.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
  }

  init(event) {
    this._event = event;

    const prevEventComponent = this._eventComponent;
    const prevEventEditComponent = this._eventEditComponent;

    this._eventListItemComponent = new EventsListItemView();
    this._eventComponent = new EventView(this._event);
    this._eventEditComponent = new EventEditView(this._event);

    this._eventComponent.setFavoriteClickHandler(this._handleFavoriteClick);
    this._eventComponent.setEditClickHanlder(this._handleEditClick);
    this._eventEditComponent.setExitEditModeListener(this._handleExitEditModeClick);
    this._eventEditComponent.setSaveClickHandler(this._handleSaveClick);
    this._eventEditComponent.setDeleteClickHandler(this._handleDeleteClick);

    render(this._eventListItemComponent, this._eventComponent, RenderPosition.AFTERBEGIN);

    if (!prevEventComponent || !prevEventEditComponent) {
      render(this._eventsListContainer, this._eventListItemComponent, RenderPosition.BEFOREEND);
      return;
    }

    if (this._mode === Mode.DEFAULT) {
      replace(this._eventListItemComponent, prevEventComponent);
    }

    if (this._mode === Mode.EDIT) {
      replace(this._eventEditComponent, prevEventEditComponent);
    }

    remove(prevEventComponent);
    remove(prevEventEditComponent);
  }

  destroy() {
    remove(this._eventListItemComponent);
    remove(this._eventEditComponent);
  }

  resetView() {
    if (this._mode !== Mode.DEFAULT) {
      this._replaceFormToEvent();
    }
  }

  _handleFavoriteClick() {
    this._updateEvent({...this._event, isFavorite: !this._event.isFavorite});
  }

  _handleEditClick() {
    this._replaceEventToForm();
    document.addEventListener('keydown', this._escKeyDownHandler);
  }

  _handleExitEditModeClick() {
    this._replaceFormToEvent();
    document.removeEventListener('keydown', this._escKeyDownHandler);
  }

  _handleSaveClick(event) {
    this._updateEvent(event);
    this._handleExitEditModeClick();
  }

  _handleDeleteClick(event) {
    this._deleteEvent(event);
    this._handleExitEditModeClick();
  }

  _escKeyDownHandler(ev) {
    onEscKeyDown(ev, this._replaceFormToEvent.bind(this));
  }

  _replaceEventToForm() {
    this._changeMode();
    replace(this._eventEditComponent, this._eventComponent);
    this._mode = Mode.EDIT;

  }

  _replaceFormToEvent() {
    this._mode = Mode.DEFAULT;
    replace(this._eventComponent, this._eventEditComponent);
  }
}

export default Event;
