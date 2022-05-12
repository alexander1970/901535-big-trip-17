import { createElement } from '../render';

const createEmptyMessageTemplate = () => `
  <p class="trip-events__msg">
    Click New Event to create your first point
  </p>
  `;

export default class EventsEmpty {
  #element = null;

  get template() {
    return createEmptyMessageTemplate();
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  removeElement() {
    this.#element = null;
  }
}
