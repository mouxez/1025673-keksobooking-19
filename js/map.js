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
    for (var j = 0; j < array.length; j++) {
      array[j].disabled = false;
    }

    activateElements(fieldsetElements, false);
    activateElements(selectElements, false);

    // создаёт массив меток
    var pinsList = [];
    for (var k = 0; k < window.const.ADS_AMOUNT; k++) {
      pinsList[k] = window.pin.createPins(window.data.adsList[k]); //
    }

    // убирает класс .map--faded у блока с картой
    document.querySelector('.map').classList.remove('map--faded');

    // активирует форму объявления
    document.querySelector('.ad-form').classList.remove('ad-form--disabled');
  };

  window.map = {
    mainButton: mainButton,
    activatePage: activatePage,
    fieldsetElements: fieldsetElements,
    activateElements: activateElements,
    selectElements: selectElements
  };
})();
