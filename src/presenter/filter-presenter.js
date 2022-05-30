import { UpdateType } from '../consts';
import { remove, render, replace } from '../framework/render';
import NewTripFiltersTemplateView from '../view/trip-filters-view';

export default class Filters {
  #filtersContainer = null;
  #eventsModel = null;
  #filterModel = null;

  #currentFilter = null;
  #filterComponent = null;

  constructor(filtersContainer, eventsModel, filterModel) {
    this.#filtersContainer = filtersContainer;
    this.#eventsModel = eventsModel;
    this.#filterModel = filterModel;

    this.#filterModel.addObserver(this.#modelEventHandler);
    this.#eventsModel.addObserver(this.#modelEventHandler);
  }

  init = () => {
    const prevFilterComponent = this.#filterComponent;

    this.#currentFilter = this.#filterModel.getFilter();

    this.#filterComponent = new NewTripFiltersTemplateView(this.#currentFilter);
    this.#filterComponent.setFilterTypeChangeHandler(this.#filterTypeChangeHandler);

    if (prevFilterComponent === null) {
      render(this.#filterComponent, this.#filtersContainer);
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
