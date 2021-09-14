import AbstractView from './abstract-view.js';

const createNoTaskTemplate = () => (
  '<p class="trip-events__msg">Loading...</p>'
);

class LoadingView extends AbstractView {
  getTemplate() {
    return createNoTaskTemplate();
  }
}

export default LoadingView;
