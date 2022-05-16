import NewAboutTripTemplate from './view/trip-info-view.js';
import NewTripFiltersTemplateView from './view/trip-filters-view.js';
import PagePresenter from './presenter/page-presenter.js';
import PointModel from './model/point-model.js';
import NewEventButtonView from './view/new-event-button.js';
import { render } from './framework/render.js';
// import { getSortedPoints, SortType } from './utils/sort.js';

const pageHeader = document.querySelector('.page-header');
const tripMainElement = pageHeader.querySelector('.trip-main__trip-info');
const tripControlsElement = pageHeader.querySelector('.trip-controls__filters');
const tripMain = pageHeader.querySelector('.trip-main');
const pageMain = document.querySelector('.page-body__page-main');
const tripEventsSection = pageMain.querySelector('.trip-events');
const pagePresenter = new PagePresenter();
const pointModel = new PointModel();
// const pointSorted = getSortedPoints(pointModel, SortType.DAY);

render(new NewAboutTripTemplate(pointModel), tripMainElement);
render(new NewTripFiltersTemplateView(), tripControlsElement);
render(new NewEventButtonView(), tripMain);

pagePresenter.init(tripEventsSection, pointModel);
