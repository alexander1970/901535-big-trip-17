import { render } from './framework/render.js';
import NewAboutTripTemplate from './view/trip-info-view.js';
import TripPresenter from './presenter/trip-presenter.js';
import PointModel from './model/point-model.js';
import NewEventButtonView from './view/new-event-button.js';
import FilterModel from './model/filter-model.js';
import FilterPresenter from './presenter/filter-presenter.js';
import SiteControls from './view/site-controls.js';
import NewTripFiltersTemplateView from './view/trip-filters-view.js';

const pageHeader = document.querySelector('.page-header');
const tripMainElement = pageHeader.querySelector('.trip-main__trip-info');
const tripControlsElement = pageHeader.querySelector('.trip-controls__filters');
const tripMain = pageHeader.querySelector('.trip-main');
const pageMain = document.querySelector('.page-body__page-main');
const tripEventsSection = pageMain.querySelector('.trip-events');

const pointModel = new PointModel();
const filterModel = new FilterModel();

const tripPresenter = new TripPresenter(tripEventsSection, pointModel, filterModel);
const filterPresenter = new FilterPresenter(new SiteControls(), filterModel, pointModel);

render(new NewAboutTripTemplate(pointModel), tripMainElement);
render(new NewTripFiltersTemplateView(), tripControlsElement);
render(new NewEventButtonView(), tripMain);

tripPresenter.init();
filterPresenter.init();

document.querySelector('.trip-main__event-add-btn').addEventListener('click', (evt) => {
  evt.preventDefault();
  tripPresenter.createEvent();
});
