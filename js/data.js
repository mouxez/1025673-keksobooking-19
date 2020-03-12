'use strict';

(function () {
  // загружает данные с сервера
  var adsList = [];
  var onSuccessLoad = function (downloadedPins) {
    adsList.push(downloadedPins);
    return adsList;
  };

  window.data = {
    onSuccessLoad: onSuccessLoad
  };

  window.adsList = adsList;
})();
