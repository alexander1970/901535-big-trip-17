import { Mode } from '../consts';
import { remove, replace } from '../framework/render';
import NewEditPointTemplateView from '../view/trip-edit-point-view';
import NewTripListPointTemplateView from '../view/trip-list-point-view';

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

  init(arrPoints) {
    this.#arrPoints = arrPoints;

    const prevPointComponent = this.#pointComponent;
    const prevPointEditComponent = this.#pointEditComponent;

    this.#pointComponent = new NewTripListPointTemplateView(arrPoints);
    this.#pointEditComponent = new NewEditPointTemplateView(arrPoints);

    this.#pointComponent.setEditClickHandler(this.#handlePointClick);
  }

  destroy = () => {
    remove(this.#pointComponent);
    remove(this.#pointEditComponent);
  };

  resetView = () => {
    if (this.#mode !== Mode.DEFAULT) {
      this.#replaceCardToPoint();
    }
  };

  #replaceCardToPoint = () => {
    replace(this.#pointComponent, this.#pointEditComponent);
    document.removeEventListener('keydown', this.#escKeyDownHandler);
    this.#mode = Mode.DEFAULT;
  };

  #replacePointToCard = () => {
    replace(this.#pointEditComponent, this.#pointComponent);
    document.addEventListener('keydown', this.#escKeyDownHandler);
    this.#changeMode();
    this.#mode = Mode.EDIT;
  };

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.#replacePointToCard();
    }
  };

  #handlePointClick() {
    this.#replacePointToCard();
  }
}
