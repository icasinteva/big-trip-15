import { createElement } from '../utils';
import { Sorting } from '../enums';

const createEventsSortTemplate = (selected = Sorting.DAY) => {
  const sort = {
    [Sorting.DAY]: {
      disabled: false,
      checked: true,
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
              <input id="sort-${key}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-${key}" ${checked} ${disabled}>
              <label class="trip-sort__btn" for="sort-${key}">${key}</label>
            </div>`;
      })
    .join('');

  return `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
            ${sortingItems}
          </form>`;
};

class EventsSortView {
  constructor(selectedSorting) {
    this._selectedSorting = selectedSorting;
  }

  getTemplate() {
    return createEventsSortTemplate(this._selectedSorting);
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
}
export default EventsSortView;
