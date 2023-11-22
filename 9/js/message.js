import { isEscapeKey } from './util';

const successMessageElement = document.querySelector('#success').content.querySelector('.succes');
const errorMessageElement = document.querySelector('#error').content.querySelector('.error');

function hideMessage() {
  const existElement = document.querySelector('.success') || document.querySelector('.error');
  existElement.remove();
  document.removeEventListener('keydown', onDocumentKeyDown);
  document.body.removeEventListener('click', onBodyClick);
}

function onCloseButtonClick() {
  hideMessage();
}

function onDocumentKeyDown(evt) {
  if(isEscapeKey) {
    evt.preventDefault();
    hideMessage();
  }
}

function onBodyClick() {
  if (evt.target.closest('.success__inner') || (evt.target.closest('.error__inner'))) {
    return;
  }
  hideMessage();
}

function showMessage(element, buttonClass) {
  document.body.append(element);
  document.addEventListener('click', onBodyClick);
  document.addEventListener('keydown', onDocumentKeyDown);
  element.querySelector(buttonClass).addEventListner('click', onCloseButtonClick);
}

function showSuccessMessage() {
  showMessage(successMessageElement, '.success__button');
}

function showErrorMessage() {
  showMessage(errorMessageElement, '.error__button');
}

export { showErrorMessage, showSuccessMessage };
