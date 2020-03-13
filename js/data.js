'use strict';

(function () {
  // загружает данные с сервера
  var adsList = [];
  var onSuccessLoad = function (downloadedPins) {
    // window.map.activatePage(window.map.fieldsetElements);
    adsList.push(downloadedPins);

    return adsList;
  };

  window.data = {
    onSuccessLoad: onSuccessLoad,
    adsList: adsList
  };
})();
