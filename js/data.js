'use strict';

(function () {
  var mapFilters = document.querySelector('.map__filters');

  var getPinList = function () {
    var mapPinNodeList = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    mapPinNodeList.forEach(function (item, index) {
      item.addEventListener('click', function () {
        window.card.mapCard.remove();
        window.card.createCard(index);
      });
    });
  };

  var getPins = function () {
    window.backend.load(window.const.LOAD_URL, window.data.onSuccessLoad, window.backend.onError);
  };

  var drawPins = function (evt) {
    if (evt.button === window.const.LEFT_MOUSE_BUTTON) {
      getPins();
    }
  };

  document.querySelector('.map__pin--main').addEventListener('mousedown', drawPins);

  var removeMainPinEvent = function () {
    document.querySelector('.map__pin--main').removeEventListener('mousedown', drawPins);
  };

  var adsList = [];
  var onSuccessLoad = function (downloadedPins) {
    window.data.adsList = downloadedPins;

    var initialData = window.data.adsList.slice(0, 5);
    window.pin.createPins(initialData);

    mapFilters.addEventListener('change', function () {
      var filterWithDelay = window.debounce(function () {
        mapPinNodeList = document.querySelectorAll('.map__pin:not(.map__pin--main)');
        window.card.mapCard.remove();
        mapPinNodeList.forEach(function (item) {
          item.remove();
        });

        var currentData = window.filter.onFilterChange(window.data.adsList);

        window.data.adsList = currentData;
        window.pin.createPins(currentData);
        mapPinNodeList = document.querySelectorAll('.map__pin:not(.map__pin--main)');
        getPinList();
        getFocus();
      });
      filterWithDelay();
    });

    var getFocus = function () {
      [].forEach.call(mapPinNodeList, function (item) {
        item.addEventListener('focus', function () {
          [].forEach.call(mapPinNodeList, function (index) {
            index.classList.remove('map__pin--active', true);
          });
          item.classList.toggle('map__pin--active', true);
        });
      });
    };
    window.map.activatePage(window.map.fieldsetElements);

    var mapPinNodeList = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    window.mapPinNodeList = mapPinNodeList;

    getPinList();
    getFocus();
    removeMainPinEvent();
  };

  window.data = {
    onSuccessLoad: onSuccessLoad,
    adsList: adsList,
    drawPins: drawPins,
    mapFilters: mapFilters
  };
})();
