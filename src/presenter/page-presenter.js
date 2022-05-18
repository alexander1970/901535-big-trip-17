import { Mode } from '../consts.js';
import { render, replace } from '../framework/render.js';
import EventsEmpty from '../view/events-empty.js';
import NewEditPointTemplateView from '../view/trip-edit-point-view.js';
import NewTripListPointTemplateView from '../view/trip-list-point-view.js';
import NewTripListTemplateView from '../view/trip-list-view.js';
import NewTripSortTemplateView from '../view/trip-sort-view.js';

export default class PagePresenter {
  #pointListComponent = new NewTripListTemplateView();
  #listComponent = this.#pointListComponent.element;

  // #pointModel = null;
  #tripEvents = null;
  #arrPoints = [];
  #mode = {};

  constructor(changeMode) {
    this.#changeMode = changeMode;

    this.#mode = Mode.DEFAULT;

    this.#escKeyDownHandler = this.#escKeyDownHandler.bind(this);
  }

  init = (tripEvents, pointModel) => {
    this.#tripEvents = tripEvents;
    // this.#pointModel = pointModel;
    this.#arrPoints = pointModel; // [...this.#pointModel.points];

    if (this.#arrPoints.length === 0) {
      render(new EventsEmpty, this.#tripEvents);
    } else {
      render(new NewTripSortTemplateView(), this.#tripEvents);
      render(this.#pointListComponent, this.#tripEvents);

      for (const element of this.#arrPoints) {
        this.#renderPoint(element);
      }
    }
  };

  #renderPoint = (point) => {
    const pointComponent = new NewTripListPointTemplateView(point);
    const pointEditComponent = new NewEditPointTemplateView(point);

    #replaceCardToPoint() {
      replace(pointComponent, pointEditComponent);
      document.removeEventListener('keydown', this.#escKeyDownHandler);
      this.#mode = Mode.DEFAULT;
    };

    #replacePointToCard() {
      replace(pointEditComponent, pointComponent);
      document.addEventListener('keydown', this.#escKeyDownHandler);
      this.#changeMode();
      this.#mode = Mode.EDIT;
    };

    #escKeyDownHandler(evt) {
      if (evt.key === 'Escape' || evt.key === 'Esc') {
        evt.preventDefault();
        this.#replacePointToCard();
      }
    };

    #handleFormClick() {
      this.#replaceCardToPoint();
    }

    pointComponent.setButtonClickHandler(() => {
      replaceCardToPoint();

    });

    pointEditComponent.setButtonClickHandler(() => {
      replaceFormToCard();

    });

    pointEditComponent.setFormSubmitHandler(() => {
      replaceFormToCard();
      document.removeEventListener('keydown', onEscKeyDown);
    });

    render(pointComponent, this.#listComponent);
  };
}
