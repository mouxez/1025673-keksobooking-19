'use strict';

(function () {
// деактивирует страницу
  var fieldsetElements = document.querySelectorAll('fieldset');
  var selectElements = document.querySelectorAll('select');

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

    window.backend.load(window.const.LOAD_URL, window.data.onSuccessLoad);

    for (var j = 0; j < array.length; j++) {
      array[j].disabled = false;
    }

    // выводит объявления
    window.pin.createPins(window.data.adsList);

    // создаёт массив меток
    var pinsList = [];
    for (var k = 0; k < window.const.ADS_AMOUNT; k++) {
      pinsList[k] = window.pin.createPins(window.data.adsList[k]); //
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

  mainButton.addEventListener('mousedown', function (evt) {
    if (evt.button === window.const.LEFT_MOUSE_BUTTON) {
      activatePage(fieldsetElements);
      activateElements(fieldsetElements, false);
      activateElements(selectElements, false);
    }
  });

  // активация по нажатию Enter
  mainButton.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.const.ENTER_KEY) {
      activatePage(fieldsetElements);
      activateElements(fieldsetElements, false);
      activateElements(selectElements, false);
    }
  });

  window.map = {
    mainButton: mainButton,
    activatePage: activatePage,
    fieldsetElements: fieldsetElements,
    activateElements: activateElements,
    selectElements: selectElements
  };
})();
