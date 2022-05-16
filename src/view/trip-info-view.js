import AbstractView from '../framework/view/abstract-view.js';

const createTripTemplate = (points) => {
  const destinations =new Set(points.map((point) => point.destination));

  return `
    <div class="trip-info__main">
      <h1 class="trip-info__title">
        Amsterdam &mdash; Chamonix &mdash; Geneva
      </h1>

      <p class="trip-info__dates">Mar 18&nbsp;&mdash;&nbsp;20</p>
    </div>
  `;
};

const createAboutTripTemplate = (points) => `
  <section class="trip-main__trip-info  trip-info">
    ${createTripTemplate(points)}
    <p class="trip-info__cost">
      Total: &euro;&nbsp;<span class="trip-info__cost-value">1230</span>
    </p>
  </section>
`;

export default class NewAboutTripTemplate extends AbstractView {
  #points = null;

  constructor(points) {
    super();
    this.#points = points;
  }

  get template() {
    return createAboutTripTemplate(this.#points);
  }
}
