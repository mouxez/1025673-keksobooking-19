'use strict';

(function () {
  // загружает данные с сервера
  var randomAds = [];
  var onSuccessLoad = function () {
    window.load(function (downloadedPins) {
      randomAds.push(downloadedPins);
    });
    return randomAds;
  };

  var onErrorLoad = function (errorMessage) {
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

  window.data = {
    onSuccessLoad: onSuccessLoad,
    onErrorLoad: onErrorLoad
  };

  window.randomAds = randomAds;
})();
