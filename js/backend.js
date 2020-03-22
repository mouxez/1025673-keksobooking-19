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
  window.fragment = document.createDocumentFragment();

  var load = function (url, onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.addEventListener('load', addResponseListener(onLoad, onError, xhr));
    xhr.addEventListener('error', function () {
      onErrorDefault('Произошла ошибка соединения, проверьте подключение к интернету');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });
    xhr.timeout = window.const.TIMEOUT_MS;
    xhr.open('GET', url);
    xhr.send();
  };

  var save = function (url, data, onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.addEventListener('load', addResponseListener(onSuccess, onError, xhr));
    xhr.addEventListener('error', function () {
      onErrorDefault('Произошла ошибка соединения. Пожалуйста, проверьте подключение к сети интернет');
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

  var removeOnErrorDefaultMouse = function (evt) {
    if (evt.button === window.const.LEFT_MOUSE_BUTTON) {
      document.querySelector('.connection__error').remove();
    }
  };

  var removeOnErrorDefaultEsc = function (evt) {
    if (evt.keyCode === window.const.ESC_CODE) {
      document.querySelector('.connection__error').remove();
    }
  };

  var onErrorDefault = function (errorMessage) {
    var node = document.createElement('div');
    node.classList.add('connection__error');
    node.style = 'z-index: 100; margin: 0 auto; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.top = '40%';
    node.style.fontSize = '40px';
    node.style.color = '#000000';
    node.style.width = '300px';
    node.style.height = '300px';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);

    document.addEventListener('mousedown', removeOnErrorDefaultMouse);
    document.addEventListener('keydown', removeOnErrorDefaultEsc);
  };

  var closeOnErrorDefault = function () {
    document.removeEventListener('mousedown', removeOnErrorDefaultMouse);
    document.removeEventListener('keydown', removeOnErrorDefaultEsc);
  };

  if (document.querySelector('.connection__error') === false) {
    closeOnErrorDefault();
  }

  var removeErrorMouse = function (evt) {
    if (evt.button === window.const.LEFT_MOUSE_BUTTON) {
      document.querySelector('div.error').remove();
    }
  };

  var removeSuccessMouse = function (evt) {
    if (evt.button === window.const.LEFT_MOUSE_BUTTON) {
      document.querySelector('div.success').remove();
    }
  };

  var removeErrorEsc = function (evt) {
    if (evt.keyCode === window.const.ESC_CODE) {
      document.querySelector('div.error').remove();
    }
  };

  var removeSuccessEsc = function (evt) {
    if (evt.keyCode === window.const.ESC_CODE) {
      document.querySelector('div.success').remove();
    }
  };

  var onError = function () {
    var templateError = document.querySelector('#error').content.cloneNode(true);
    window.fragment.appendChild(templateError);
    main.appendChild(window.fragment);

    document.querySelector('div.error').addEventListener('mousedown', removeErrorMouse);
    document.addEventListener('keydown', removeErrorEsc);
  };

  var closeCard = function () {
    document.querySelector('div.error').removeEventListener('mousedown', removeErrorMouse);
    document.removeEventListener('keydown', removeErrorEsc);
  };

  if (document.querySelector('div.error') === false) {
    closeCard();
  }

  var onSuccess = function () {
    var templateSuccess = document.querySelector('#success').content.cloneNode(true);
    window.fragment.appendChild(templateSuccess);
    main.appendChild(window.fragment);

    document.addEventListener('keydown', removeSuccessEsc);
    document.addEventListener('mousedown', removeSuccessMouse);

    document.addEventListener('mouseup', function () {
      document.removeEventListener('mousedown', removeSuccessMouse);
    });
    document.addEventListener('keyup', function () {
      document.removeEventListener('keydown', removeSuccessEsc);
    });
  };

  window.backend = {
    load: load,
    save: save,
    onSuccess: onSuccess,
    onError: onError
  };
})();
