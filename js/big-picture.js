import { isEscapeKey } from './util.js';

const COMMENTS_COUNT_SHOW = 5;

const bigPictureElement = document.querySelector('.big-picture');
const commentsListElement = bigPictureElement.querySelector('.social__comments');
const socialCommentTotalCountElement = bigPictureElement.querySelector('.social__comment-total-count');
const commentShownCountElement = bigPictureElement.querySelector('.social__comment-shown-count');
const commentsLoaderElement = bigPictureElement.querySelector('.comments-loader');
const commentElement = document.querySelector('#comment').content.querySelector('.social__comment');
const bodyElement = document.querySelector('body');
const bigPictureImgElement = bigPictureElement.querySelector('.big-picture__img');
const likesCountElement = bigPictureElement.querySelector('.likes-count');
const socialCaptionElement = bigPictureElement.querySelector('.social__caption');
const pictureCancelElement = bigPictureElement.querySelector('#picture-cancel');

let commentsCoutShown = 0;
let arrayComments = [];

const createComment = ({avatar, name, message}) => {
  const newComment = commentElement.cloneNode(true);

  newComment.querySelector('.social__picture').src = avatar;
  newComment.querySelector('.social__picture').alt = name;
  newComment.querySelector('.social__text').textContent = message;

  return newComment;
};

const renderComments = () => {
  commentsCoutShown += COMMENTS_COUNT_SHOW;

  if (commentsCoutShown >= arrayComments.length) {
    commentsLoaderElement.classList.add('hidden');
    commentsCoutShown = arrayComments.length;
  } else {
    commentsLoaderElement.classList.remove('hidden');
  }

  const fragment = document.createDocumentFragment();

  for (let i = 0; i < commentsCoutShown; i++) {
    const comment = createComment(arrayComments[i]);
    fragment.append(comment);
  }
  commentsListElement.innerHTML = '';
  commentsListElement.append(fragment);

  commentShownCountElement.textContent = commentsCoutShown;
  socialCommentTotalCountElement.textContent = arrayComments.length;
};

const onCommentsLoaderClick = () => renderComments();

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPicture();
  }
};

const onClosePictureButtonClick = () => {
  closeBigPicture();
};

//Функция заполняет данными большое фото
const fillsDataBigPicture = ({url, description, likes, comments}) => {

  bigPictureImgElement.querySelector('img').src = url;
  likesCountElement.textContent = likes;
  socialCaptionElement.textContent = description;

  if (comments.length > 0) {
    arrayComments = comments;
  }

  renderComments();
};

const showPicture = (data) => {
  commentsCoutShown = 0;
  bigPictureElement.classList.remove('hidden');
  bodyElement.classList.add('modal-open');

  fillsDataBigPicture(data);

  document.addEventListener('keydown', onDocumentKeydown);
};

function closeBigPicture () {
  bigPictureElement.classList.add('hidden');
  bodyElement.classList.remove('modal-open');

  document.removeEventListener('keydown', onDocumentKeydown);
}

pictureCancelElement.addEventListener('click', onClosePictureButtonClick);
commentsLoaderElement.addEventListener('click', onCommentsLoaderClick);

export { showPicture };
