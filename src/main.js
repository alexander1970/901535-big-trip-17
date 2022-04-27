import { render } from './render.js';
import { createTripFiltersTemplate } from './view/trip-filters-view.js';

const tripControlsElement = document.querySelector('.trip-controls__filters');

render(tripControlsElement, createTripFiltersTemplate(), 'afterbegin');
