// Проверка длины строки с заданным числом
function checkingString(string, length) {
  return string.length <= length;
}


// Проверка строки на палиндром
function palindrom (str) {
  str = str.toLowerCase().replaceAll(' ','');
  return str == str.split('').reverse().join('');
}

