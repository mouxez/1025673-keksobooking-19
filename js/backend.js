'use strict';

(function () {
  var StatusCode = {
    OK: 200,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    NOT_FOUND: 404,
    SERVER_ERROR: 500,
    SERVICE_UNAVAILABLE: 503,
  };

  var xhr = new XMLHttpRequest();

  var load = function (url, onLoad, onError) {
    var errorAlert = onError ? onError : onErrorDefault;
    xhr.responseType = 'json';
    xhr.addEventListener('load', addResponseListener(onLoad, errorAlert, xhr));
    xhr.addEventListener('error', function () {
      errorAlert('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      errorAlert('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });
    xhr.timeout = window.const.TIMEOUT_MS;
    xhr.open('GET', url);
    xhr.send();
  };

  var addResponseListener = function (onLoad, onError) {

    xhr.addEventListener('load', function () {
      switch (xhr.status) {
        case StatusCode.OK:
          onLoad(xhr.response);
          break;
        case StatusCode.SERVER_ERROR:
          onError('Ошибка сервера');
          break;
        case StatusCode.SERVICE_UNAVAILABLE:
          onError('Сервер временно не доступен');
          break;
        case StatusCode.BAD_REQUEST:
          onError('Неверный запрос');
          break;
        case StatusCode.UNAUTHORIZED:
          onError('Пользователь не авторизован');
          break;
        case StatusCode.NOT_FOUND:
          onError('Не найдено');
          break;
        default:
          onError('Cтатус ответа: : ' + xhr.status + ' ' + xhr.statusText);
      }
    });
  };

  var onErrorDefault = function (errorMessage) {
    var node = document.createElement('div');
    node.style = window.const.ERROR_POPUP;
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.top = '20%';
    node.style.fontSize = '40px';
    node.style.color = '#000000';
    node.style.width = '300px';
    node.style.height = '300px';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  window.backend = {
    load: load,
    onErrorDefault: onErrorDefault
  };
})();
