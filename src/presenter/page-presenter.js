import { render } from '../render.js';
import EventsEmpty from '../view/events-empty.js';
import NewEditPointTemplateView from '../view/trip-edit-point-view.js';
import NewTripListPointTemplateView from '../view/trip-list-point-view.js';
import NewTripListTemplateView from '../view/trip-list-view.js';
import NewTripSortTemplateView from '../view/trip-sort-view.js';

export default class PagePresenter {
  #pointListComponent = new NewTripListTemplateView();
  #listComponent = this.#pointListComponent.element;

  #pointModel = null;
  #tripEvents = null;
  #arrPoints = [];

  init = (tripEvents, pointModel) => {
    this.#tripEvents = tripEvents;
    this.#pointModel = pointModel;
    this.#arrPoints = [...this.#pointModel.points];

    render(new NewTripSortTemplateView(), this.#tripEvents);
    render(this.#pointListComponent, this.#tripEvents);

    if (this.#arrPoints.length === 0) {
      render(new EventsEmpty, this.#tripEvents);
    } else {
      for (const element of this.#arrPoints) {
        this.#renderPoint(element);
      }
    }
  };

  #renderPoint = (point) => {
    const pointComponent = new NewTripListPointTemplateView(point);
    const pointEditComponent = new NewEditPointTemplateView(point);

    const replaceCardToForm = () => {
      this.#listComponent.replaceChild(pointEditComponent.element, pointComponent.element);
    };

    const replaceFormToCard = () => {
      this.#listComponent.replaceChild(pointComponent.element, pointEditComponent.element);
    };

    const onEscKeyDown = (evt) => {
      if (evt.key === 'Escape' || evt.key === 'Esc') {
        evt.preventDefault();
        replaceFormToCard();
        document.removeEventListener('keydown', onEscKeyDown);
      }
    };

    pointComponent.element.querySelector('.event__rollup-btn').addEventListener('click', () => {
      replaceCardToForm();
      document.addEventListener('keydown', onEscKeyDown);
    });

    pointEditComponent.element.querySelector('.event__rollup-btn').addEventListener('click', () => {
      replaceFormToCard();
      document.removeEventListener('keydown', onEscKeyDown);
    });

    pointEditComponent.element.querySelector('form').addEventListener('submit', (evt) => {
      evt.preventDefault();
      replaceFormToCard();
      document.removeEventListener('keydown', onEscKeyDown);
    });

    render(pointComponent, this.#listComponent);
  };
}
