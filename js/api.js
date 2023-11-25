const SERVER_URL = 'https://30.javascript.pages.academy/kekstagram';

const ServerRoute = {
  GET_DATA: '/data',
  SEND_DATA: '/',
};

const Method = {
  GET: 'GET',
  POST: 'POST',
};
const ErrorText = {
  GET_DATA: 'Не удалось загрузить данные. Попробуйте обновить страницу',
  SEND_DATA: 'Не удалось отправить форму. Попробуйте ещё раз',
};

const request = (route, errorText, method = Method.GET, body = null) =>
  fetch(`${SERVER_URL}${route}`, {method, body})
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Произошла ошибка ${response.status}: ${response.statusText}`);
      }
      return response.json();
    })
    .catch((err) => {
      throw new Error(errorText ?? err.message);
    });

const getPictures = () => request(ServerRoute.GET_DATA, ErrorText.GET_DATA);

const sendPictures = (body) => request(ServerRoute.SEND_DATA, ErrorText.SEND_DATA, Method.POST, body);

export { getPictures, sendPictures };
