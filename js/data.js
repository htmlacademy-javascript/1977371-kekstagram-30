import './util.js';

import {getRandomInteger} from './util.js';

const PICTURE_COUNT = 25;
const LIKE_MIN = 15;
const LIKE_MAX = 200;
const COMMENT_COUNT = 20;
const AVATAR = 6;

// description, строка — описание фотографии. Описание придумайте самостоятельно.
const COMMENTS = [
  'Все отлично!',
  'Есть над чем поработать.',
  'Очень хорошо!',
  'Круто!',
  'Могло быть и лучше',
  'Неплохо',
  'Прикольно получается',
  'Вау!!!',
  'Просто нет слов, как это круто!',
  'Великолепно',
  'Нуууу, такое себе, если честно:(',
];

const NAMES = [
  'Игорь',
  'Марк',
  'Илья',
  'Ксюша',
  'Настя',
  'Алиса',
  'Вика',
  'Стас',
  'Глеб',
  'Саша',
];

const DESCREPTION = [
  'Все только самое лучше)',
  'Отдыхать надо уметь и уметь красиво!',
  'Даааа, замечательно получается',
  'Крутое было время',
  'Лучшее впереди',
  'Только вперед',
  'Самое самое',
  'Эхххх... Было время',
];

// eslint-disable-next-line no-unused-vars
const getRandomArrayElment = (items) =>
  items[getRandomInteger(0, items.length - 1)];

const createIdGenerator = () => {
  let lastGeneratedId = 0;

  return () => {
    lastGeneratedId += 1;
    return lastGeneratedId;
  };
};

const generateCommentId = createIdGenerator();

const createMessage = () => Array.from (
  { length: getRandomInteger(1,2)},
  () => getRandomArrayElment(COMMENTS),
).join(' ');

const createComment = () => ({
  id: generateCommentId(),
  avatar: `img/avatar-${getRandomInteger(1, AVATAR)}.svg`,
  message: createMessage(),
  name: getRandomArrayElment(NAMES),
});

const createPicture = (index) => ({
  id: index,
  url: `photo/${index}.jpg`,
  descreption: getRandomArrayElment(DESCREPTION),
  likes: getRandomInteger (LIKE_MIN, LIKE_MAX),
  comments: Array.from (
    {length: getRandomInteger(0, COMMENT_COUNT)},
    createComment,
  ),
});

const getPictures = () => Array.from (
  {length: PICTURE_COUNT},
  (_, pictureIndex) => createPicture (pictureIndex + 1),
);

export {getPictures};
