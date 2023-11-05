function getRandomInteger (min, max) {
  const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const upper = Math.floor(Math.max(Math.abs(min), Math.abs(max)));
  const result = Math.random() * (upper - lower + 1) + lower;

  return Math.floor(result);
}

export {getRandomInteger};

// Проверка длины строки с заданным числом
// eslint-disable-next-line no-unused-vars
const checkingString = (string, length) => string.length <= length;


// Проверка строки на палиндром
// eslint-disable-next-line no-unused-vars
function palindrom (str) {
  str = str.toLowerCase().replaceAll(' ','');
  return str === str.split('').reverse().join('');
}
