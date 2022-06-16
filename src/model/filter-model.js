import { FilterType } from '../consts';
import Observable from '../framework/observable';

export default class FilterModel extends Observable {
  #activeFilter = FilterType.EVERYTHING;

  get filter() {
    return this.#activeFilter;
  }

  setFilter = (updateType, filter) => {
    this.#activeFilter = filter;
    this._notify(updateType, filter);
  };
}
