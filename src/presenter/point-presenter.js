import { Mode } from '../consts.js';
import { remove, render, replace } from '../framework/render.js';
import NewEditPointTemplateView from '../view/trip-edit-point-view.js';
import NewTripListPointTemplateView from '../view/trip-list-point-view.js';

export default class PointPresenter {
  #tripEvents = null;
  #changeData = null;
  #changeMode = null;

  #pointComponent = null;
  #pointEditComponent = null;
  #mode = Mode.DEFAULT;
  #arrPoints = [];

  constructor(tripEvents, changeData, changeMode) {
    this.#tripEvents = tripEvents;
    this.#changeData = changeData;
    this.#changeMode = changeMode;
  }

  init = (arrPoints) => {
    this.#arrPoints = arrPoints;

    const prevPointComponent = this.#pointComponent;
    const prevPointEditComponent = this.#pointEditComponent;

    this.#pointComponent = new NewTripListPointTemplateView(this.#arrPoints);
    this.#pointEditComponent = new NewEditPointTemplateView(this.#arrPoints);

    this.#pointComponent.setEditClickHandler(this.#handleEditClick);
    // this.#pointComponent.setFavoriteClickHandler(this.#handleFavoriteClick);
    this.#pointEditComponent.setFormSubmitHandler(this.#handleFormSubmit);
    // this.#pointEditComponent.setButtonClickHandler(this.#handleFormClick);

    if (prevPointComponent === null || prevPointEditComponent === null) {
      render(this.#pointComponent, this.#tripEvents);
      return;
    }

    if (this.#pointComponent.contains(prevPointComponent.element)) {  //this.#mode === Mode.DEFAULT
      replace(this.#pointComponent, prevPointComponent);
    }

    if (this.#pointEditComponent.contains(prevPointEditComponent.element)) {  // this.#mode === Mode.EDIT
      replace(this.#pointEditComponent, prevPointEditComponent);
    }

    remove(this.#pointComponent);
    remove(this.#pointEditComponent);
  };

  destroy = () => {
    remove(this.#pointComponent);
    remove(this.#pointEditComponent);
  };

  // resetView = () => {
  //   if (this.#mode !== Mode.DEFAULT) {
  //     this.#replaceCardToPoint();
  //   }
  // };

  #replaceCardToForm = () => {
    replace(this.#pointEditComponent, this.#pointComponent);
    document.addEventListener('keydown', this.#escKeyDownHandler);
    // this.#changeMode();
    // this.#mode = Mode.EDIT;
  };

  #replaceFormToCard = () => {
    replace(this.#pointComponent, this.#pointEditComponent);
    document.removeEventListener('keydown', this.#escKeyDownHandler);
    // this.#mode = Mode.DEFAULT;
  };

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.#replaceFormToCard();
    }
  };

  #handleEditClick = () => {
    this.#replaceCardToForm();
  };

  // #handleFormClick = () => {
  //   this.#replaceCardToPoint();
  // };

  #handleFormSubmit = () => { //point
    // this.#changeData(point);
    this.#replaceFormToCard();
  };

  // #handleFavoriteClick = () => {
  //   this.#changeData(
  //     Object.assign(
  //       {},
  //       this.#arrPoints,
  //       {
  //         isFinite: !this.#arrPoints.isFinite
  //       }
  //     )
  //   );
  // };
}
