import dayjs from 'dayjs';
import flatpickr from 'flatpickr';
import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import { TYPES } from '../consts.js';
import { capitalizeFirstLetter } from '../utils/common.js';  // ?

import 'flatpickr/dist/flatpickr.min.css';

const renderDestinationText = (description) => `<p class="event__destination-description">${description}</p>`;

const getPhoto = (photo) => `<img class="event__photo" src="${photo.src}" alt="${photo.description}">`;

const renderDestinationPhotos = (photos) => `
  <div class="event__photos-container">
    <div class="event__photos-tape">
      ${photos.map(getPhoto).join(' ')}
    </div>
  </div>
`;

const renderDestination = (destinationDescription, photos) => (
  !destinationDescription && !photos.length) ? '' : `
  <section class="event__section  event__section--destination">
    <h3 class="event__section-title  event__section-title--destination">Destination</h3>
    ${destinationDescription ? renderDestinationText(destinationDescription) : ''}
    ${photos.length ? renderDestinationPhotos(photos) : ''}
  </section>
`;

const renderDestinationOption = (optionCity) => `<option value="${optionCity}"></option>`;

const getClassNamePart = (str) => {
  const splitStr = str.split('');

  return splitStr[splitStr.length - 1];
};

const getOfferTemplate = (offer, isChecked, isDisabled) => {
  const {id, title, price} = offer;

  const classNamePart = getClassNamePart(title);

  return `
    <div class="event__offer-selector">
      <input
        class="event__offer-checkbox  visually-hidden"
        id="event-offer-${classNamePart}-${id}"
        type="checkbox"
        name="event-offer-${classNamePart}"
        ${isChecked ? 'checked' : ''}
        ${isDisabled ? 'disabled' : ''}
      >
      <label class="event__offer-label" for="event-offer-${classNamePart}-${id}">
        <span class="event__offer-title">${title}</span>
        &plus;&euro;&nbsp;
        <span class="event__offer-price">${price}</span>
      </label>
    </div>
  `;
};

