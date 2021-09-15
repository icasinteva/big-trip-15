import AbstractView from './abstract-view';

class SmartView extends AbstractView {
  constructor() {
    super();
    this._data = {};
  }

  restoreHandlers() {
    throw new Error('Abstract method not implemented: resetHandlers');
  }

  updateData(update, updateOnlyData = false) {
    if (!update) {
      return;
    }

    this._data = Object.assign({}, this._data, update);

    if (!updateOnlyData) {
      this.updateElement();
    }
  }

  updateElement() {
    const prevElement = this.getElement();
    const parent = prevElement.parentElement;
    this.removeElement();

    const newElement = this.getElement();

    parent.replaceChild(newElement, prevElement);

    this.restoreHandlers();
  }
}

export default SmartView;
