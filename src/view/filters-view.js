import AbstractView from '../framework/view/abstract-view.js';

const createFilterItemTemplate = (filter, currentFilterType) => {
  const {type, name} = filter;

  return `
    <div class="trip-filters__filter">
      <input
        type="radio"
        id="filter-${name}"
        class="trip-filters__filter-input  visually-hidden"
        name="trip-filter"
        ${currentFilterType === type ? 'checked' : ''}
        value="${name}"
      />
      <label class="trip-filters__filter-label" for="filter-${name}">${name}</label>
    </div>
  `;
};

const createFilterTemplate = (filterItems, currentFilterType) => {
  const filterItemsTemplate = filterItems
    .map((filter) => createFilterItemTemplate(filter, currentFilterType))
    .join(' ');

  return `
    <form class="trip-filters" action="#" method="get">
      ${filterItemsTemplate}
      <button class="visually-hidden" type="submit">Accept filter</button>
    </form>
  `;
};

export default class FiltersView extends AbstractView {
  #filters = null;
  #currentFilterType = null;

  constructor(filters, currentFilterType) {
    super();
    this.#filters = filters;
    this.#currentFilterType = currentFilterType;
  }

  get template() {
    return createFilterTemplate(this.#filters, this.#currentFilterType);
  }

  setFilterTypeChangeHandler = (callback) => {
    this._callback.filterTypeChange = callback;
    this.element.addEventListener('change', this.#filterTypeChangeHandler);
  };

  #filterTypeChangeHandler = (evt) => {
    evt.preventDefault();
    this._callback.filterTypeChange(evt.target.value);
  };
}
