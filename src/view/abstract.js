import { createElement } from '../utils/render';

class AbstractView {
  constructor() {
    if (new.target === AbstractView) {
      throw new Error('Can\'t instantiate AbstractView, only concrete one.');
    }

    this._element = null;
    this._callback = {};
  }

  getTemplate() {
    throw new Error('AbstractView method not implemented: getTemplate');
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }

  queryChildElement(selector) {
    return this.getElement().querySelector(selector);
  }

  queryChildElements(selector) {
    return this.getElement().querySelectorAll(selector);
  }
}

export default AbstractView;
