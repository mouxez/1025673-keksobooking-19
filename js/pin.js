'use strict';

(function () {
  var template = document.querySelector('#pin').content.querySelector('.map__pin');

  var renderDraftPin = function (pin) {
    var userPin = template.cloneNode(true);
    userPin.style.left = (pin.location.x - window.const.PIN_WIDTH / 2) + 'px';
    userPin.style.top = (pin.location.y - window.const.PIN_HEIGHT) + 'px';
    userPin.querySelector('img').src = pin.author.avatar;
    userPin.querySelector('img').alt = pin.offer.title;

    return userPin;
  };

  var pin = document.querySelector('.map__pins');

  var createPins = function (pinsArray) {
    for (var j = 0; j < pinsArray.length; j++) {
      window.fragment.appendChild(renderDraftPin(pinsArray[j]));
    }
    pin.appendChild(window.fragment);
  };

  var pinX = window.map.mainButton.offsetLeft;
  var pinY = window.map.mainButton.offsetTop;
  var addressArea = document.querySelector('#address');

  var currentCoordinatesDisabled = [Math.round(pinX + (window.const.PIN_WIDTH / 2)), Math.round(pinY + (window.const.PIN_WIDTH / 2))];
  var currentCoordinates = [Math.round(pinX + (window.const.PIN_WIDTH / 2)), Math.round(pinY + (window.const.PIN_HEIGHT))];

  var getAddress = function () {
    addressArea.value = currentCoordinatesDisabled.join(', ');
    window.map.mainButton.addEventListener('mousedown', function (evt) {
      if (evt.button === window.const.LEFT_MOUSE_BUTTON) {
        addressArea.value = currentCoordinates.join(', ');
      }
    });
  };

  getAddress();

  window.pin = {
    createPins: createPins,
    addressArea: addressArea
  };
})();
