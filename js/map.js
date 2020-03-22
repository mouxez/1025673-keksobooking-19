'use strict';

(function () {
  var fieldsetElements = document.querySelectorAll('fieldset');
  var selectElements = document.querySelectorAll('select');

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

    document.querySelector('.map').classList.remove('map--faded');

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
