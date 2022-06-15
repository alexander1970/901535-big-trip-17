import { render } from './framework/render.js';
import NewAboutTripTemplate from './view/trip-info-view.js';
import TripPresenter from './presenter/trip-presenter.js';
import PointModel from './model/point-model.js';
import NewEventButtonView from './view/new-event-button.js';
import FilterModel from './model/filter-model.js';
import FilterPresenter from './presenter/filter-presenter.js';
import SiteControls from './view/site-controls.js';
import PointsApiService from './points-api-service.js';

const AUTHORIZATION = 'basic mcb12jjklkvfi';
const END_POINT = 'https://17.ecmascript.pages.academy/big-trip/points';

const pageHeader = document.querySelector('.page-header');
const pageMain = document.querySelector('.page-main');
const tripMain = pageHeader.querySelector('.trip-main');
const tripEventsSection = pageMain.querySelector('.trip-events');

const pointModel = new PointModel(new PointsApiService(END_POINT, AUTHORIZATION));
const filterModel = new FilterModel();

const siteControls = new SiteControls();
const tripPresenter = new TripPresenter(tripEventsSection, pointModel, filterModel);
const filterPresenter = new FilterPresenter(siteControls, filterModel, pointModel);

render(new NewAboutTripTemplate(pointModel), tripMain);
render(new NewEventButtonView(), tripMain);

tripPresenter.init();
filterPresenter.init();
pointModel.init();

document.querySelector('.trip-main__event-add-btn').addEventListener('click', (evt) => {
  evt.preventDefault();
  tripPresenter.createEvent();
});
