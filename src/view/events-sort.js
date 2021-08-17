import AbstractView from './abstract';
import { Sorting } from '../enums';

const createEventsSortTemplate = (selected = Sorting.DAY) => {
  const sort = {
    [Sorting.DAY]: {
      disabled: false,
    },
    [Sorting.EVENT]: {
      disabled: true,
    },
    [Sorting.TIME]: {
      disabled: false,
    },
    [Sorting.PRICE]: {
      disabled: false,
    },
    [Sorting.OFFERS]: {
      disabled: true,
    },
  };

  if (sort[selected].disabled) {
    selected = Sorting.DAY;
  } else {
    sort[selected].checked = true;
  }

  const sortingItems = Object.entries(sort)
    .map(
      ([key, value]) => {
        const checked = value.checked ? 'checked' : '';
        const disabled = value.disabled ? 'disabled' : '';

        return `<div class="trip-sort__item  trip-sort__item--${key}">
                  <input id="sort-${key}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" data-sort-type=${key} value="sort-${key}" ${checked} ${disabled}>
                  <label class="trip-sort__btn" for="sort-${key}">${key}</label>
                </div>`;
      })
    .join('');

  return `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">${sortingItems}</form>`;
};

class EventsSortView extends AbstractView {
  constructor(selectedSortType = Sorting.DAY) {
    super();
    this._selectedSortType = selectedSortType;
    this._sortTypeChangeHandler = this._sortTypeChangeHandler.bind(this);
  }

  get selectedSortType() {
    return this._selectedSortType;
  }

  set selectedSortType(sortType) {
    this._selectedSortType = sortType;
  }

  getTemplate() {
    return createEventsSortTemplate(this._selectedSortType);
  }

  _sortTypeChangeHandler(evt) {
    const { target } = evt;
    const {tagName, dataset} = target;

    if (tagName !== 'INPUT') {
      return;
    }

    evt.preventDefault();
    this._callback.sortTypeChange(dataset.sortType);
  }

  setSortTypeChangeHandler(callback) {
    this._callback.sortTypeChange = callback;
    this.getElement().addEventListener('click', this._sortTypeChangeHandler);
  }
}
export default EventsSortView;
