import AbstractView from '../framework/view/abstract-view';

const createSiteControls = () => '<div class="trip-main__trip-controls  trip-controls"></div>';

export default class SiteControls extends AbstractView {
  get template() {
    return createSiteControls();
  }
}
