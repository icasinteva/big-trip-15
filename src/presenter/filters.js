import EventsFiltersView from '../view/events-filters';
import { remove, render } from '../utils/render';
import { RenderPosition, UpdateType, Filter } from '../enums';
import { filterTypeToCallBack } from '../utils/filters';

class Filters {
  constructor(filtersContainer, filtersModel, eventsModel) {
    this._disabled = false;
    this._filtersContainer = filtersContainer;
    this._filtersModel = filtersModel;
    this._eventsModel = eventsModel;

    this._filtersComponent = null;
    this._handleFilterTypeChange = this._handleFilterTypeChange.bind(this);
  }

  init() {
    this._getDisabledFilters();

    this._filtersComponent = new EventsFiltersView(this._filtersModel.getFilter(), this._disabled);
    render(this._filtersContainer, this._filtersComponent, RenderPosition.BEFOREEND);

    this._filtersComponent.setFilterTypeChangeHandler(this._handleFilterTypeChange);
  }

  _getDisabledFilters() {
    const disabledFilters = [];
    const events = this._eventsModel.getEvents().slice();
    const futureEvents = filterTypeToCallBack[Filter.FUTURE](events);
    const pastEvents = filterTypeToCallBack[Filter.PAST](events);

    if (!events.length) {
      this._disabled = true;
      return;
    }

    if (!futureEvents.length) {
      disabledFilters.push(Filter.FUTURE);
    }

    if (!pastEvents.length) {
      disabledFilters.push(Filter.PAST);
    }

    this._disabled = disabledFilters;
  }

  destroy() {
    if (this._filtersComponent === null) {
      return;
    }

    remove(this._filtersComponent);

    this._filtersComponent = null;
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

    this._filtersModel.setFilter(filterType, UpdateType.MAJOR);
  }
}

export default Filters;
