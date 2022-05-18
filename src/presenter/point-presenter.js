import { render } from '../framework/render';
import EventsEmpty from '../view/events-empty';
import NewTripListPointTemplateView from '../view/trip-list-point-view';
import NewTripListTemplateView from '../view/trip-list-view';
import NewTripSortTemplateView from '../view/trip-sort-view';

export default class PointPresenter {
  #pointListComponent = new NewTripListTemplateView();
  #listComponent = this.#pointListComponent.element;

  #pointsContainer = null;
  #changeData = null;
  #changeMode = null;

  #pointComponent = null;
  #pointEditComponent = null;

  #pointModel = null;
  #arrPoints = [];

  constructor(pointsContainer, changeData, changeMode) {
    this.#pointsContainer = pointsContainer;
    this.#changeData = changeData;
    this.#changeMode = changeMode;
  }

  init(pointModel) {
    this.#pointModel = pointModel;
    this.#arrPoints = [...this.#pointModel.points];

    if (this.#arrPoints.length === 0) {
      render(new EventsEmpty, this.#pointsContainer);
    } else {
      render(new NewTripSortTemplateView, this.#pointsContainer);
      render(this.#pointListComponent, this.#pointComponent);

      for (const element of this.#arrPoints) {
        this.#renderPoint(element);
      }
    }
  }

  #renderPoint = (point) => {
    this.#pointComponent = new NewTripListPointTemplateView(point);
  }
}
