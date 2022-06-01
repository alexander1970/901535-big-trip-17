import { SortType, UpdateType } from '../consts';
import { render } from '../framework/render';
import { updateItem } from '../utils/common';
import { filter } from '../utils/filter ';
import { calcDuration } from '../utils/point';
import EventsEmpty from '../view/events-empty.js';
import NewTripListTemplateView from '../view/trip-list-view.js';
import NewTripSortTemplateView from '../view/trip-sort-view';
import PointPresenter from './point-presenter';

export default class TripPresenter {
  #pointSort = new NewTripSortTemplateView();
  #pointListComponent = new NewTripListTemplateView();
  #listComponent = this.#pointListComponent.element;

  #listContainer = null
  #pointsModel = null;
  #filterModel = null
  #pointPresenter = new Map();
  #currentSortType = SortType.DAY;

  constructor(listContainer, pointsModel, filterModel) {
    this.#listContainer = listContainer;
    this.#pointsModel = pointsModel;
    this.#filterModel = filterModel;

    this.#pointsModel.addObserver(this.#handleModelPoint);
  }

  get points() {
    const filterType = this.#filterModel.filter;
    const points = this.#pointsModel.points;
    const filteredPoints = filter[filterType](points);

    switch (this.#currentSortType) {
      case SortType.DAY:
        return filteredPoints.sort((a, b) => a.dateFrom - b.dateFrom);
      case SortType.TIME:
        return filteredPoints.sort((a, b) => calcDuration(a) - calcDuration(b));
      case SortType.PRICE:
        return filteredPoints.sort((a, b) => a.basePrice - b.basePrice);
      default:
        return filteredPoints;
    }
  }

  init = () => {
    this.#renderBoard();
  };

  #renderPoint = (point) => {
    const pointPresenter = new PointPresenter(this.#listComponent, this.#handlePointChange, this.#handleModeChange);
    pointPresenter.init(point);
    this.#pointPresenter[point.id] = pointPresenter;
  };

  #renderPoints = (points) => {
    points.forEach((item) => this.#renderPoint(item));
  };

  #renderEmpty = () => {
    render(new EventsEmpty(), this.#tripEvents);
  };

  #renderList = () => {
    if (!this.#arrPoints.length) {
      this.#renderEmpty();
      return;
    }

    this.#renderPoints();
  };

  #clearList = () => {
    Object
      .values(this.#pointPresenter)
      .forEach((presenter) => presenter.destroy());
    this.#pointPresenter = {};
  };

  #renderSort = () => {
    render(this.#pointSort, this.#listComponent);
    this.#pointSort.setSortTypeChangeHandler(this.#handleSortTypeChange);
  };

  #renderBoard = () => {
    this.#renderSort();
    this.#renderList();
  };

  #handlePointChange = (updatedPoint) => {
    this.#arrPoints = updateItem(this.#arrPoints, updatedPoint);
    this.#pointPresenter[updatedPoint.id].init(updatedPoint);
  };

  #handleModelPoint = (updateType, data) => {
    switch (updateType) {
      case UpdateType.PATCH:
        this.#pointPresenter[data.id].init(data);
        break;
      case UpdateType.MINOR:
        this.
        break;
    }
  };

  #handleModeChange = () => {
    Object
      .values(this.#pointPresenter)
      .forEach((presenter) => presenter.resetView());
  };

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#currentSortType = sortType;
    this.#clearList();
    this.#renderList();
  };
}
