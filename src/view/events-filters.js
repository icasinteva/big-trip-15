import { createElement } from '../utils';
import { Filter } from '../enums';

const createFiltersTemplate = (selectedFilter = Filter.EVERYTHING) => {
  const filters = {
    [Filter.EVERYTHING]: {
      checked: true,
    },
    [Filter.FUTURE]: {
      checked: false,
    },
    [Filter.PAST]: {
      checked: false,
    },
  };

  filters[selectedFilter].checked = true;

  const filterItems = Object.entries(filters)
    .map(
      ([key, value]) => {
        const checked = value.checked ? 'checked' : '';

        return `<div class="trip-filters__filter">
        <input id="filter-${key}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value=${key} ${checked}>
        <label class="trip-filters__filter-label" for="filter-${key}">${key}</label>
      </div>`;
      },
    )
    .join('');

  return `<form class="trip-filters" action="#" method="get">
                ${filterItems}
                <button class="visually-hidden" type="submit">Accept filter</button>
              </form>`;
};

class EventsFiltersView {
  constructor(selectedFilter) {
    this._selectedFilter = selectedFilter;
  }

  getTemplate() {
    return createFiltersTemplate(this._selectedFilter);
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

export default EventsFiltersView;
