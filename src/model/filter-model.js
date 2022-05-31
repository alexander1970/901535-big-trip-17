import { FilterType } from '../consts';
import Observable from '../framework/observable';

export default class Filter extends Observable {
  #activeFilter = FilterType.EVERYTHING;

  getFilter = () => this.#activeFilter;

  setFilter = (updateType, filter) => {
    this.#activeFilter = filter;
    this._notify(updateType, filter);
  };
}
