import EventFormView from '../view/event-add-edit';
import { RenderPosition, UserAction, UpdateType } from '../enums';
import {remove, render} from '../utils/render.js';
import EventsListItemView from '../view/events-list-item';

class EventForm {
  constructor(eventsListContainer, eventsModel, updateEvent, exitAddMode) {
    this._eventsListContainer = eventsListContainer;
    this._eventsModel = eventsModel;
    this._updateEvent = updateEvent;
    this._exitAddMode = exitAddMode;

    this._eventFormComponent = null;

    this._handleCancelClick = this._handleCancelClick.bind(this);
    this._handleSaveClick = this._handleSaveClick.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
  }

  init() {
    if (this._eventFormComponent !== null) {
      return;
    }

    this._eventFormListItemComponent = new EventsListItemView();
    this._eventFormComponent = new EventFormView(this._eventsModel);
    this._eventFormComponent.setSaveClickHandler(this._handleSaveClick);
    this._eventFormComponent.setCancelClickHandler(this._handleCancelClick);

    render(this._eventFormListItemComponent, this._eventFormComponent, RenderPosition.AFTERBEGIN);
    render(this._eventsListContainer, this._eventFormListItemComponent, RenderPosition.AFTERBEGIN);

    document.addEventListener('keydown', this._escKeyDownHandler);
  }

  destroy() {
    if (this._eventFormComponent === null) {
      return;
    }

    remove(this._eventFormComponent);
    remove(this._eventFormListItemComponent);

    this._exitAddMode();
    this._eventFormComponent = null;

    document.removeEventListener('keydown', this._escKeyDownHandler);
  }

  setSaving() {
    this._eventFormComponent.updateData({
      isDisabled: true,
      isSaving: true,
    });
  }

  setAborting() {
    const resetFormState = () => {
      this._eventFormComponent.updateData({
        isDisabled: false,
        isSaving: false,
        isDeleting: false,
      });
    };

    this._eventFormComponent.shake(resetFormState);
  }

  _handleSaveClick(event) {
    this._updateEvent(
      UserAction.ADD_EVENT,
      UpdateType.MAJOR,
      event,
    );
  }

  _handleCancelClick() {
    this.destroy();
  }

  _escKeyDownHandler(evt) {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.destroy();
    }
  }
}

export default EventForm;
