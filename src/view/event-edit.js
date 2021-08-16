import EventAddView from './event-add';
import { RenderPosition } from '../enums';
import { createElement, render} from '../utils/render';
import EventDetailsView from './event-details-section';

class EventEditView extends EventAddView {
  constructor(event) {
    super(event);
    this._exitEditModeListener = this._exitEditModeListener.bind(this);
    this._deleteClickHandler = this._deleteClickHandler.bind(this);
  }

  getElement() {
    if (!this._element) {
      this._element  = createElement(super.getTemplate());

      render(this._element, new EventDetailsView(this._event).getElement(), RenderPosition.BEFOREEND);
    }

    return this._element;
  }

  _exitEditModeListener(evt) {
    evt.preventDefault();
    this._callback.exitEditMode();
  }

  _deleteClickHandler(evt) {
    evt.preventDefault();
    this._callback.deleteClick(this._event);
  }

  setExitEditModeListener(callback) {
    this._callback.exitEditMode = callback;
    this.getElement().querySelector('.event__rollup-btn').addEventListener('click', this._exitEditModeListener);
  }

  setDeleteClickHandler(callback) {
    this._callback.deleteClick = callback;
    this.queryChildElement('.event__reset-btn').addEventListener('click', this._deleteClickHandler);
  }
}
export default EventEditView;
