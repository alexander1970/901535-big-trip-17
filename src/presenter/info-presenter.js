import { remove, render, RenderPosition, replace } from '../framework/render';
import TripInfo from '../view/trip-info-view';

export default class InfoPresenter {
  #container = null;
  #pointsModel = null;

  #infoComponent = null;

  constructor(container, pointsModel) {
    this.#container = container;
    this.#pointsModel = pointsModel;

    this.#pointsModel.addObserver(this.#modelEventHandler);
  }

  init = () => {
    const points = this.points;
    const prevInfoComponent = this.#infoComponent;

    this.#infoComponent = new TripInfo(points);

    if (prevInfoComponent === null) {
      render(this.#infoComponent, this.#container, RenderPosition.AFTERBEGIN);
      return;
    }

    replace(prevInfoComponent, this.#infoComponent);
    remove(prevInfoComponent);
  };

  get points() {
    return this.#pointsModel.points;
  }

  #modelEventHandler = () => {
    this.init();
  };
}
