import AbstractView from './abstract';
import { MenuItem } from '../enums';

const createSiteMenuTemplate = () =>
  `<div class="trip-controls__navigation">
    <h2 class="visually-hidden">Switch trip view</h2>
    <nav class="trip-controls__trip-tabs  trip-tabs">
      <a class="trip-tabs__btn  trip-tabs__btn--active" href="#" data-value="${MenuItem.TABLE}">${MenuItem.TABLE}</a>
      <a class="trip-tabs__btn" href="#" data-value="${MenuItem.STATS}">${MenuItem.STATS}</a>
    </nav>
  </div>`;

class SiteMenuView extends AbstractView {
  constructor() {
    super();

    this._menuClickHandler = this._menuClickHandler.bind(this);
  }

  getTemplate() {
    return createSiteMenuTemplate();
  }

  _menuClickHandler(evt) {
    evt.preventDefault();
    this._callback.menuClick(evt.target.dataset.value);
  }

  setMenuClickHandler(callback) {
    this._callback.menuClick = callback;
    this.queryChildElements('.trip-tabs__btn').forEach((menuItem) => menuItem.addEventListener('click', this._menuClickHandler));
  }

  setMenuItem(menuItem) {
    const item = this.queryChildElement(`[data-value=${menuItem}]`);


    if (item !== null) {
      this.queryChildElements('.trip-tabs__btn').forEach((menuLink) => menuLink.classList.remove('trip-tabs__btn--active'));
      item.classList.add('trip-tabs__btn--active');
    }
  }
}

export default SiteMenuView;
