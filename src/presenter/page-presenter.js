import { render } from '../render.js';
import NewEditPointTemplateView from '../view/trip-edit-point-view.js';
import NewTripListPointTemplateView from '../view/trip-list-point-view.js';
import NewTripListTemplateView from '../view/trip-list-view.js';
import NewNewPointTemplateView from '../view/trip-new-point-view.js';
import NewTripSortTemplateView from '../view/trip-sort-view.js';

export default class PagePresenter {
  pointListComponent = new NewTripListTemplateView();

  init = (tripEvents, pointModel) => {
    this.tripEvents = tripEvents;
    this.pointModel = pointModel;
    this.arrPoints = [...this.pointModel.getPoints()];

    render(new NewTripSortTemplateView(), this.tripEvents);
    render(this.pointListComponent, this.tripEvents);

    for (const element of this.arrPoints) {
      render(new NewTripListPointTemplateView(element), this.pointListComponent.getElement());
    }

    render(new NewNewPointTemplateView(), this.pointListComponent.getElement());
    render(new NewEditPointTemplateView(), this.pointListComponent.getElement());
  };
}
