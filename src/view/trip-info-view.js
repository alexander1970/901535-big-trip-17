import dayjs from 'dayjs';
import AbstractStatefulView from '../framework/view/abstract-stateful-view';

const humanizeMaxDate = (min, max) => (dayjs(min).format('MMM') === dayjs(max).format('MMM')) ? `${dayjs(max).format('DD')}` : `${dayjs(max).format('MMM DD')}`;

const createTripTemplate = (points) => {
  const destinations = Array.from(new Set(points.map((point) => point.destination)));
  const dates = points.map((point) => point.dateFrom);
  const minDate = new Date(Math.min(...dates));
  const maxDate = new Date(Math.max(...dates));
  const isMore = Boolean(destinations.length > 3);

  return `
    <div class="trip-info__main">
      <h1 class="trip-info__title">
        ${!isMore ? destinations.join('&nbsp;&mdash;&nbsp;') : `
          ${destinations[0]}
          &mdash;&nbsp;&hellip;&nbsp;&mdash;
          ${destinations[destinations.length - 1]}
        `}
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

    // if (offers.length) {
    //   totalSum += offers.map((offer) => offer.cost).reduce((a, b) => a + b);
    // }

    totalSum += basePrice;
  });
  // console.log('totalSum =', totalSum);

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

export default class TripInfo extends AbstractStatefulView {
  constructor(points) {
    super();
    this._state = points;
  }

  get template() {
    return createAboutTripTemplate(this._state);
  }
}
