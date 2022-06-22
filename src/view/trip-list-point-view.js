import dayjs from 'dayjs';
import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import { capitalizeFirstLetter } from '../utils/common.js'; // ?
import { calcDuration, getDuration } from '../utils/point.js';

const getOfferTemplate = (offer) => {
  const {title, price} = offer;

  return `
    <li class="event__offer">
      <span class="event__offer-title">${title}</span>
      &plus;&euro;&nbsp;
      <span class="event__offer-price">${price}</span>
    </li>
  `;
};

const renderOffers = (offersOfSelectedType) => `
    <ul class="event__selected-offers">
      ${offersOfSelectedType.map((offer) => getOfferTemplate(offer)).join('')}
    </ul>
  `;

const createListPointTemplate = (point, typedOffers) => {
  const {
    type,
    destination,
    dateFrom,
    dateTo,
    basePrice,
    isFavorite
  } = point;

  const duration = calcDuration(point);
  const selectedTypeOffers = typedOffers.find((item) => item.type === type).offers;

  return `
    <li class="trip-events__item">
      <div class="event">
        <time class="event__date" datetime="${dayjs(dateFrom).format('YYYY-MM-DD')}">
          ${dayjs(dateFrom).format('D MMMM')}
        </time>
        <div class="event__type">
          <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
        </div>
        <h3 class="event__title">${capitalizeFirstLetter(type)} ${destination}</h3>
        <div class="event__schedule">
          <p class="event__time">
            <time class="event__start-time" datetime="${dayjs(dateFrom).format('YYYY-MM-DDTHH:mm')}">
              ${dayjs(dateFrom).format('HH:mm')}
            </time>
            &mdash;
            <time class="event__end-time" datetime="${dayjs(dateTo).format('YYYY-MM-DDTHH:mm')}">
              ${dayjs(dateTo).format('HH:mm')}
            </time>
          </p>
          <p class="event__duration">
            ${getDuration(duration)}
          </p>
        </div>
        <p class="event__price">
          &euro;&nbsp;<span class="event__price-value">${basePrice}</span>
        </p>
        <h4 class="visually-hidden">Offers:</h4>
        ${renderOffers(selectedTypeOffers)}
        <button class="event__favorite-btn ${isFavorite ? 'event__favorite-btn--active' : ''}" type="button">
          <span class="visually-hidden">Add to favorite</span>
          <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
            <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
          </svg>
        </button>
        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </div>
    </li>
  `;
};

export default class NewTripListPointTemplateView extends AbstractStatefulView {
  #offers = null;

  constructor(point, offers) {
    super();
    this._state = point;
    this.#offers = offers;
  }

  get template() {
    return createListPointTemplate(this._state, this.#offers);
  }

  setPointRollupButtonClickHandler = (callback) => {
    this._callback.buttonClick = callback;
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#rollupButtonClickHandler);
  };

  setFavoriteClickHandler = (callback) => {
    this._callback.favoriteClick = callback;
    this.element.querySelector('.event__favorite-btn').addEventListener('click', this.#favoriteClickHandler);
  };

  #rollupButtonClickHandler = () => {
    this._callback.buttonClick();
  };

  #favoriteClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.favoriteClick();
  };
}
