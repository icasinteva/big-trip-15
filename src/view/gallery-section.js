import AbstractView from './abstract';

const createGallerySectionTemplate = (photos = []) => {
  const images = photos.map((photo) => `<img class="event__photo" src=${photo.src} alt="Event photo">`).join('');

  return `<div class="event__photos-container">
              <div class="event__photos-tape">
                  ${images}
              </div>
            </div>`;
};

class GallerySectionView extends AbstractView {
  constructor(photos = []) {
    super();
    this._photos = photos;
  }

  getTemplate() {
    return createGallerySectionTemplate(this._photos);
  }
}

export default GallerySectionView;