const renderOffers = (offers, offersOfSelectedType, isDisabled) => !offersOfSelectedType.length ? '' : `
  <section class="event__section  event__section--offers">
    <h3 class="event__section-title  event__section-title--offers">Offers</h3>
    <div class="event__available-offers">
      ${offersOfSelectedType.map((offer) => getOfferTemplate(offer,
    Boolean(offers.find((current) => current.title === offer.title)), isDisabled)).join('')}
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

const createEditPointTemplate = (point, destinations, typedOffers, isNew) => {
  const {
    type,
    destination,
    dateFrom,
    dateTo,
    basePrice,
    offers,
    description,
    photos,
    onSaving,
    onDeleting,
    isDisabled,
  } = point;

  const selectedTypeOffers = typedOffers.find((item) => item.type === type).offers;
  const offersTemplate = renderOffers(offers, selectedTypeOffers, isDisabled);
  const descriptionTemplate = renderDestination(description, photos);
  const typesListTemplate = TYPES.map((currentType) => getSelectButton(currentType, currentType === type)).join(' ');
  const resetButtonInnerText = isNew ? 'Cansel' : 'Delete';

  return `
    <li class="trip-events__item">
        <form class="event event--edit" action="#" method="post">
          <header class="event__header">
            <div class="event__type-wrapper">
              <label class="event__type  event__type-btn" for="event-type-toggle-1">
                <span class="visually-hidden">Choose event type</span>
                <img class="event__type-icon" width="17" height="17" src="img/icons/${type.toLowerCase()}.png" alt="Event type icon">
              </label>
              <input class="event__type-toggle  visually-hidden"
                id="event-type-toggle-1" type="checkbox" ${isDisabled ? 'disabled' : ''}>

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
                name="event-destination" value="${destination}" list="destination-list-1" ${isDisabled ? 'disabled' : ''}>
              <datalist id="destination-list-1">
                ${destinations.map((current) => renderDestinationOption(current.name)).join(' ')}
              </datalist>
            </div>

            <div class="event__field-group  event__field-group--time">
              <label class="visually-hidden" for="event-start-time-1">From</label>
              <input class="event__input  event__input--time" id="event-start-time-1"
                type="text" name="event-start-time"
                value="${dayjs(dateFrom).format('DD/MM/YY HH:mm')}" ${isDisabled ? 'disabled' : ''}>
              &mdash;
              <label class="visually-hidden" for="event-end-time-1">To</label>
              <input class="event__input  event__input--time" id="event-end-time-1"
                type="text" name="event-end-time"
                value="${dayjs(dateTo).format('DD/MM/YY HH:mm')}" ${isDisabled ? 'disabled' : ''}>
            </div>

            <div class="event__field-group  event__field-group--price">
              <label class="event__label" for="event-price-1">
                <span class="visually-hidden">Price</span>
                &euro;
              </label>
              <input class="event__input  event__input--price" id="event-price-1"
                type="text" name="event-price" value="${basePrice}" ${isDisabled ? 'disabled' : ''}>
            </div>

            <button class="event__save-btn  btn  btn--blue" type="submit" ${isDisabled ? 'disabled' : ''}>
              ${onSaving ? 'Saving...' : 'Save'}
            </button>
            <button class="event__reset-btn" type="reset" ${isDisabled ? 'disabled' : ''}>
              ${onDeleting ? 'Deleting...' : resetButtonInnerText}
            </button>
            ${isNew ? '<button class="event__rollup-btn" type="button">' : ''}
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
  #destinations = null;
  #offers = null;
  #isNew = null;
  #startTimePicker = null;
  #endTimePicker = null;

  constructor(point, destinations, offers, isNew = false) {
    super();
    this._state = NewEditPointTemplateView.parsePointToState(point);
    this.#destinations = destinations;
    this.#offers = offers;
    this.#isNew = isNew;

    this.#setInnerHandlers();
    this.#setPickers();
  }

  get template() {
    return createEditPointTemplate(this._state, this.#destinations, this.#offers, this.#isNew);
  }

  reset = (point) => {
    this.updateElement(
      NewEditPointTemplateView.parsePointToState(point)
    );
  };

  removeElement = () => {
    super.removeElement();

    if (this.#startTimePicker) {
      this.#startTimePicker.destroy();
      this.#startTimePicker = null;
    }

    if (this.#endTimePicker) {
      this.#endTimePicker.destroy();
      this.#endTimePicker = null;
    }
  };

  _restoreHandlers = () => {
    this.#setInnerHandlers();
    this.#setPickers();
    this.setFormSubmitHandler(this._callback.formSubmit);
    this.setFormRollupButtonClickHandler(this._callback.rollupButtonClick);
  };

  #setInnerHandlers = () => {
    this.element
      .querySelector('.event__field-group')
      .addEventListener('change',this.#pointTypeChangeHandler);
    this.element
      .querySelector('.event__input--destination')
      .addEventListener('change', this.#pointDestinationChangeHandler);
    this.element
      .querySelector('.event__input--price')
      .addEventListener('input', this.#pointPriceInputHandler);
  };

  #setPickers = () => {
    if (this.#startTimePicker) {
      this.#startTimePicker.destroy();
      this.#startTimePicker = null;
    }

    if (this.#endTimePicker) {
      this.#endTimePicker.destroy();
      this.#endTimePicker = null;
    }

    this.#startTimePicker = flatpickr(
      this.element.querySelector('#event-start-time-1'),
      {
        enableTime: true,
        dateFormat: 'y/m/d H:i',
        defaultDate: this._state.dateFrom,
        maxDate: this._state.dateTo,
        onChange: this.#startTimeChangeHandler
      }
    );

    this.#endTimePicker = flatpickr(
      this.element.querySelector('#event-end-time-1'),
      {
        enableTime: true,
        dateFormat: 'y/m/d H:i',
        minDate: this._state.dateFrom,
        defaultDate: this._state.dateTo,
        onChange: this.#endTimeChangeHandler
      }
    );
  };

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this._callback.formSubmit(NewEditPointTemplateView.parseStateToPoint(this._state));
  };

  #rollupButtonClickHandler = () => {
    this._callback.rollupButtonClick();
  };

  #resetButtonClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.resetButtonClick(NewEditPointTemplateView.parseStateToPoint(this._state));
  };

  #pointTypeChangeHandler = (evt) => {
    evt.preventDefault();
    this.updateElement({
      type: evt.target.value,
    });
  };

  #pointDestinationChangeHandler = (evt) => {
    evt.preventDefault();
    this.updateElement({
      destination: evt.target.value,
    }, true);
  };

  #startTimeChangeHandler = ([userDate]) => {
    this.updateElement({
      dateFrom: userDate,
    }, true);

    this.#endTimePicker.set('minDate', userDate);
  };

  #endTimeChangeHandler = ([userDate]) => {
    this.updateElement({
      dateTo: userDate,
    }, true);

    this.#startTimePicker.set('maxDate', userDate);
  };

  #pointPriceInputHandler = (evt) => {
    evt.preventDefault();
    this.updateElement({
      basePrice: evt.target.value,
    }, true);
  };

  setFormSubmitHandler = (callback) => {
    this._callback.formSubmit = callback;
    this.element.querySelector('form').addEventListener('submit', this.#formSubmitHandler);
  };

  setFormRollupButtonClickHandler = (callback) => {
    this._callback.rollupButtonClick = callback;
    // this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#rollupButtonClickHandler);
  };

  setResetButtonClickHandler = (callback) => {
    this._callback.buttonClick = callback;
    this.element.querySelector('.event__reset-btn').addEventListener('click', this.#resetButtonClickHandler);
  };

  static parsePointToState = (point) => ({...point,
    onSaving: false,
    onDeleting: false,
    isDisabled: false,
  });

  static parseStateToPoint = (state) => {
    const point = Object.assign({}, state);

    delete state.onSaving;
    delete state.onDeleting;
    delete state.isDisabled;

    return point;
  };
}
