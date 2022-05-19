import { SortType } from '../consts';
import { render } from '../framework/render';
import { updateItem } from '../utils/common';
import { calcDuration } from '../utils/point';
import EventsEmpty from '../view/events-empty.js';
import NewTripListTemplateView from '../view/trip-list-view.js';
import NewTripSortTemplateView from '../view/trip-sort-view';
import PointPresenter from './point-presenter';

export default class TripPresenter {
  #pointListComponent = new NewTripListTemplateView();
  #pointSort = new NewTripSortTemplateView();

  #tripEvents = null;
  #pointPresenter = {};
  #currentSortType = SortType.DAY;
  #arrPoints = {};

  constructor(tripEvents) {
    this.#tripEvents = tripEvents;
  }

  init = (arrPoints) => {
    this.#arrPoints = arrPoints.slice();

    render(this.#pointListComponent, this.#tripEvents);

    this.#renderBoard();
  };

  #renderPoint(tripPoint) {
    const pointPresenter = new PointPresenter(this.#tripEvents, this.#handlePointChange, this.#handleModeChange);

    pointPresenter.init(tripPoint);

    this.#pointPresenter[tripPoint.id] = pointPresenter;
  }

  #renderPoints() {
    this.#arrPoints.forEach((item) => this.#renderPoint(item));
  }

  #renderEmpty() {
    render(new EventsEmpty(), this.#tripEvents);
  }

  #renderList() {
    if (!this.arrPoints.length) {
      this.#renderEmpty();
      return;
    }

    this.#renderPoints();
  }

  #clearList() {
    Object
      .values(this.#pointPresenter)
      .forEach((presenter) => presenter.destroy());
    this.#pointPresenter = {};
  }

  #renderSort() {
    render(this.#pointSort, this.#tripEvents);
    this.#pointSort.setSortTypeChangeHandler(this.#handleSortTypeChange);
  }

  #sortPoints(sortType) {
    switch (sortType) {
      case SortType.DAY:
        this.#arrPoints.sort((a, b) => a.dateFrom - b.dateFrom);
        break;
      case SortType.TIME:
        this.#arrPoints.sort((a, b) => calcDuration(a) - calcDuration(b));
        break;
      case SortType.PRICE:
        this.#arrPoints.sort((a, b) => a.basePrice - b.basePrice);
        break;
      default:
        this.#arrPoints.sort((a, b) => a.dateFrom - b.dateFrom);
    }

    this.#currentSortType = sortType;
  }

  #renderBoard() {
    this.#renderSort();

    this.#renderList();
  }

  #handlePointChange(updatedPoint) {
    this.#arrPoints = updateItem(this.#arrPoints, updatedPoint);
    this.#pointPresenter[updatedPoint.id].init(updatedPoint);
  }

  #handleModeChange() {
    Object
      .values(this.#pointPresenter)
      .forEach((presenter) => presenter.resetView());
  }

  #handleSortTypeChange(sortType) {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#sortPoints(sortType);
    this.#clearList();
    this.#renderList();
  }
}
