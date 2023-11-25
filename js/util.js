const MESSAGE_TIMOUT = 5000;
const PAUSE_IMG_RENDERING = 500;

const errorMessageTemplate = document.querySelector('#data-error').content.querySelector('data-error');


function showErrorMessage() {
  const errorElement = errorMessageTemplate.cloneNode(true);
  document.body.append(errorElement);

  setTimeout(() => {
    errorElement.remove();
  }, MESSAGE_TIMOUT);
}

const isEscapeKey = (evt) => evt.key === 'Escape';

const debounce = (callback, timeoutDelay = PAUSE_IMG_RENDERING) => {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

// const getRandomInteger = (min, max) => {
//   const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
//   const upper = Math.floor(Math.max(Math.abs(min), Math.abs(max)));
//   const result = Math.random() * (upper - lower + 1) + lower;

//   return Math.floor(result);
// };


export {showErrorMessage, isEscapeKey, debounce};
