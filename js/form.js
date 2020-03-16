'use strict';

(function () {
  // проверяет соответствие 'количество комнат и гостей'
  var capacity = document.querySelector('#capacity');
  var roomNumber = document.querySelector('#room_number');
  var adForm = document.querySelector('.ad-form');
  var resetButton = adForm.querySelector('.ad-form__reset');

  var checkGuest = function () {
    if (roomNumber.value === '1' && capacity.value !== '1') {
      capacity.setCustomValidity('1 комната — «для 1 гостя»');
    } else if (roomNumber.value === '2' && (capacity.value !== '1' || capacity.value !== '2')) {
      capacity.setCustomValidity('2 комнаты — «для 2 гостей» или «для 1 гостя»');
    } else if (roomNumber.value === '3' && capacity.value === '0') {
      capacity.setCustomValidity('3 комнаты — «для 3 гостей», «для 2 гостей» или «для 1 гостя»');
    } else if (roomNumber.value === '100' && capacity.value !== '0') {
      capacity.setCustomValidity('100 комнат — «не для гостей»');
    } else {
      capacity.setCustomValidity('');
    }
  };

  // проверяет тип жилья и стоимость
  var housingType = document.querySelector('#type');
  var priceOfHousing = document.querySelector('#price');

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

  roomNumber.addEventListener('change', checkGuest);
  checkHousingType();
  housingType.addEventListener('change', checkHousingType);

  // проверяет соответствие полей заезда-выселения
  var timeIn = document.querySelector('#timein');
  var timeOut = document.querySelector('#timeout');

  timeIn.addEventListener('change', function () {
    timeOut.value = timeIn.value;
  });

  timeOut.addEventListener('change', function () {
    timeIn.value = timeOut.value;
  });

  // добавляет инпуту цвет ошибки ввода
  var inputElements = document.querySelectorAll('input');

  [].forEach.call(inputElements, function (item) {
    item.addEventListener('focus', function () {
      item.classList.toggle('active', true);
    });
  });

  // отправляет данные формы на сервер при нажатии 'Опубликовать'
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

  // сбрасывает форму к дефолту
  resetButton.addEventListener('mousedown', function (evt) {
    if (evt.button === window.const.LEFT_MOUSE_BUTTON) {
      adForm.reset();
    }
  });
})();
