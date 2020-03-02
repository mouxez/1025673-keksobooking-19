'use strict';

(function () {
// деактивирует страницу
  var fieldsetElements = document.getElementsByTagName('fieldset');
  var selectElements = document.getElementsByTagName('select');

  // активирует страницу
  var mainButton = document.querySelector('.map__pin--main');

  var activateElements = function (array, isDisabled) {
    for (var j = 0; j < array.length; j++) {
      array[j].disabled = isDisabled;
    }
  };

  activateElements(selectElements, true);
  activateElements(fieldsetElements, true);

  var activatePage = function (array) {
    for (var j = 0; j < array.length; j++) {
      array[j].disabled = false;
    }

    // выводит объявления
    window.createPins(window.randomAds);

    // создаёт массив меток
    var pinsList = [];
    for (var k = 0; k < window.const.ADS_AMOUNT; k++) {
      pinsList[k] = window.createPins(window.randomAds[k]); //
    }

    // убирает класс .map--faded у блока с картой
    document.querySelector('.map').classList.remove('map--faded');

    // активирует форму объявления
    document.querySelector('.ad-form').classList.remove('ad-form--disabled');

    // получаем коллекцию меток на карте
    var mapPinNodeList = document.querySelectorAll('.map__pin:not(.map__pin--main)');

    // добавляет обработчик на каждую метку
    mapPinNodeList.forEach(function (item, index, evt) {
      item.addEventListener('click', function () {
        window.mapCard.remove();
        window.createCard(index);
      });
      if (evt.keyCode === window.const.ENTER_KEY) {
        item.addEventListener('keydown', function () {
          window.mapCard.remove();
          window.createCard(index);
        });
      }
    });
  };

  mainButton.addEventListener('mousedown', function (evt) {
    if (evt.button === window.const.LEFT_MOUSE_BUTTON) {
      activatePage(fieldsetElements);
      activateElements(fieldsetElements, false);
      activateElements(selectElements, false);
    }
  });

  // перемещает главную метку
  mainButton.addEventListener('mousedown', function (evt) {
    var startCoordinates = {
      x: evt.clientX,
      y: evt.clientY
    };
    var onMouseMove = function (move) {
      var shift = {
        x: startCoordinates.x - move.clientX,
        y: startCoordinates.y - move.clientY
      };
      startCoordinates = {
        x: move.clientX,
        y: move.clientY
      };
      mainButton.style.top = (mainButton.offsetTop - shift.y) + 'px';
      mainButton.style.left = (mainButton.offsetLeft - shift.x) + 'px';
    };

    var onMouseUp = function () {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  // активация по нажатию Enter
  mainButton.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.const.ENTER_KEY) {
      activatePage(fieldsetElements);
      activateElements(fieldsetElements, false);
      activateElements(selectElements, false);
    }
  });

  window.mainButton = mainButton;

})();
