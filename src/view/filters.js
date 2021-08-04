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
      ([key, value]) => `<div class="trip-filters__filter">
                  <input id="filter-everything" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value=${value} ${
        value.checked ? 'checked' : ''
      }>
                  <label class="trip-filters__filter-label" for="filter-${key}">${key}</label>
                </div>`,
    )
    .join('');
  return `
              <form class="trip-filters" action="#" method="get">
                ${filterItems}

                <button class="visually-hidden" type="submit">Accept filter</button>
              </form>`;
};

export { createFiltersTemplate };
