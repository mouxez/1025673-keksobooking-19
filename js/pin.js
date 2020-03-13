'use strict';

(function () {
  // данные метки
  var template = document.querySelector('#pin').content.querySelector('.map__pin');

  // Создаёт шаблон метки
  var renderDraftPin = function (pin) {
    var userPin = template.cloneNode(true);
    userPin.style.left = (pin.location.x - window.const.PIN_WIDTH / 2) + 'px';
    userPin.style.top = (pin.location.y - window.const.PIN_HEIGHT) + 'px';
    userPin.querySelector('img').src = pin.author.avatar;
    userPin.querySelector('img').alt = pin.offer.title;

    return userPin;
  };

  // создаёт метки
  var pin = document.querySelector('.map__pins');

  var createPins = function (pinsArray) {
    if (Array.isArray(pinsArray)) {
      for (var j = 0; j < pinsArray.length; j++) {
        window.const.FRAGMENT.appendChild(renderDraftPin(pinsArray[j]));
      }
      pin.appendChild(window.const.FRAGMENT);
    }
  };

  // вычисляет координаты относительно окна
  var pinX = window.map.mainButton.offsetLeft;
  var pinY = window.map.mainButton.offsetTop;
  var addressArea = document.querySelector('#address');

  // в состоянии disabled метка является кругом и расстояние до центра вычисляю прибавляя половину ширины метки (радиус)
  var currentCoordinatesDisabled = [Math.round(pinX) + (window.const.PIN_WIDTH / 2), Math.round(pinY) + (window.const.PIN_WIDTH / 2)];
  // в активном состоянии для вычисления координаты Y острого конца метки прибавляю всю её высоту
  var currentCoordinates = [Math.round(pinX) + (window.const.PIN_WIDTH / 2), Math.round(pinY) + window.const.PIN_HEIGHT];

  var getAddress = function () {
    addressArea.value = currentCoordinatesDisabled[0] + ',' + currentCoordinatesDisabled[1];
    window.map.mainButton.addEventListener('mousedown', function (evt) {
      if (evt.button === window.const.LEFT_MOUSE_BUTTON) {
        addressArea.value = currentCoordinates[0] + ',' + currentCoordinates[1];
      }
    });
  };

  getAddress();

  window.pin = {
    createPins: createPins,
    addressArea: addressArea
  };
})();
