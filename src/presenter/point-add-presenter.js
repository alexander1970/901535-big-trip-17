import { BLANK_POINT, UpdateType, UserAction } from '../consts';
import { remove, render } from '../framework/render';
import NewEditPointTemplateView from '../view/trip-edit-point-view';

export default class PointAddPresenter {
  #formContainer = null;
  #changeData = null;

  #pointEditComponent = null;

  constructor(formContainer, changeData) {
    this.#formContainer = formContainer;
    this.#changeData = changeData;
  }

  init = () => {
    if (this.#pointEditComponent !== null) {
      return;
    }

    this.#pointEditComponent = new NewEditPointTemplateView(BLANK_POINT, true);
    this.#pointEditComponent.setFormSubmitHandler(this.#formSubmitHandler);
    this.#pointEditComponent.setResetButtonClickHandler(this.#resetButtonClickHandler);

    render(this.#pointEditComponent, this.#formContainer);

    document.addEventListener('keydown', this.#escKeyDownHandler);
  };

  destroy = () => {
    if (this.#pointEditComponent === null) {
      return;
    }

    remove(this.#pointEditComponent);
    this.#pointEditComponent = null;

    document.removeEventListener('keydown', this.#escKeyDownHandler);
  };

  #formSubmitHandler = (point) => {
    this.#changeData(
      UserAction.ADD_POINT,
      UpdateType.MINOR,
      point,
    );
    this.destroy();
  };

  #resetButtonClickHandler = () => {
    this.destroy();
  };

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.destroy();
    }
  };
}
