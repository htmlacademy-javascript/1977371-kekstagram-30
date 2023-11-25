import { resetScale } from './scale.js';
import { init as initEffect, reset as resetEffect } from './effect.js';
import { sendData } from './api.js';
import { showSuccessMessage, showErrorMessage } from './message.js';
import { isEscapeKey } from './utils.js';

const FILE_TYPES = ['jpg', 'jpeg', 'png'];
const MAX_HASHTAG_COUNT = 5;
const MAX_LENGTH = 140;
const VALID_SIMBOLS = /^#[a-zа-яё0-9]{1,19}$/i;

const ERROR_TEXT = {
  INVALID_COUNT: `Максимум ${MAX_HASHTAG_COUNT} хэштэгов`,
  NOT_UNIQUE: 'Хэштэги должны быть уникальными',
  INVALID_PATTERN: 'Неправельный хэштэг',
  INVALID_LENGTH: 'Комментарий не может быть длиннее 140 символов!',
};

const SubmitButtonText = {
  IDLE: 'Опубликовать',
  SENDING: 'Отправляю...'
};

const formElement = document.querySelector('.img-upload__form');
const textHashtagsElement = formElement.querySelector('.text__hashtags');
const bodyElement = document.querySelector('body');
const uploadFileElement = formElement.querySelector('#upload-file');
const imgUploadOverlayElement = formElement.querySelector('.img-upload__overlay');
const cancelButton = formElement.querySelector('#upload-cancel');
const textDescriptionElement = formElement.querySelector('.text__description');
const submitButton = formElement.querySelector('#upload-submit');
const imgDefaultElement = formElement.querySelector('#img-upload__default');
const PreviewElements = formElement.querySelectorAll('.effects__preview');

const pristine = new Pristine(formElement, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error'
});

const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = SubmitButtonText.SENDING;
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = SubmitButtonText.IDLE;
};

const openForm = () => {
  imgUploadOverlayElement.classList.remove('hidden');
  bodyElement.classList.add('modal-open');
  const file = uploadFileElement.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));
  if (file && matches) {
    imgDefaultElement.src = URL.createObjectURL(file);
    PreviewElements.forEach ((element) => {
      element.style.backgroundImage = `url(${URL.createObjectURL(file)})`;
    });
  }

  document.addEventListener('keydown', onDocumentKeydown);
};

const closeForm = () => {
  formElement.reset();
  resetScale();
  resetEffect();
  pristine.reset();

  imgUploadOverlayElement.classList.add('hidden');
  bodyElement.classList.remove('modal-open');

  document.removeEventListener('keydown', onDocumentKeydown);
};

const onImgUploadFileChange = () => {
  openForm();
};

const normalizeTags = (tagString) => tagString.trim().split(' ').filter((tag) => Boolean(tag.length));

const validateHashtags = (value) => normalizeTags(value).every((tag) => VALID_SIMBOLS.test(tag));

const validateHashtagsCount = (value) => normalizeTags(value).length <= MAX_HASHTAG_COUNT;


const validateHashtagsRepeate = (value) => {
  const lowerCaseTags = normalizeTags(value).map((tag) => tag.toLowerCase());
  const uniqueHashtags = new Set(lowerCaseTags);
  return lowerCaseTags.length === uniqueHashtags.size;
};

const validateTextCommentLength = () => textDescriptionElement.value.length <= MAX_LENGTH;

pristine.addValidator(textHashtagsElement, validateHashtags, ERROR_TEXT.INVALID_PATTERN, 1, true);
pristine.addValidator(textHashtagsElement, validateHashtagsCount, ERROR_TEXT.INVALID_COUNT, 3, true);
pristine.addValidator(textHashtagsElement, validateHashtagsRepeate, ERROR_TEXT.NOT_UNIQUE, 2, true);
pristine.addValidator(textDescriptionElement, validateTextCommentLength, ERROR_TEXT.INVALID_LENGTH, true);

const isTextFiledFocused = () =>
  document.activeElement === textHashtagsElement ||
  document.activeElement === textDescriptionElement;


function onDocumentKeydown(evt) {
  const isErrorMessageExists = Boolean(document.querySelector('.error'));
  if (isEscapeKey(evt) && !isTextFiledFocused() && !isErrorMessageExists) {
    evt.preventDefault();
    closeForm();
  }
}

const onFormSubmit = async (evt) => {
  evt.preventDefault();
  const isValid = pristine.validate();
  if (!isValid) {
    return;
  }
  try {
    blockSubmitButton();
    await sendData(new FormData(evt.target));
    unblockSubmitButton();
    closeForm();
    showSuccessMessage();
  } catch {
    showErrorMessage();
    unblockSubmitButton();
  }
};

uploadFileElement.addEventListener('change', onImgUploadFileChange);
cancelButton.addEventListener('click', closeForm);

const setFormSubmit = () => {
  formElement.addEventListener('submit', onFormSubmit);
};

initEffect();

export { setFormSubmit };
