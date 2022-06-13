import { FilterType, SortType, UpdateType, UserAction } from '../consts';
import { remove, render, RenderPosition } from '../framework/render';
import { filter } from '../utils/filter ';
import { calcDuration } from '../utils/point';
import EventsEmpty from '../view/events-empty';
import LoadingView from '../view/loading-view';
import PointList from '../view/point-list';
import NewTripSortTemplateView from '../view/trip-sort-view';
import PointAddPresenter from './point-add-presenter';
import PointPresenter from './point-presenter';

export default class TripPresenter {
  #listContainer = null;
  #pointsModel = null;
  #filterModel = null;
  #pointSort = null;

  #pointList = new PointList();
  #pointEmpty = new EventsEmpty();
  #loadingComponent = new LoadingView();
  #pointPresenter = new Map();
  #pointAddPresenter = new Map();
  #currentSortType = SortType.DAY;
  #filterType = FilterType.EVERYTHING;
  #isLoading = true;

  constructor(listContainer, pointsModel, filterModel) {
    this.#listContainer = listContainer;
    this.#pointsModel = pointsModel;
    this.#filterModel = filterModel;

    this.#pointAddPresenter = new PointAddPresenter(this.#pointList, this.#handleViewAction);

    this.#pointsModel.addObserver(this.#handleModelPoint);
    this.#filterModel.addObserver(this.#handleModelPoint);
  }

  get points() {
    const filterType = this.#filterModel.filter;
    const points = [...this.#pointsModel.points];
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

  createPoint = () => {
    this.#currentSortType = SortType.DAY;
    this.#filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
    this.#pointAddPresenter.init();
  };

  #renderPoint = (point) => {
    const pointPresenter = new PointPresenter(this.#pointList.element, this.#handleViewAction, this.#handleModeChange);
    pointPresenter.init(point);
    this.#pointPresenter.set(point.id, pointPresenter);
    this.#pointPresenter[point.id] = pointPresenter;
  };

  #renderPoints = (points) => {
    points.forEach((item) => this.#renderPoint(item));
  };

  #renderLoading = () => {
    render(this.#loadingComponent, this.#pointList.element, RenderPosition.AFTERBEGIN);
  };

  #renderEmpty = () => {
    render(new EventsEmpty(), this.#pointList);
  };

  #renderList = () => {
    render(this.#pointList, this.#listContainer);
  };

  #renderBoard = () => {
    if (this.#isLoading) {
      this.#renderLoading();
      return;
    }

    const points = this.points;

    if (!points.length) {
      this.#renderEmpty();
      return;
    }

    this.#renderList();
    this.#renderSort();
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
    remove(this.#pointList);
    remove(this.#loadingComponent);

    if (resetSortType) {
      this.#currentSortType = SortType.DAY;
    }
  };

  #renderSort = () => {
    if (this.#pointSort !== null) {
      this.#pointSort = null;
    }
    this.#pointSort = new NewTripSortTemplateView(this.#currentSortType);
    this.#pointSort.setSortTypeChangeHandler(this.#handleSortTypeChange);

    render(this.#pointSort, this.#listContainer);
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
        this.#pointPresenter.get(data.id).init(data);
        break;
      case UpdateType.MINOR:
        this.#clearBoard();
        this.#renderBoard();
        break;
      case UpdateType.MAJOR:
        this.#clearBoard({resetSortType: true});
        this.#renderBoard();
        break;
      case UpdateType.INIT:
        this.#isLoading = false;
        remove(this.#loadingComponent);
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
