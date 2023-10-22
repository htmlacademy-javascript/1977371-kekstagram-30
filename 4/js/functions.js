// Проверка длины строки с заданным числом
const checkingString = (string, length) => string.length <= length;


// eslint-disable-next-line no-console
console.log(checkingString);

// Проверка строки на палиндром
function palindrom (str) {
  str = str.toLowerCase().replaceAll(' ','');
  return str === str.split('').reverse().join('');
}

// eslint-disable-next-line no-console
console.log(palindrom);

// функция получения целого числа из заданного диапазона.

