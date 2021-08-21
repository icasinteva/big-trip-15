import AddEventFormView from './event-add';
import { createFormTemplate } from '../utils/add-edit-form';


class EventEditView extends AddEventFormView {
  constructor(event) {
    super({isAddMode: false, ...event});
    this._exitEditModeListener = this._exitEditModeListener.bind(this);
    this._deleteClickHandler = this._deleteClickHandler.bind(this);
  }

  getTemplate() {
    return createFormTemplate(this._data);
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
