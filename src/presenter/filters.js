import EventsFiltersView from '../view/events-filters';
import { remove, render } from '../utils/render';
import { RenderPosition, UpdateType } from '../enums';

class Filters {
  constructor(filtersContainer, filtersModel) {
    this._disabled = false;
    this._filtersContainer = filtersContainer;
    this._filtersModel = filtersModel;

    this._filtersComponent = null;
    this._handleFilterTypeChange = this._handleFilterTypeChange.bind(this);
  }

  init() {
    this._filtersComponent = new EventsFiltersView(this._filtersModel.getFilter(), this._disabled);
    render(this._filtersContainer, this._filtersComponent, RenderPosition.BEFOREEND);

    this._filtersComponent.setFilterTypeChangeHandler(this._handleFilterTypeChange);
  }

  destroy() {
    remove(this._filtersComponent);
  }

  get disabled() {
    return this._disabled;
  }

  set disabled(value) {
    this._disabled = value;
    this.destroy();
    this.init();
  }

  _handleFilterTypeChange(filterType) {
    if (this._filtersModel.getFilter() === filterType) {
      return;
    }

    this._filtersModel.setFilter(UpdateType.MAJOR, filterType);
  }
}

export default Filters;
