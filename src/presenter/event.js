import EventsListItemView from '../view/events-list-item';
import EventView from '../view/event';
import EventFormView from '../view/event-add-edit';
import { RenderPosition, UserAction, UpdateType } from '../enums';
import { render, replace, remove } from '../utils/render.js';
import { onEscKeyDown, isOnline } from '../utils/common';
import { toast } from '../utils/toast';

const Mode = {
  DEFAULT: 'DEFAULT',
  EDIT: 'EDIT',
};

const State = {
  SAVING: 'SAVING',
  DELETING: 'DELETING',
  ABORTING: 'ABORTING',
};

class EventPresenter {
  constructor(eventsListContainer, eventsModel, {updateEvent, changeMode}) {
    this._eventsListContainer = eventsListContainer;
    this._eventsModel = eventsModel;
    this._updateEvent = updateEvent;
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
    this._eventEditComponent = new EventFormView(this._eventsModel, this._event);

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
      replace(this._eventComponent, prevEventEditComponent);
      this._mode = Mode.DEFAULT;
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

  setViewState(state) {
    if (this._mode === Mode.DEFAULT) {
      return;
    }

    const resetFormState = () => {
      this._eventEditComponent.updateData({
        isDisabled: false,
        isSaving: false,
        isDeleting: false,
      });
    };

    switch (state) {
      case State.SAVING: {
        this._eventEditComponent.updateData({
          isDisabled: true,
          isSaving: true,
        });
        break;
      }
      case State.DELETING: {
        this._eventEditComponent.updateData({
          isDisabled: true,
          isDeleting: true,
        });
        break;
      }
      case State.ABORTING: {
        this._eventComponent.shake(resetFormState);
        this._eventEditComponent.shake(resetFormState);
        break;
      }
    }
  }

  _handleFavoriteClick() {
    this._updateEvent(
      UserAction.UPDATE_EVENT,
      UpdateType.MINOR,
      Object.assign({}, this._event, { isFavorite: !this._event.isFavorite }));
  }


  _handleEditClick() {
    if (!isOnline()) {
      toast('You can\'t edit event offline');
      return;
    }
    this._replaceEventToForm();
    document.addEventListener('keydown', this._escKeyDownHandler);
  }

  _handleExitEditModeClick() {
    this._replaceFormToEvent();
    document.removeEventListener('keydown', this._escKeyDownHandler);
  }

  _handleSaveClick(event) {
    if (!isOnline()) {
      toast('You can\'t save event offline');
      return;
    }
    this._updateEvent(
      UserAction.UPDATE_EVENT,
      UpdateType.MAJOR,
      event,
    );
  }

  _handleDeleteClick(event) {
    if (!isOnline()) {
      toast('You can\'t delete event offline');
      return;
    }
    this._updateEvent(
      UserAction.DELETE_EVENT,
      UpdateType.MAJOR,
      event,
    );
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

export { State };
export default EventPresenter;
