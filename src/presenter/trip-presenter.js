import { SortType, UpdateType, UserAction } from '../consts';
import { remove, render } from '../framework/render';
import { filter } from '../utils/filter ';
import { calcDuration } from '../utils/point';
import EventsEmpty from '../view/events-empty';
import NewTripListTemplateView from '../view/trip-list-view';
import NewTripSortTemplateView from '../view/trip-sort-view';
import PointAddPresenter from './point-add-presenter';
import PointPresenter from './point-presenter';

export default class TripPresenter {
  #pointEmpty = new EventsEmpty();
  #pointListComponent = new NewTripListTemplateView();
  #listComponent = this.#pointListComponent.element;
  #pointAddPresenter = new PointAddPresenter(this.#listComponent, this.#handleViewAction);

  #listContainer = null;
  #pointsModel = null;
  #filterModel = null;
  #pointSort = null;
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
    const pointPresenter = new PointPresenter(this.#listComponent, this.#handleViewAction, this.#handleModeChange);
    pointPresenter.init(point);
    this.#pointPresenter[point.id] = pointPresenter;
  };

  #renderPoints = (points) => {
    points.forEach((item) => this.#renderPoint(item));
  };

  #renderEmpty = () => {
    render(new EventsEmpty(), this.#listComponent);
  };

  #renderList = () => {
    render(this.#listComponent, this.#pointListComponent);
  };

  #renderBoard = () => {
    const points = this.points;

    if (!points.length) {
      this.#renderEmpty();
      return;
    }

    this.#renderSort();
    this.#renderList();
    this.#renderPoints(points);
  };

  #clearBoard = ({resetSortType = false} = {}) => {
    this.#pointAddPresenter.destroy();

    Object
      .values(this.#pointPresenter)
      .forEach((presenter) => presenter.destroy());
    this.#pointPresenter = {};

    remove(this.#pointSort);
    remove(this.#pointEmpty);

    if (resetSortType) {
      this.#currentSortType = SortType.DAY;
    }
  };

  #renderSort = () => {
    if (this.#pointSort !== null) {
      this.#pointSort = null;
    }
    this.#pointSort = new NewTripSortTemplateView();
    this.#pointSort.setSortTypeChangeHandler(this.#handleSortTypeChange);

    render(this.#pointSort, this.#listComponent);
  };

  #handleViewAction = (actionType, updateType, update) => {
    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this.#pointsModel.updatePoint(updateType, update);
        break;
      case UserAction.ADD_POINT:
        this.#pointsModel.addPoint(updateType, update);
        break;
      case UserAction.DELETE_POINT:
        this.#pointsModel.deletePoint(updateType, update);
    }
  };

  #handleModelPoint = (updateType, data) => {
    switch (updateType) {
      case UpdateType.PATCH:
        this.#pointPresenter[data.id].init(data);
        break;
      case UpdateType.MINOR:
        this.#clearBoard();
        this.#renderBoard();
        break;
      case UpdateType.MAJOR:
        this.#clearBoard({resetSortType: true});
        this.#renderBoard();
        break;
    }
  };

  #handleModeChange = () => {
    this.#pointAddPresenter.destroy();

    Object
      .values(this.#pointPresenter)
      .forEach((presenter) => presenter.resetView());
  };

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#currentSortType = sortType;
    this.#clearBoard();
    this.#renderBoard();
  };
}
