const gallerySection = (photos = []) => {
  const images = photos
    .map(
      (photo) => `<img class="event__photo" src=${photo.src} alt="Event photo">`,
    )
    .join('');

  const gallery = images.length
    ? `<div class="event__photos-container">
                                        <div class="event__photos-tape">
                                            ${images}
                                        </div>
                                    </div>`
    : '';

  return gallery;
};

export { gallerySection };
