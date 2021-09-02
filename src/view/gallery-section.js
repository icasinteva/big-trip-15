import AbstractView from './abstract';

const createGallerySectionTemplate = (pictures = []) => {
  const images = pictures.map((photo) => `<img class="event__photo" src=${photo.src} alt="Event photo">`).join('');

  return `<div class="event__photos-container">
              <div class="event__photos-tape">
                  ${images}
              </div>
            </div>`;
};

class GallerySectionView extends AbstractView {
  constructor(pictures = []) {
    super();
    this._pictures = pictures;
  }

  getTemplate() {
    return createGallerySectionTemplate(this._pictures);
  }
}

export default GallerySectionView;
