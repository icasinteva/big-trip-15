import AbstractView from './abstract';

const createSiteNavigationTemplate = () => `<nav class="trip-controls__trip-tabs  trip-tabs">
                <a class="trip-tabs__btn  trip-tabs__btn--active" href="#">Table</a>
                <a class="trip-tabs__btn" href="#">Stats</a>
              </nav>`;

class SiteNavigationView extends AbstractView{
  getTemplate() {
    return createSiteNavigationTemplate();
  }
}

export default SiteNavigationView;
