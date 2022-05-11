/* eslint-disable quotes */
import { render } from "./render.js";
import NewAboutTripTemplate from "./view/trip-info-view.js";
import NewTripFiltersTemplateView from "./view/trip-filters-view.js";
import NewTripSortTemplateView from "./view/trip-sort-view.js";

const pageHeader = document.querySelector('.page-header');
const tripMainElement = pageHeader.querySelector('.trip-main');
const tripControlsElement = pageHeader.querySelector('.trip-controls__filters');
const pageMain = document.querySelector('.page-body__page-main');
const tripEventsSection = pageMain.querySelector('.trip-events');

render(new NewAboutTripTemplate(), tripMainElement);
render(new NewTripFiltersTemplateView(), tripControlsElement);
render(new NewTripSortTemplateView(), tripEventsSection);
