import AbstractView from './abstract';
import { RenderPosition, Sorting } from '../enums';
import { sortEvents } from '../utils';
import { render, remove } from '../utils/render';
import BoardView from './board';
import TripInfoView from './trip-info';

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

class EventsSortView extends AbstractView {
  constructor(selectedSorting = Sorting.DAY) {
    super();
    this._selectedSorting = selectedSorting;
    this._sortEventListeners = this._sortEventListeners.bind(this);
  }

  getTemplate() {
    return createEventsSortTemplate(this._selectedSorting);
  }

  _sortEventListeners(filter, events) {
    return this._callback[filter](events);
  }

  setSortEventsListeners(events) {
    Object.entries(sortEvents).forEach(([sort, callback]) => {
      this._callback[sort] = callback;
      this.queryChildElement(`#sort-${sort}`).addEventListener('click', () => {
        const tripInfoComponent = document.querySelector('.trip-info');
        const boardComponent = document.querySelector('.trip-events');
        const sortedEvents = this._sortEventListeners(sort, events);

        remove(tripInfoComponent);
        remove(boardComponent);
        render(document.querySelector('.trip-main'), new TripInfoView(sortedEvents), RenderPosition.AFTERBEGIN);
        render(document.querySelector('.page-main .page-body__container'), new BoardView(sortedEvents, sort), RenderPosition.BEFOREEND);
      });
    });
  }
}
export default EventsSortView;
