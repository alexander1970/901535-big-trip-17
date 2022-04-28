/* eslint-disable quotes */
import { render } from "./render.js";
import NewAboutTripTemplate from "./view/trip-info-view.js";
import NewTripFiltersTemplateView from "./view/trip-filters-view.js";
import NewTripSortTemplateView from "./view/trip-sort-view.js";
import NewTripListTemplateView from "./view/trip-list-view.js";
import NewNewPointTemplateView from "./view/trip-new-point-view.js";
import NewEditPointTemplateView from "./view/trip-edit-point-view.js";
import NewTripPointTemplateView from "./view/trip-point-view.js";

const POIN_COUNT = 3;

const pageHeader = document.querySelector('.page-header');
const tripMainElement = pageHeader.querySelector('.trip-main__trip-info');
const tripControlsElement = pageHeader.querySelector('.trip-controls__filters');
const pageMain = document.querySelector('.page-body__page-main');
const tripEventsSection = pageMain.querySelector('.trip-events');
const tripList = tripEventsSection.querySelector('.trip-events__list');

render(new NewAboutTripTemplate(), tripMainElement);
render(new NewTripFiltersTemplateView(), tripControlsElement);
render(new NewTripSortTemplateView(), tripEventsSection);
render(new NewTripListTemplateView(), tripEventsSection);

for (let i = 0; i < POIN_COUNT; i++) {
  render(new NewTripPointTemplateView(), tripList);
}

render(new NewNewPointTemplateView(), tripList);
render(new NewEditPointTemplateView(), tripList);
