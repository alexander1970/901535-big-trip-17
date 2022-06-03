import NewAboutTripTemplate from './view/trip-info-view.js';
import TripPresenter from './presenter/trip-presenter.js';
import PointModel from './model/point-model.js';
import NewEventButtonView from './view/new-event-button.js';
import { render } from './framework/render.js';
import { getSortedPoints } from './utils/sort.js';
import { SortType } from './consts.js';
import Filter from './model/filter-model.js';
import Filters from './presenter/filter-presenter.js';
import SiteControls from './view/site-controls.js';

const pageHeader = document.querySelector('.page-header');
const tripMainElement = pageHeader.querySelector('.trip-main__trip-info');
const tripControlsElement = pageHeader.querySelector('.trip-controls__filters');
const tripMain = pageHeader.querySelector('.trip-main');
const pageMain = document.querySelector('.page-body__page-main');
const tripEventsSection = pageMain.querySelector('.trip-events');

const pointModel = new PointModel();
const pointSorted = getSortedPoints([...pointModel.points], SortType.DAY);
const filterModel = new Filter();
const siteControls = new SiteControls();

const tripPresenter = new TripPresenter(tripEventsSection, pointModel, filterModel);
const filterPresenter = new Filters(siteControls, pointModel, filterModel);

render(new NewAboutTripTemplate(pointSorted), tripMainElement);
render(siteControls, tripControlsElement);
render(new NewEventButtonView(), tripMain);

tripPresenter.init();
filterPresenter.init();

document.querySelector('.trip-main__event-add-btn').addEventListener('click', (evt) => {
  evt.preventDefault();
  tripPresenter.createEvent();
});
