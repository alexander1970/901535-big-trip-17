import { render } from './framework/render.js';
import TripPresenter from './presenter/trip-presenter.js';
import PointModel from './model/point-model.js';
import NewPointButtonView from './view/new-point-button.js';
import FilterModel from './model/filter-model.js';
import FilterPresenter from './presenter/filter-presenter.js';
import PointsApiService from './points-api-service.js';
import InfoPresenter from './presenter/info-presenter.js';

const AUTHORIZATION = 'Basic mcb12jjklkvfi54';
const END_POINT = 'https://17.ecmascript.pages.academy/big-trip';

const pageHeader = document.querySelector('.page-header');
const pageMain = document.querySelector('.page-main');
const tripMain = pageHeader.querySelector('.trip-main');
const tripInfo = tripMain.querySelector('.trip-info');
const siteControls = pageHeader.querySelector('.trip-controls__filters');
const tripEventsSection = pageMain.querySelector('.trip-events');

const pointModel = new PointModel(new PointsApiService(END_POINT, AUTHORIZATION));
const filterModel = new FilterModel();
const addNewPointButton = new NewPointButtonView();

const tripPresenter = new TripPresenter(tripEventsSection, pointModel, filterModel);
const filterPresenter = new FilterPresenter(siteControls, filterModel, pointModel);
const infoPresenter = new InfoPresenter(tripInfo, pointModel);

const handleNewTaskFormClose = () => {
  addNewPointButton.element.disabled = false;
};

const handleNewPointButtonClick = () => {
  tripPresenter.createPoint(handleNewTaskFormClose);
  addNewPointButton.element.disabled = true;
};

tripPresenter.init();
filterPresenter.init();
infoPresenter.init();
pointModel.init()
  .finally(() => {
    render(addNewPointButton, tripMain);
    addNewPointButton.setClickHandler(handleNewPointButtonClick);
  });
