import { renderGellary } from './gallery.js';
import { debounce } from './util.js';

const MAX_RANDOM_FILTER = 10;
const FilterEnum = {
  DEFAULT: 'default',
  RANDOM: 'random',
  DISCUSSED: 'discussed'
};

const filtersElement = document.querySelector('.img-filters');
const filtersFormElement = document.querySelector('.img-filters__form');
const defaultBtn = filtersFormElement.querySelector('#filter-default');
const randomBtn = filtersFormElement.querySelector('#filter-random');
const discussedBtn = filtersFormElement.querySelector('#filter-discussed');

// Получение рандомного числа
const getRandomInteger = (min, max) => {
  const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const upper = Math.floor(Math.max(Math.abs(min), Math.abs(max)));
  const result = Math.random() * (upper - lower + 1) + lower;

  return Math.floor(result);
};

// Создание уникальных ключей.

const createUniqueId = (min, max) => {
  const previousValues = [];

  return function () {
    let currentValue = getRandomInteger(min, max);
    if (previousValues.length >= (max - min + 1)) {
      return null;
    }
    while (previousValues.includes(currentValue)) {
      currentValue = getRandomInteger(min, max);
    }
    previousValues.push(currentValue);
    return currentValue;
  };
};

const createInexList = (pictures) => {
  const randomIndexList = [];
  const index = createUniqueId(0, pictures.length - 1);
  while (randomIndexList.length < MAX_RANDOM_FILTER) {
    randomIndexList.push(index());
  }
  return randomIndexList;
};

const compareNumbers = (pictureA, pictureB) => {
  const a = pictureA.comments.length;
  const b = pictureB.comments.length;
  return b - a;
};

const sortsPictures = (pictures) => {
  const test = pictures.slice().sort(compareNumbers);
  return test;
};

const randomPictures = (data) => {
  const randomIndexList = createInexList(data);
  const randomElements = [];
  for (let i = 0; i < randomIndexList.length; i++) {
    randomElements.push(data[randomIndexList[i]]);
  }
  return randomElements;
};


const filterHandlers = {
  [FilterEnum.DEFAULT]: (data) => data,
  [FilterEnum.RANDOM]: (data) => randomPictures(data),
  [FilterEnum.DISCUSSED]: (data) => sortsPictures(data)
};

const repaint = (evt, filter, data) => {
  const filteredData = filterHandlers[filter](data);
  const pictures = document.querySelectorAll('.picture');
  pictures.forEach((item) => item.remove());
  renderGellary(filteredData);
  const currentActivElement = filtersFormElement.querySelector('.img-filters__button--active');
  currentActivElement.classList.remove('img-filters__button--active');
  evt.target.classList.add('img-filters__button--active');
};


const debouncedRepain = debounce(repaint);

const onFormElementClick = (evt) => {
  const filtersButtonElements = filtersFormElement.querySelectorAll('.img-filters__button');
  filtersButtonElements.forEach((item) => {
    item.classList.remove('img-filters__button--active');
  });
  if (evt.target.matches('.img-filters__button')) {
    evt.target.classList.add('img-filters__button--active');
  }
};

const initFilter = (data) => {
  filtersElement.classList.remove('img-filters--inactive');

  filtersFormElement.addEventListener('click', onFormElementClick);

  defaultBtn.addEventListener('click', (evt) => {
    debouncedRepain(evt, FilterEnum.DEFAULT, data);
  });

  randomBtn.addEventListener('click', (evt) => {
    debouncedRepain(evt, FilterEnum.RANDOM, data);
  });

  discussedBtn.addEventListener('click', (evt) => {
    debouncedRepain(evt, FilterEnum.DISCUSSED, data);
  });
};

export { initFilter };
