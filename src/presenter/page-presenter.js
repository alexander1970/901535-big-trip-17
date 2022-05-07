import { render } from "../render.js";
import NewEditPointTemplateView from "../view/trip-edit-point-view.js";
import NewTripListTemplateView from "../view/trip-list-view.js";
import NewNewPointTemplateView from "../view/trip-new-point-view.js";
import NewTripSortTemplateView from "../view/trip-sort-view.js";

export default class PagePresenter {
  pointListComponent = new NewTripListTemplateView();

  init = (tripEvents, pointModel) => {
    this.tripEvents = tripEvents;
    this.pointModel = pointModel;
    this.arrPoints = [...this.pointModel.getPoints()];

    render(new NewTripSortTemplateView(), this.tripEvents);
    // render(new NewTripListTemplateView(), this.pointListComponent.getElement());

    for (let i = 0; i < this.arrPoints.length; i++) {
      render(new NewTripListTemplateView(this.arrPoints[i]), this.pointListComponent.getElement());
    };

    // render(new NewNewPointTemplateView(), this.tripEvents);
    // render(new NewEditPointTemplateView(), this.tripEvents);
  };
};
