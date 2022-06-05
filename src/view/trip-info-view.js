import dayjs from 'dayjs';
import AbstractView from '../framework/view/abstract-view.js';

const humanizeMaxDate = (min, max) => (dayjs(min).format('MMM') === dayjs(max).format('MMM')) ? `${dayjs(max).format('DD')}` : `${dayjs(max).format('MMM DD')}`;

const createTripTemplate = (points) => {
  const destinations =new Set(points.map((point) => point.destination));
  const dates = points.map((point) => point.dateFrom);
  const minDate = new Date(Math.min(...dates));
  const maxDate = new Date(Math.max(...dates));

  return `
    <div class="trip-info__main">
      <h1 class="trip-info__title">
        ${[...destinations].join(' &mdash; ')}
      </h1>

      <p class="trip-info__dates">
        ${dayjs(minDate).format('MMM DD')}&nbsp;&mdash;&nbsp;${humanizeMaxDate(minDate, maxDate)}
      </p>
    </div>
  `;
};

const createCostTemplate = (points) => {
  let totalSum = 0;

  points.forEach((point) => {
    const {basePrice, offers} = point;

    if (offers.length) {
      totalSum += offers.map((offer) => offer.cost).reduce((a, b) => a + b);
    }

    totalSum += basePrice;
  });

  return `
    <p class="trip-info__cost">
      Total: &euro;&nbsp;<span class="trip-info__cost-value">${totalSum}</span>
    </p>
  `;
};

const createAboutTripTemplate = (points) => !points.length ? `
  <div class="visually-hidden"> </div>
  ` : `
  <section class="trip-main__trip-info  trip-info">
    ${createTripTemplate(points)}
    ${createCostTemplate(points)}
  </section>
`;

export default class NewAboutTripTemplate extends AbstractView {
  #points = null;

  constructor(pointModel) {
    super();
    this.#points = [...pointModel.points];
  }

  get template() {
    return createAboutTripTemplate(this.#points);
  }
}
