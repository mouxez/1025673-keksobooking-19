'use strict';

(function () {
  // проверяет соответствие 'количество комнат и гостей'
  var capacity = document.querySelector('#capacity');
  var roomNumber = document.querySelector('#room_number');

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
    if (housingType.value === 'flat' && priceOfHousing.value < 1000) {
      housingType.setCustomValidity('«Квартира» — минимальная цена за ночь 1 000');
      priceOfHousing.placeholder = 'от 1000 руб';
    } else if (housingType.value === 'house' && priceOfHousing.value < 5000) {
      housingType.setCustomValidity('«Дом» — минимальная цена 5 000');
      priceOfHousing.placeholder = 'от 5000 руб';
    } else if (housingType.value === 'palace' && priceOfHousing.value < 10000) {
      housingType.setCustomValidity('«Дворец» — минимальная цена 10 000');
      priceOfHousing.placeholder = 'от 10000 руб';
    } else if (housingType.value === 'bungalo') {
      priceOfHousing.placeholder = 'от 0 руб';
    }
    housingType.setCustomValidity('');
  };

  roomNumber.addEventListener('change', checkGuest);
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
})();
