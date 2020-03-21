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

  document.querySelector('.map__pin--main').addEventListener('mousedown', function (evt) {
    if (evt.button === window.const.LEFT_MOUSE_BUTTON) {
      getPins();
    }
  });

  var adsList = [];
  var onSuccessLoad = function (downloadedPins) {
    window.data.adsList = downloadedPins;

    var initialData = [window.data.adsList[0], window.data.adsList[1], window.data.adsList[2], window.data.adsList[3], window.data.adsList[4]];
    window.pin.createPins(initialData);

    mapFilters.addEventListener('change', function () {
      var filterWithDelay = window.debounce(function () {
        mapPinNodeList = document.querySelectorAll('.map__pin:not(.map__pin--main)');
        window.card.mapCard.remove();
        mapPinNodeList.forEach(function (item) {
          item.remove();
        });

        if (window.filter.onFilterChange(window.data.adsList).length > 5) {
          window.filter.onFilterChange(window.data.adsList).length = 5;
        }

        window.pin.createPins(window.filter.onFilterChange(window.data.adsList));
        getPinList();
        getFocus();
      });
      filterWithDelay();
    });

    var getFocus = function () {
      [].forEach.call(mapPinNodeList, function (item) {
        item.addEventListener('focus', function () {
          item.classList.toggle('map__pin--active', true);
        });
      });
    };

    window.map.activatePage(window.map.fieldsetElements);

    var mapPinNodeList = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    window.mapPinNodeList = mapPinNodeList;

    getPinList();
    getFocus();
  };

  window.data = {
    onSuccessLoad: onSuccessLoad,
    adsList: adsList
  };
})();
