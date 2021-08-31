import EventsFiltersView from '../view/events-filters';
import { remove, render, replace } from '../utils/render';
import { RenderPosition, UpdateType } from '../enums';

class Filters {
  constructor(filtersContainer, filtersModel) {
    this._filtersContainer = filtersContainer;
    this._filtersModel = filtersModel;

    this._filtersComponent = null;
    this._handleFilterTypeChange = this._handleFilterTypeChange.bind(this);
  }

  init() {
    const prevFiltersComponent = this._filtersComponent;

    if (!prevFiltersComponent) {
      this._eventsFiltersComponent = new EventsFiltersView(this._filterType);
      render(this._filtersContainer, this._eventsFiltersComponent, RenderPosition.BEFOREEND);

      this._eventsFiltersComponent.setFilterTypeChangeHandler(this._handleFilterTypeChange);
      return;
    }

    replace(this._filtersComponent, prevFiltersComponent);
    remove(prevFiltersComponent);
  }

  _handleFilterTypeChange(filterType) {
    if (this._filtersModel.getFilter() === filterType) {
      return;
    }

    this._filtersModel.setFilter(UpdateType.MAJOR, filterType);
  }
}

export default Filters;
