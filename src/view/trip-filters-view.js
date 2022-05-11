<<<<<<< HEAD
// eslint-disable-next-line quotes
import { createElement } from "../render.js";
=======
import { createElement } from '../render.js';
>>>>>>> 0ca6a087e7fbbb9fe9c5418b9c1b1522cacf3226

const createTripFiltersTemplate = () => (
  `<form class="trip-filters" action="#" method="get">
    <div class="trip-filters__filter">
      <input id="filter-everything" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="everything" checked>
      <label class="trip-filters__filter-label" for="filter-everything">Everything</label>
    </div>

    <div class="trip-filters__filter">
      <input id="filter-future" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="future">
      <label class="trip-filters__filter-label" for="filter-future">Future</label>
<<<<<<< HEAD
    </div>

    <div class="trip-filters__filter">
      <input id="filter-past" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="past" >
      <label class="trip-filters__filter-label" for="filter-past">Past</label>
    </div>

=======
    </div>

    <div class="trip-filters__filter">
      <input id="filter-past" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="past" >
      <label class="trip-filters__filter-label" for="filter-past">Past</label>
    </div>

>>>>>>> 0ca6a087e7fbbb9fe9c5418b9c1b1522cacf3226
    <button class="visually-hidden" type="submit">Accept filter</button>
  </form>`);

export default class NewTripFiltersTemplateView {
<<<<<<< HEAD
  getTemplate() {
    return createTripFiltersTemplate();
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
=======
  #element;

  get template() {
    return createTripFiltersTemplate();
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  removeElement() {
    this.#element = null;
>>>>>>> 0ca6a087e7fbbb9fe9c5418b9c1b1522cacf3226
  }
}
