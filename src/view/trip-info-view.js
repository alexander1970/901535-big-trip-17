<<<<<<< HEAD
// eslint-disable-next-line quotes
import { createElement } from "../render.js";
=======
import { createElement } from '../render.js';
>>>>>>> 0ca6a087e7fbbb9fe9c5418b9c1b1522cacf3226

const createAboutTripTemplate = () => (
  `<section class="trip-main__trip-info  trip-info">
    <div class="trip-info__main">
      <h1 class="trip-info__title">Amsterdam &mdash; Chamonix &mdash; Geneva</h1>

      <p class="trip-info__dates">Mar 18&nbsp;&mdash;&nbsp;20</p>
    </div>

    <p class="trip-info__cost">
      Total: &euro;&nbsp;<span class="trip-info__cost-value">1230</span>
    </p>
  </section>`);

export default class NewAboutTripTemplate {
<<<<<<< HEAD
  getTemplate() {
    return createAboutTripTemplate();
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
    return createAboutTripTemplate();
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
