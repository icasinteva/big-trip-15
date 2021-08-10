import AbstractView from './abstract';
import { RenderPosition, Filter } from '../enums';
import { filterEvents } from '../utils';
import { render, remove } from '../utils/render';
import BoardView from './board';
import TripInfoView from './trip-info';

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

  setFilterEventsListeners(events) {
    Object.entries(filterEvents).forEach(([filter, callback]) => {
      this._callback[filter] = callback;
      this.queryChildElement(`#filter-${filter}`).addEventListener('change', () => {
        const tripInfoComponent = document.querySelector('.trip-info');
        const boardComponent = document.querySelector('.trip-events');
        const sort = boardComponent.querySelector('.trip-sort__input:checked').value.replace('sort-', '');
        const filteredEvents = this._filterEventListeners(filter, events);

        remove(tripInfoComponent);
        remove(boardComponent);
        render(document.querySelector('.trip-main'), new TripInfoView(filteredEvents), RenderPosition.AFTERBEGIN);
        render(document.querySelector('.page-main .page-body__container'), new BoardView(filteredEvents, sort), RenderPosition.BEFOREEND);
      });
    });
  }

  [Filter.EVERYTHING](events) {
    return filterEvents[Filter.EVERYTHING](events);
  }

  [Filter.FUTURE](events) {
    return filterEvents[Filter.FUTURE](events);
  }

  [Filter.PAST](events) {
    return filterEvents[Filter.PAST](events);
  }

}

export default EventsFiltersView;
