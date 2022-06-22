import { Mode, UpdateType, UserAction } from '../consts.js';
import { remove, render, replace } from '../framework/render.js';
import NewEditPointTemplateView from '../view/trip-edit-point-view.js';
import NewTripListPointTemplateView from '../view/trip-list-point-view.js';

export default class PointPresenter {
  #pointsContainer = null;
  #changeData = null;
  #changeMode = null;

  #pointComponent = null;
  #pointEditComponent = null;
  #mode = Mode.DEFAULT;

  #arrPoints = [];
  #destinations = [];
  #offers = [];

  constructor(pointsContainer, changeData, changeMode) {
    this.#pointsContainer = pointsContainer;
    this.#changeData = changeData;
    this.#changeMode = changeMode;
  }

  init = (arrPoints, destinations, offers) => {
    this.#arrPoints = arrPoints;
    this.#destinations = destinations;
    this.#offers = offers;

    const prevPointComponent = this.#pointComponent;
    const prevPointEditComponent = this.#pointEditComponent;

    this.#pointComponent = new NewTripListPointTemplateView(this.#arrPoints, this.#offers);
    this.#pointEditComponent = new NewEditPointTemplateView(this.#arrPoints, this.#destinations, this.#offers);

    this.#pointComponent.setPointRollupButtonClickHandler(this.#handlePointRollupClick);
    this.#pointComponent.setFavoriteClickHandler(this.#handleFavoriteClick);
    this.#pointEditComponent.setFormSubmitHandler(this.#handleFormSubmit);
    this.#pointEditComponent.setFormRollupButtonClickHandler(this.#handleFormRollupClick);
    this.#pointEditComponent.setResetButtonClickHandler(this.#handleFormResetClick);

    if (prevPointComponent === null || prevPointEditComponent === null) {
      render(this.#pointComponent, this.#pointsContainer);
      return;
    }

    if (this.#mode === Mode.DEFAULT) {
      replace(this.#pointComponent, prevPointComponent);
    }

    if (this.#mode === Mode.EDIT) {
      replace(this.#pointEditComponent, prevPointEditComponent);
    }

    remove(this.#pointComponent);
    remove(this.#pointEditComponent);
  };

  destroy = () => {
    remove(this.#pointComponent);
    remove(this.#pointEditComponent);
  };

  resetView = () => {
    if (this.#mode !== Mode.DEFAULT) {
      this.#replaceFormToCard();
    }
  };

  #replaceFormToCard = () => {
    replace(this.#pointComponent, this.#pointEditComponent);
    document.removeEventListener('keydown', this.#escKeyDownHandler);
    this.#mode = Mode.DEFAULT;
  };

  #replaceCardToForm = () => {
    replace(this.#pointEditComponent, this.#pointComponent);
    document.addEventListener('keydown', this.#escKeyDownHandler);
    this.#changeMode();
    this.#mode = Mode.EDIT;
  };

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.#pointEditComponent.reset(this.#arrPoints);
      this.#replaceFormToCard();
    }
  };

  #handlePointRollupClick = () => {
    this.#replaceCardToForm();
  };

  #handleFormRollupClick = () => {
    this.#pointEditComponent.reset(this.#arrPoints);
    this.#replaceFormToCard();
  };

  #handleFormResetClick = (point) => {
    if (this.#mode === Mode.EDIT) {
      this.#changeData(
        UserAction.DELETE_POINT,
        UpdateType.MINOR,
        point
      );
      return;
    }
    this.#pointEditComponent.reset(this.#arrPoints);
    this.#replaceFormToCard();
  };

  #handleFormSubmit = (point) => {
    this.#changeData(
      UserAction.UPDATE_POINT,
      UpdateType.MINOR,
      point
    );
    this.#replaceFormToCard();
  };

  #handleFavoriteClick = () => {
    this.#changeData(
      UserAction.UPDATE_POINT,
      UpdateType.MINOR,
      {...this.#arrPoints, isFavorite: !this.#arrPoints.isFavorite},
    );
  };
}
