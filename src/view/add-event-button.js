import AbstractView from './abstract';

const createAddEventButtonTemplate = () => `<button
    class="trip-main__event-add-btn btn btn--big btn--yellow"
    type="button"
  >
    New event
  </button>`;

class AddEventButtonView extends AbstractView {
  constructor() {
    super();
    this._enterAddModeHandler = this._enterAddModeHandler.bind(this);
  }

  getTemplate() {
    return createAddEventButtonTemplate();
  }

  _enterAddModeHandler(evt) {
    evt.preventDefault();
    this._callback.enterAddMode();
  }

  setEnterAddModeHandler(callback) {
    this._callback.enterAddMode = callback;
    this.getElement().addEventListener('click', this._enterAddModeHandler);
  }

  setDisabled(disabled) {
    this.getElement().disabled = disabled;
  }
}

export default AddEventButtonView;
