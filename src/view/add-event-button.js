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
    this._enterAddModeListener = this._enterAddModeListener.bind(this);
  }

  getTemplate() {
    return createAddEventButtonTemplate();
  }

  _enterAddModeListener(evt) {
    evt.preventDefault();
    this._callback.enterAddMode();
  }

  setEnterAddModeListener(callback) {
    this._callback.enterAddMode = callback;
    this.getElement().addEventListener('click', this._enterAddModeListener);
  }

  toggleDisabled() {
    this.getElement().disabled = !this.getElement().disabled;
  }
}

export default AddEventButtonView;
