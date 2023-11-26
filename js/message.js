import { isEscapeKey } from './util';

const successMessageElement = document.querySelector('#success').content.querySelector('.succes');
const errorMessageElement = document.querySelector('#error').content.querySelector('.error');

const onBodyClick = (evt) => {
  if(evt.target.closest('.success__inner') || evt.target.closest('.error__inner')) {
    return;
  }
  hideMessage();
};

function hideMessage() {
  const existsElement = document.querySelector('.success') || document.querySelector('.error');
  existsElement.remove();
  document.removeEventListener('keydown', onDocumentKeyDown);
  document.body.removeEventListener('click', onBodyClick);
}

function onCloseButtunClick() {
  hideMessage();
}

function onDocumentKeyDown(evt) {
  if(isEscapeKey) {
    evt.preventDefault();
    hideMessage();
  }
}


const showMessage = (element, buttonClass) => {
  document.body.append(element);
  document.body.addEventListener('click', onBodyClick);
  const button = element.querySelector(buttonClass);
  button.addEventListener('click', onCloseButtunClick);
  document.addEventListener('keydown', onDocumentKeyDown);
};

function showSuccessMessage() {
  showMessage(successMessageElement, '.success__button');
}

function showErrorMessage() {
  showMessage(errorMessageElement, '.error__button');
}

export { showErrorMessage, showSuccessMessage };
