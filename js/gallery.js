import { showPicture } from './big-picture';
import { renderThumbnails } from './thumbnail';

const container = document.querySelector('.pictures');

const renderGellary = (pictures) => {
  container.addEventListener('click', (evt) => {
    const thumbnail = evt.target.closest('[data-thumbnail-id]');

    if (! thumbnail) {
      return;
    }

    evt.preventDefault();
    const thumbnailId = + thumbnail.dataset.thumbnailId;
    const pictureDate = pictures.find(({id}) => id === thumbnailId);

    showPicture(pictureDate);
  });

  renderThumbnails(pictures, container);
};

export {renderGellary};
