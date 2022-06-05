import {  UpdateType } from '../consts';   // FilterType,
import { remove, render, replace } from '../framework/render';
// import { filter } from '../utils/filter ';
import NewTripFiltersTemplateView from '../view/trip-filters-view';

export default class FilterPresenter {
  #filterContainer = null;
  #filterModel = null;
  #pointsModel = null;

  #currentFilter = null;
  #filterComponent = null;

  constructor(filterContainer, filterModel, pointsModel) {
    this.#filterContainer = filterContainer;
    this.#filterModel = filterModel;
    this.#pointsModel = pointsModel;

    this.#filterModel.addObserver(this.#modelEventHandler);
    this.#pointsModel.addObserver(this.#modelEventHandler);
  }

  // get filter() {
  //   const points = this.#pointsModel.points;

  //   return [
  //     {
  //       type: FilterType.EVERYTHING,
  //       name: 'EVERYTHING',
  //       count: filter[FilterType.EVERYTHING](points).length,
  //     },
  //     {
  //       type: FilterType.FUTURE,
  //       name: 'FUTURE',
  //       count: filter[FilterType.FUTURE](points).length,
  //     },
  //     {
  //       type: FilterType.PAST,
  //       name: 'PAST',
  //       count: filter[FilterType.PAST](points).length,
  //     },
  //   ];
  // }

  init = () => {
    const prevFilterComponent = this.#filterComponent;

    this.#currentFilter = this.#filterModel.filter;

    this.#filterComponent = new NewTripFiltersTemplateView(this.#currentFilter);
    this.#filterComponent.setFilterTypeChangeHandler(this.#filterTypeChangeHandler);

    if (prevFilterComponent === null) {
      render(this.#filterComponent, this.#filterContainer);
      return;
    }

    replace(this.#filterComponent, prevFilterComponent);
    remove(prevFilterComponent);
  };

  #modelEventHandler = () => {
    this.init();
  };

  #filterTypeChangeHandler = (filterType) => {
    if (this.#currentFilter !== filterType) {
      this.#filterModel.setFilter(UpdateType.MAJOR, filterType);
    }
  };
}
