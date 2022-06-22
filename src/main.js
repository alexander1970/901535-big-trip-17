import { render } from './framework/render.js';
import NewAboutTripTemplate from './view/trip-info-view.js';
import TripPresenter from './presenter/trip-presenter.js';
import PointModel from './model/point-model.js';
import NewPointButtonView from './view/new-point-button.js';
import FilterModel from './model/filter-model.js';
import FilterPresenter from './presenter/filter-presenter.js';
import PointsApiService from './points-api-service.js';

const AUTHORIZATION = 'Basic mcb12jjklkvfi54';
const END_POINT = 'https://17.ecmascript.pages.academy/big-trip';

const pageHeader = document.querySelector('.page-header');
const pageMain = document.querySelector('.page-main');
const tripMain = pageHeader.querySelector('.trip-main');
const siteControls = pageHeader.querySelector('.trip-controls__filters');
const tripEventsSection = pageMain.querySelector('.trip-events');

const apiServer = new PointsApiService(END_POINT, AUTHORIZATION);
const pointModel = new PointModel(apiServer);
const filterModel = new FilterModel();
const tripPresenter = new TripPresenter(tripEventsSection, pointModel, filterModel);
const filterPresenter = new FilterPresenter(siteControls, filterModel, pointModel);
const newPointButtonComponent = new NewPointButtonView();

// const handleNewPointFormClose = () => {
//   newPointButtonComponent.element.disabled = false;
// };

// const handleNewPointButtonClick = () => {
//   tripPresenter.createPoint(handleNewPointFormClose);
//   newPointButtonComponent.element.disabled = true;
// };

render(new NewAboutTripTemplate(pointModel), tripMain);
render(newPointButtonComponent, tripMain);

filterPresenter.init();
tripPresenter.init();
pointModel.init();
// .finally(() => {
//   render(newPointButtonComponent, tripMain);
//   newPointButtonComponent.setClickHandler(handleNewPointButtonClick);
// });
