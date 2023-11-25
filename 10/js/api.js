const SERVER_URL = 'https://30.javascript.pages.academy/kekstagram';

const ServerRoute = {
  GET_DATA: '/data',
  SEND_DATA: '/',
};

const HttpMethod = {
  GET: 'GET',
  POST: 'POST',
};

const ErrorText = {
  [HttpMethod.GET]: 'Не удалось загрузить данные. Попробуйте обновить страницу',
  [HttpMethod.POST]: 'Не удалось отправить форму. Попробуйте ещё раз',
};

const request = async (url, method = HttpMethod.GET, body = null) => {
  const response = await fetch(url, {method, body});
  if (! response.ok) {
    throw new Error(ErrorText[method]);
  }

  return response.json();
};

const getPictures = async () => request(SERVER_URL + ServerRoute.GET_DATA);

const sendPicture = async (pictureData) => request(SERVER_URL + ServerRoute.GET_DATA,
  HttpMethod.POST,
  pictureData,
);

export { getPictures, sendPicture };