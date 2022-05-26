import dayjs from 'dayjs';
import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import { TYPES } from '../mock/consts.js';
import { capitalizeFirstLetter } from '../utils/common.js';

const BLANK_POINT = {
  basePrice: 0,
  dateFrom: null,
  dateTo: null,
  destination: '',
  isFavorite: false,
  offers: null,
  type: '',
  description: ''
};

const renderDestinationText = (description) => `<p class="event__destination-description">${description}</p>`;

const renderDestination = (description, haveDescription) => !haveDescription ? '' : `
  <section class="event__section  event__section--destination">
    <h3 class="event__section-title  event__section-title--destination">Destination</h3>
    ${renderDestinationText(description)}
  </section>
`;

const getOfferTemplate = (offer) => {
  const {title, cost} = offer;

  const getClassNamePart = (str) => {
    const splitStr = str.split(' ');

    return splitStr[splitStr.length - 1];
  };

  return `
    <div class="event__offer-selector">
      <input class="event__offer-checkbox  visually-hidden" id="event-offer-${getClassNamePart(title)}-1" type="checkbox"
        name="event-offer-${getClassNamePart(title)}" checked>
      <label class="event__offer-label" for="event-offer-${getClassNamePart(title)}-1">
        <span class="event__offer-title">${title}</span>
        &plus;&euro;&nbsp;
        <span class="event__offer-price">${cost}</span>
      </label>
    </div>
  `;
};

const renderOffers = (offers, haveOffers) => !haveOffers ? '' : `
  <section class="event__section  event__section--offers">
    <h3 class="event__section-title  event__section-title--offers">Offers</h3>
    <div class="event__available-offers">
      ${offers.map(getOfferTemplate).join(' ')}
    </div>
  </section>
`;

const getSelectButton = (type, isTypeMatch) => {
  const selectTypeLowerCase = type.toLowerCase();

  return `
    <div class="event__type-item">
      <input id="event-type-${selectTypeLowerCase}-1" class="event__type-input  visually-hidden" type="radio"
        name="event-type" value="${selectTypeLowerCase}" ${isTypeMatch ? 'checked' : ''}>
      <label class="event__type-label  event__type-label--${selectTypeLowerCase}" for="event-type-${selectTypeLowerCase}">
        ${capitalizeFirstLetter(type)}
      </label>
    </div>
  `;
};

const createEditPointTemplate = (point, isNew) => {
  const {
    basePrice,
    dateFrom,
    dateTo,
    destination,
    offers,
    type,
    description,
    haveOffers,
    haveDescription
  } = point;

  const offersTemplate = renderOffers(offers, haveOffers);
  const descriptionTemplate = renderDestination(description, haveDescription);
  const typesListTemplate = TYPES.map((currentType) => getSelectButton(currentType, currentType === type)).join(' ');

  return `
    <li class="trip-events__item">
        <form class="event event--edit" action="#" method="post">
          <header class="event__header">
            <div class="event__type-wrapper">
              <label class="event__type  event__type-btn" for="event-type-toggle-1">
                <span class="visually-hidden">Choose event type</span>
                <img class="event__type-icon" width="17" height="17" src="img/icons/${type.toLowerCase()}.png" alt="Event type icon">
              </label>
              <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

              <div class="event__type-list">
                <fieldset class="event__type-group">
                  <legend class="visually-hidden">Event type</legend>
                  ${typesListTemplate}
                </fieldset>
              </div>
            </div>

            <div class="event__field-group  event__field-group--destination">
              <label class="event__label  event__type-output" for="event-destination-1">
                ${capitalizeFirstLetter(type)}
              </label>
              <input class="event__input  event__input--destination" id="event-destination-1" type="text"
                name="event-destination" value="${destination}" list="destination-list-1">
              <datalist id="destination-list-1">
                <option value="Amsterdam"></option>
                <option value="Geneva"></option>
                <option value="Chamonix"></option>
              </datalist>
            </div>

            <div class="event__field-group  event__field-group--time">
              <label class="visually-hidden" for="event-start-time-1">From</label>
              <input class="event__input  event__input--time" id="event-start-time-1"
                type="text" name="event-start-time" value="${dayjs(dateFrom).format('DD/MM/YY HH:mm')}">
              &mdash;
              <label class="visually-hidden" for="event-end-time-1">To</label>
              <input class="event__input  event__input--time" id="event-end-time-1"
                type="text" name="event-end-time" value="${dayjs(dateTo).format('DD/MM/YY HH:mm')}">
            </div>

            <div class="event__field-group  event__field-group--price">
              <label class="event__label" for="event-price-1">
                <span class="visually-hidden">Price</span>
                &euro;
              </label>
              <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${basePrice}">
            </div>

            <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
            <button class="event__reset-btn" type="reset">${isNew ? 'Delete' : 'Cancel'}</button>
            <button class="event__rollup-btn" type="button">
              <span class="visually-hidden">Open event</span>
            </button>
          </header>
          <section class="event__details">
            ${offersTemplate}
            ${descriptionTemplate}
          </section>
        </form>
      </li>
  `;
};

export default class NewEditPointTemplateView extends AbstractStatefulView {
  #isNew = null;

  constructor(point = BLANK_POINT, isNew = false) {
    super();
    this._state = NewEditPointTemplateView.parsePointToState(point);
    this.#isNew = isNew;
  }

  get template() {
    return createEditPointTemplate(this._state, this.#isNew);
  }

  setFormSubmitHandler = (callback) => {
    this._callback.formSubmit = callback;
    this.element.querySelector('form').addEventListener('submit', this.#formSubmitHandler);
  };

  setButtonClickHandler = (callback) => {
    this._callback.buttonClick = callback;
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#buttonClickHandler);
  };

  #buttonClickHandler = () => {
    this._callback.buttonClick();
  };

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this._callback.formSubmit(NewEditPointTemplateView.parseStateToPoint(this._state));
  };

  static parsePointToState = (point) => ({...point,
    haveOffers: point.offers.length !== 0,
    haveDescription: point.description !== ''
  });

  static parseStateToPoint = (state) => {
    const point = {...state};

    if (!point.haveOffers) {
      point.offers = [];
    }

    if (!point.haveDescription) {
      point.description = '';
    }

    delete point.haveOffers;
    delete point.haveDescription;

    return point;
  };
}
