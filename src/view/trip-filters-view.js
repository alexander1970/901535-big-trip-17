import { FilterType } from '../consts.js';
import AbstractView from '../framework/view/abstract-view.js';

const createTripFiltersTemplate = (activeFilterType) => `
  <form class="trip-filters" action="#" method="get">
    <div class="trip-filters__filter">
      <input
        type="radio"
        id="filter-everything"
        class="trip-filters__filter-input  visually-hidden"
        name="trip-filter"
        ${activeFilterType === FilterType.EVERYTHING ? 'checked' : ''}
        value="everything"
      />
      <label class="trip-filters__filter-label" for="filter-everything">Everything</label>
    </div>

    <div class="trip-filters__filter">
      <input
        type="radio"
        id="filter-future"
        class="trip-filters__filter-input  visually-hidden"
        name="trip-filter"
        ${activeFilterType === FilterType.FUTURE ? 'checked' : ''}
        value="future"
      />
      <label class="trip-filters__filter-label" for="filter-future">Future</label>
    </div>

    <div class="trip-filters__filter">
      <input
        type="radio"
        id="filter-past"
        class="trip-filters__filter-input  visually-hidden"
        name="trip-filter"
        ${activeFilterType === FilterType.PAST ? 'checked' : ''}
        value="past"
      />
      <label class="trip-filters__filter-label" for="filter-past">Past</label>
    </div>

    <button class="visually-hidden" type="submit">Accept filter</button>
  </form>
`;

export default class NewTripFiltersTemplateView extends AbstractView {
  #activeFilterType = null;

  constructor(activeFilterType) {
    super();
    this.#activeFilterType = activeFilterType;
  }

  get template() {
    return createTripFiltersTemplate(this.#activeFilterType);
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
