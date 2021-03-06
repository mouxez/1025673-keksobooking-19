'use strict';

(function () {
  var capacity = document.querySelector('#capacity');
  var roomNumber = document.querySelector('#room_number');
  var adForm = document.querySelector('.ad-form');
  var resetButton = adForm.querySelector('.ad-form__reset');
  var housingType = document.querySelector('#type');
  var priceOfHousing = document.querySelector('#price');
  var mapPinNodeList = document.querySelectorAll('.map__pin:not(.map__pin--main)');
  var avatarPreview = adForm.querySelector('.ad-form-header__preview img');

  var checkGuest = function (evt) {
    var target = evt.target.value;
    var capacityOptions = capacity.querySelectorAll('option');
    capacityOptions.forEach(function (item) {
      var option = item;
      option.disabled = target === '100' ? option.value !== '0' : option.value > target || option.value === '0';
      option.selected = option.value === target || (option.value === '0' && target === '100');
    });
  };
  roomNumber.addEventListener('change', function (evt) {
    checkGuest(evt);
  });

  capacity.addEventListener('mousemove', function (evt) {
    checkGuest(evt);
  });

  var checkHousingType = function () {
    if (housingType.value === 'bungalo') {
      priceOfHousing.placeholder = 'от 0 руб';
      priceOfHousing.min = '0';
    } else if (housingType.value === 'flat' && priceOfHousing.value < 1000) {
      housingType.setCustomValidity('«Квартира» — минимальная цена за ночь 1 000');
      priceOfHousing.placeholder = 'от 1000 руб';
      priceOfHousing.min = '1000';
    } else if (housingType.value === 'house' && priceOfHousing.value < 5000) {
      housingType.setCustomValidity('«Дом» — минимальная цена 5 000');
      priceOfHousing.placeholder = 'от 5000 руб';
      priceOfHousing.min = '5000';
    } else if (housingType.value === 'palace' && priceOfHousing.value < 10000) {
      housingType.setCustomValidity('«Дворец» — минимальная цена 10 000');
      priceOfHousing.placeholder = 'от 10000 руб';
      priceOfHousing.min = '10000';
    }
    housingType.setCustomValidity('');
  };

  checkHousingType();
  housingType.addEventListener('change', checkHousingType);

  var timeIn = document.querySelector('#timein');
  var timeOut = document.querySelector('#timeout');

  timeIn.addEventListener('change', function () {
    timeOut.value = timeIn.value;
  });

  timeOut.addEventListener('change', function () {
    timeIn.value = timeOut.value;
  });

  var inputElements = document.querySelectorAll('input');

  [].forEach.call(inputElements, function (item) {
    item.addEventListener('focus', function () {
      item.classList.toggle('active', true);
    });
  });

  adForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.backend.save(window.const.SAVE_URL, new FormData(adForm), window.backend.onSuccess, window.backend.onError);
    adForm.reset();
    window.map.activateElements(window.map.selectElements, true);
    window.map.activateElements(window.map.fieldsetElements, true);
    document.querySelector('.map').classList.add('map--faded');
    document.querySelector('.ad-form').classList.add('ad-form--disabled');
    window.card.mapCard.remove();
    window.mapPinNodeList.forEach(function (item) {
      item.remove();
    });
  });

  resetButton.addEventListener('mousedown', function (evt) {
    if (evt.button === window.const.LEFT_MOUSE_BUTTON) {
      adForm.reset();
      window.data.mapFilters.reset();
      var housePhotos = adForm.querySelectorAll('.ad-form__photo');
      for (var i = 0; i < housePhotos.length - 1; i++) {
        housePhotos[i].remove();
      }
      avatarPreview.src = window.const.AVATAR_SRC;
      window.map.activateElements(window.map.selectElements, true);
      window.map.activateElements(window.map.fieldsetElements, true);
      document.querySelector('.map').classList.add('map--faded');
      document.querySelector('.ad-form').classList.add('ad-form--disabled');
      window.card.mapCard.remove();
      mapPinNodeList = document.querySelectorAll('.map__pin:not(.map__pin--main)');
      mapPinNodeList.forEach(function (item) {
        item.remove();
      });
      document.querySelector('.map__pin--main').addEventListener('mousedown', window.data.drawPins);
    }
  });
  window.adForm = adForm;
})();
