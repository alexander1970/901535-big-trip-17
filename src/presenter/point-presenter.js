import { remove, render, replace } from '../framework/render';
import NewEditPointTemplateView from '../view/trip-edit-point-view';
import NewTripListPointTemplateView from '../view/trip-list-point-view';

export default class PointPresenter {
  #tripEvents = null;
  #changeData = null;
  #changeMode = null;

  #pointComponent = null;
  #pointEditComponent = null;
  #arrPoints = [];

  constructor(tripEvents, changeData, changeMode) {
    this.#tripEvents = tripEvents;
    this.#changeData = changeData;
    this.#changeMode = changeMode;
  }

  init(arrPoints) {
    this.#arrPoints = arrPoints;

    for (const element of this.#arrPoints) {
      this.#renderPoint(element);
    }
  }

  destroy() {
    remove(this.#pointComponent);
    remove(this.#pointEditComponent);
  }

  #renderPoint = (point) => {
    this.#pointComponent = new NewTripListPointTemplateView(point);
    this.#pointEditComponent = new NewEditPointTemplateView(point);

    const replaceCardToForm = () => {
      replace(this.#pointEditComponent, this.#pointComponent);
    };

    const replaceFormToCard = () => {
      replace(this.#pointComponent, this.#pointEditComponent);
    };

    const onEscKeyDown = (evt) => {
      if (evt.key === 'Escape' || evt.key === 'Esc') {
        evt.preventDefault();
        replaceFormToCard();
        document.removeEventListener('keydown', onEscKeyDown);
      }
    };

    this.#pointComponent.setButtonClickHandler(() => {
      replaceCardToForm();
      document.addEventListener('keydown', onEscKeyDown);
    });

    this.#pointEditComponent.setButtonClickHandler(() => {
      replaceFormToCard();
      document.removeEventListener('keydown', onEscKeyDown);
    });

    this.#pointEditComponent.setFormSubmitHandler(() => {
      replaceFormToCard();
      document.removeEventListener('keydown', onEscKeyDown);
    });

    render(this.#pointComponent, this.#tripEvents);
  };
}
