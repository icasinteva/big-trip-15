import AbstractView from './abstract';
import { Filter, FilterEventsTypeToMethod } from '../enums';

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
class EventsFiltersView extends AbstractView {
  constructor(selectedFilter = Filter.EVERYTHING) {
    super();
    this._selectedFilter = selectedFilter;
    this._filterEventListeners = this._filterEventListeners.bind(this);
  }

  getTemplate() {
    return createFiltersTemplate(this._selectedFilter);
  }

  _filterEventListeners(filter, events) {
    return this._callback[filter](events);
  }

  setFilterEventsListeners() {
    Object.entries(FilterEventsTypeToMethod).forEach(([filter, callback]) => {
      this._callback[filter] = callback;
      this.queryChildElement(`#filter-${filter}`).addEventListener('change', () => {});
    });
  }
}

export default EventsFiltersView;
