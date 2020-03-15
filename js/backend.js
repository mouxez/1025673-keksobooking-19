'use strict';

(function () {
  var StatusCode = {
    OK: 200,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    NOT_FOUND: 404,
    SERVER_ERROR: 500,
    SERVICE_UNAVAILABLE: 503
  };

  var main = document.querySelector('main');

  var load = function (url, onLoad, onError) {
    var xhr = new XMLHttpRequest();
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

  var save = function (url, data, onSuccess, onError) {
    var errorAlert = onError ? onError : onErrorDefault;
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.addEventListener('load', addResponseListener(onSuccess, errorAlert, xhr));
    xhr.addEventListener('error', function () {
      errorAlert('Произошла ошибка соединения');
    });

    xhr.open('POST', url);
    xhr.send(data);
  };

  var addResponseListener = function (onLoad, onError, xhr) {
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

  var onError = function () {
    var templateError = document.querySelector('#error').content.cloneNode(true);
    window.const.FRAGMENT.appendChild(templateError);
    main.appendChild(window.const.FRAGMENT);

    // скрывает окно ошибки загрузки ESC
    var errorButton = document.querySelector('.error__button');

    errorButton.addEventListener('keydown', function (evt) {
      if (evt.keyCode === window.const.ESC_CODE) {
        document.querySelector('div.error').remove();
      }
    });

    // скрывает окно ошибки загрузки
    errorButton.addEventListener('mousedown', function (evt) {
      if (evt.keyCode === window.const.LEFT_MOUSE_BUTTON) {
        document.querySelector('div.error').remove();
      }
    });
  };

  var onSuccess = function () {
    var templateSuccess = document.querySelector('#success').content.cloneNode(true);
    window.const.FRAGMENT.appendChild(templateSuccess);
    main.appendChild(window.const.FRAGMENT);

    // скрывает окно успешной загрузки
    document.addEventListener('keydown', function (evt) {
      if (evt.keyCode === window.const.ESC_CODE) {
        document.querySelector('div.success').remove();
      }
    });

    document.querySelector('div.success').addEventListener('mousedown', function (evt) {
      if (evt.keyCode === window.const.LEFT_MOUSE_BUTTON) {
        document.querySelector('div.success').remove();
      }
    });
  };

  window.backend = {
    load: load,
    save: save,
    onSuccess: onSuccess,
    onError: onError
  };
})();
