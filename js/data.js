'use strict';

(function () {

  // загружает данные с сервера
  var getPins = function () {
    window.backend.load(window.const.LOAD_URL, window.data.onSuccessLoad, window.backend.onError);
  };

  document.querySelector('.map__pin--main').addEventListener('mousedown', function (evt) {
    if (evt.button === window.const.LEFT_MOUSE_BUTTON) {
      getPins();
    }
  });

  var adsList = [];
  var onSuccessLoad = function (downloadedPins) {
    window.data.adsList = downloadedPins;

    // ограничивает количество объявлений
    // if (window.data.adsList.length > 5) {
    //   window.data.adsList.length = 5;
    // }

    window.map.activatePage(window.map.fieldsetElements);

    // выводит объявления
    window.pin.createPins(window.data.adsList);
    // получаем коллекцию меток на карте
    var mapPinNodeList = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    window.mapPinNodeList = mapPinNodeList;

    // добавляет обработчик на каждую метку
    mapPinNodeList.forEach(function (item, index, evt) {
      item.addEventListener('click', function () {
        window.card.mapCard.remove();
        window.card.createCard(index);
      });
      if (evt.keyCode === window.const.ENTER_KEY) {
        item.addEventListener('keydown', function () {
          window.card.mapCard.remove();
          window.card.createCard(index);
        });
      }
    });
  };

  window.data = {
    onSuccessLoad: onSuccessLoad,
    adsList: adsList
  };
})();
