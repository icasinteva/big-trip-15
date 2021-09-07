import AbstractObserver from '../utils/abstract-observer';
import { DEFAULT_FILTER } from '../const';

class FiltersModel extends AbstractObserver {
  constructor() {
    super();
    this._activeFilter = DEFAULT_FILTER;
  }

  setFilter(filterType, updateType) {
    this._activeFilter = filterType;

    if (updateType) {
      this._notify(updateType, filterType);
    }
  }

  getFilter() {
    return this._activeFilter;
  }
}

export default FiltersModel;
