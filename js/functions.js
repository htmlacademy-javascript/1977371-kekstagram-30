// Проверка длины строки с заданным числом
function checkingString(string, length) {
  return string.length <= length;
}

// eslint-disable-next-line no-console
console.log(checkingString);

// Проверка строки на палиндром
function palindrom (str) {
  str = str.toLowerCase().replaceAll(' ','');
  return str === str.split('').reverse().join('');
}

// eslint-disable-next-line no-console
console.log(palindrom);
