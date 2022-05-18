import { render, replace } from '../framework/render.js';
import EventsEmpty from '../view/events-empty.js';
import NewEditPointTemplateView from '../view/trip-edit-point-view.js';
import NewTripListPointTemplateView from '../view/trip-list-point-view.js';
import NewTripListTemplateView from '../view/trip-list-view.js';
import NewTripSortTemplateView from '../view/trip-sort-view.js';

export default class TripPresenter {
  #pointListComponent = new NewTripListTemplateView();
  #listComponent = this.#pointListComponent.element;

  // #pointModel = null;
  #tripEvents = null;
  #arrPoints = [];

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

    const replaceCardToForm = () => {
      replace(pointEditComponent, pointComponent);
    };

    const replaceFormToCard = () => {
      replace(pointComponent, pointEditComponent);
    };

    const onEscKeyDown = (evt) => {
      if (evt.key === 'Escape' || evt.key === 'Esc') {
        evt.preventDefault();
        replaceFormToCard();
        document.removeEventListener('keydown', onEscKeyDown);
      }
    };

    pointComponent.setButtonClickHandler(() => {
      replaceCardToForm();
      document.addEventListener('keydown', onEscKeyDown);
    });

    pointEditComponent.setButtonClickHandler(() => {
      replaceFormToCard();
      document.removeEventListener('keydown', onEscKeyDown);
    });

    pointEditComponent.setFormSubmitHandler(() => {
      replaceFormToCard();
      document.removeEventListener('keydown', onEscKeyDown);
    });

    render(pointComponent, this.#listComponent);
  };
}
