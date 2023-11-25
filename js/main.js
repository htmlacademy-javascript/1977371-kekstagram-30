import { getPictures } from './api.js';
import { renderGellary } from './gallery.js';
import { showErrorMessage } from './util.js';
import { setFormSubmit } from './form.js';
import { initFilter } from './filter.js';

getPictures()
  .then((pictures) => {
    renderGellary(pictures);
    initFilter(pictures);
  })
  .catch(
    () => {
      showErrorMessage();
    }
  );

setFormSubmit();
