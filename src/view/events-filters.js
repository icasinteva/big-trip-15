import AbstractView from './abstract';
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
                  <input id="filter-${key}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" data-filter-type=${key} value=${key} ${checked}>
                  <label class="trip-filters__filter-label" for="filter-${key}">${key}</label>
                </div>`;
      },
    )
    .join('');

  return `<div class="trip-controls__filters">
            <h2 class="visually-hidden">Filter events</h2>
            <form class="trip-filters" action="#" method="get">
              ${filterItems}
              <button class="visually-hidden" type="submit">Accept filter</button>
            </form>
          </div>`;
};
class EventsFiltersView extends AbstractView {
  constructor(selectedFilter = Filter.EVERYTHING) {
    super();
    this._selectedFilter = selectedFilter;
    this._filterTypeChangeHandler = this._filterTypeChangeHandler.bind(this);
  }

  get selectedFilterType() {
    return this._selectedFilterType;
  }

  set selectedFilterType(filterType) {
    this._selectedFilterType = filterType;
  }

  getTemplate() {
    return createFiltersTemplate(this._selectedFilter);
  }

  _filterTypeChangeHandler(evt) {
    const { target } = evt;
    const { tagName, dataset } = target;

    if (tagName !== 'INPUT') {
      return;
    }

    evt.preventDefault();
    this._callback.filterTypeChange(dataset.filterType);
  }

  setFilterTypeChangeHandler(callback) {
    this._callback.filterTypeChange = callback;
    this.getElement().addEventListener('change', this._filterTypeChangeHandler);
  }
}

export default EventsFiltersView;
