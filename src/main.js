import { render } from './framework/render.js';
import { FilterType } from './consts.js';
import NewAboutTripTemplate from './view/trip-info-view.js';
import TripPresenter from './presenter/trip-presenter.js';
import PointModel from './model/point-model.js';
import NewEventButtonView from './view/new-event-button.js';
import FilterModel from './model/filter-model.js';
import FilterPresenter from './presenter/filter-presenter.js';
import SiteControls from './view/site-controls.js';
import NewTripFiltersTemplateView from './view/trip-filters-view.js';
import PointsApiService from './points-api-service.js';

const AUTHORIZATION = 'basic mcb12jjklkvfi';
const END_POINT = 'https://17.ecmascript.pages.academy/big-trip/points';

const pageHeader = document.querySelector('.page-header');
const tripMainElement = pageHeader.querySelector('.trip-main__trip-info');
const tripControlsElement = pageHeader.querySelector('.trip-controls__filters');
const tripMain = pageHeader.querySelector('.trip-main');
const pageMain = document.querySelector('.page-body__page-main');
const tripEventsSection = pageMain.querySelector('.trip-events');

const pointModel = new PointModel(new PointsApiService(END_POINT, AUTHORIZATION));
const filterModel = new FilterModel();
const siteControls = new SiteControls();
const tripPresenter = new TripPresenter(tripEventsSection, pointModel, filterModel);
const filterPresenter = new FilterPresenter(siteControls, filterModel, pointModel);

render(new NewAboutTripTemplate(pointModel), tripMainElement);
render(new NewTripFiltersTemplateView(FilterType.EVERYTHING), tripControlsElement);
render(new NewEventButtonView(), tripMain);

tripPresenter.init();
filterPresenter.init();

document.querySelector('.trip-main__event-add-btn').addEventListener('click', (evt) => {
  evt.preventDefault();
  tripPresenter.createEvent();
});
