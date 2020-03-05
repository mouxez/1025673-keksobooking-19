'use strict';

(function () {
  var LOAD_URL = 'https://js.dump.academy/keksobooking/data';
  var xhr = new XMLHttpRequest();

  var load = function (onLoad, onError) {

    xhr.responseType = 'json';
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });
    addErrorListener(onError, onLoad);
    xhr.timeout = window.const.TIMEOUT_MS;
    xhr.open('GET', LOAD_URL);
    xhr.send();
  };

  var addErrorListener = function (onError, onLoad) {

    xhr.addEventListener('load', function () {
      switch (xhr.status) {
        case window.const.OK_REQUEST:
          onLoad(xhr.response);
          break;
        case window.const.SERVER_ERROR:
          onError('Ошибка сервера');
          break;
        case window.const.SERVICE_UNAVAILABLE:
          onError('Сервер временно не доступен');
          break;
        case window.const.BAD_REQUEST:
          onError('Неверный запрос');
          break;
        case window.const.UNAUTHORIZED:
          onError('Пользователь не авторизован');
          break;
        case window.const.NOT_FOUND:
          onError('Не найдено');
          break;
        default:
          onError('Cтатус ответа: : ' + xhr.status + ' ' + xhr.statusText);
      }
    });
  };

  var backend = {
    load: load
  };
  window.backend = backend;
})();
