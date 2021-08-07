import { createElement } from '../utils';

const createGallerySectionTemplate = (photos = []) => {
  const images = photos.map((photo) => `<img class="event__photo" src=${photo.src} alt="Event photo">`).join('');

  return `<div class="event__photos-container">
              <div class="event__photos-tape">
                  ${images}
              </div>
            </div>`;
};

class GallerySectionView {
  constructor(photos = []) {
    this._photos = photos;
    this._element = null;
  }

  getTemplate() {
    return createGallerySectionTemplate(this._photos);
  }

  getElement() {
    if (!this._element && this._photos.length) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}

export default GallerySectionView;
