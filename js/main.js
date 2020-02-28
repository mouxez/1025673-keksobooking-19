'use strict';

var PIN_WIDTH = 50;
var PIN_HEIGHT = 70;
var ADS_AMOUNT = 8;
var LEFT_MOUSE_BUTTON = 0;
var ENTER_KEY = 13;
var ESC_CODE = 27;
var typeOptions = ['palace', 'flat', 'house', 'bungalo'];
var timeOptions = ['12:00', '13:00', '14:00'];
var featureOptions = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var photoOptions = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var descriptionOptions = ['Описание 1', 'Описание 2', 'Описание 3', 'Описание 4', 'Описание 5', 'Описание 6', 'Описание 7', 'Описание 8'];
var titleOptions = ['Уютный отель в центре', 'Апартаменты для всей семьи', 'Гостиница рядом с аэропортом', 'Просторное бунгало у реки'];

// возвращает одно рандомное значение из заданного промежутка
var getRandomFromSegment = function (min, max) {
  return Math.round(min - 0.5 + Math.random() * (max - min + 1));
};

// возвращает одно рандомное значение из заданного массива
var chooseRandomElement = function (array) {
  return array[Math.floor(Math.random() * array.length)];
};

// возвращает массив рандомной длины
var getRandomArray = function (array) {
  var number = getRandomFromSegment(1, array.length);
  var items = [];
  for (var i = 0; i < number; i++) {
    items.push(array[i]);
  }
  return items;
};

// создаёт один рандомный объект
var createObject = function () {
  return {
    author: {avatar: 'img/avatars/user' + '0' + (i + 1) + '.png'},
    offer: {
      title: chooseRandomElement(titleOptions),
      address: '600, 350',
      price: getRandomFromSegment(30000, 100000) + 'руб.',
      type: chooseRandomElement(typeOptions),
      rooms: getRandomFromSegment(1, 10),
      guests: getRandomFromSegment(1, 10),
      checkin: chooseRandomElement(timeOptions),
      checkout: chooseRandomElement(timeOptions),
      features: getRandomArray(featureOptions),
      description: chooseRandomElement(descriptionOptions),
      photos: getRandomArray(photoOptions)
    },
    location: {
      x: getRandomFromSegment(1, 1200),
      y: getRandomFromSegment(130, 630)
    }
  };
};

// создаёт цикл генерации 8 рандомных объектов
var randomAds = [];
for (var i = 0; i < ADS_AMOUNT; i++) {
  randomAds[i] = createObject();
}

// 3. Данные метки
var pins = document.querySelector('.map__pins');
var template = document.querySelector('#pin').content.querySelector('.map__pin');

// Создаёт шаблон метки
var renderDraftPin = function (pin) {
  var userPin = template.cloneNode(true);
  userPin.style.left = (pin.location.x - PIN_WIDTH / 2) + 'px';
  userPin.style.top = (pin.location.y - PIN_HEIGHT) + 'px';
  userPin.querySelector('img').src = pin.author.avatar;
  userPin.querySelector('img').alt = pin.offer.title;

  return userPin;
};

// создаёт фрагмент
var fragment = document.createDocumentFragment();

// создаёт метки
var createPins = function (array) {
  for (var j = 0; j < array.length; j++) {
    fragment.appendChild(renderDraftPin(array[j]));
  }
  pins.appendChild(fragment);
};

// находит и копирует шаблон карточки
var templateCard = document.querySelector('#card').content;
var mapCard = templateCard.querySelector('.map__card').cloneNode(true);

// создаёт элемент списка .popup__feature
var createFeature = function (feature) {
  var featureElement = document.createElement('li');
  featureElement.className = 'popup__feature popup__feature--' + feature;

  return featureElement;
};

// вставляет элементы списка .popup__feature на страницу
var createFeatures = function (features) {
  features.forEach(function (feature) {
    fragment.appendChild(createFeature(feature));
  });

  return fragment;
};

// создаёт элемент .popup__photo
var imgElement = function (img) {
  for (var j = 0; j < img.length; j++) {
    var photo = document.createElement('img');
    photo.classList.add('popup__photo');
    photo.src = img[j];
    photo.alt = 'Фотография ' + j;
    photo.style = 'width: 45px; height: 40px;';
    fragment.appendChild(photo);
  }
};

// удаляет заданный элемент
var removeElement = function (parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
};

// создаёт данные карточки объявления
var renderCard = function (index) {
  // удаляет существующие элементы photos и features в разметке
  removeElement(mapCard.querySelector('.popup__photos'));
  removeElement(mapCard.querySelector('.popup__features'));

  imgElement(randomAds[index].offer.photos);
  mapCard.querySelector('.popup__photos').appendChild(fragment);
  mapCard.querySelector('.popup__title').textContent = randomAds[index].offer.title;
  mapCard.querySelector('.popup__text--address').textContent = randomAds[index].offer.address;
  mapCard.querySelector('.popup__text--price').textContent = randomAds[index].offer.price + '₽/ночь';
  mapCard.querySelector('.popup__text--capacity ').textContent = randomAds[index].offer.rooms + ' комнаты для ' + randomAds[index].offer.guests + ' гостей';
  mapCard.querySelector('.popup__text--time').textContent = 'Заезд после ' + randomAds[index].offer.checkin + ', выезд до' + randomAds[index].offer.checkout;
  mapCard.querySelector('.popup__features').innerHTML = '';
  mapCard.querySelector('.popup__features').appendChild(createFeatures(randomAds[index].offer.features));
  mapCard.querySelector('.popup__description').textContent = randomAds[index].offer.description;
  mapCard.querySelector('.popup__avatar').src = randomAds[index].author.avatar;

  if (randomAds[index].offer.type === 'flat') {
    mapCard.querySelector('.popup__type').textContent = 'Квартира';
  } else if (randomAds[index].offer.type === 'bungalo') {
    mapCard.querySelector('.popup__type').textContent = 'Бунгало';
  } else if (randomAds[index].offer.type === 'house') {
    mapCard.querySelector('.popup__type').textContent = 'Дом';
  } else if (randomAds[index].offer.type === 'palace') {
    mapCard.querySelector('.popup__type').textContent = 'Дворец';
  }
  return mapCard;
};

// создаёт карточку
var map = document.querySelector('.map');
var createCard = function (index) {
  fragment.appendChild(renderCard(index));
  map.appendChild(fragment);

  // закрывает объявление
  var popupClose = document.querySelector('.popup__close');
  popupClose.addEventListener('click', function () {
    mapCard.remove();
  });
};

document.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ESC_CODE) {
    mapCard.remove();
  }
});

// деактивирует страницу
var fieldsetElements = document.getElementsByTagName('fieldset');
var selectElements = document.getElementsByTagName('select');

// активирует страницу
var mainButton = document.querySelector('.map__pin--main');

var activateselectElements = function (array, isDisabled) {
  for (var j = 0; j < array.length; j++) {
    array[j].disabled = isDisabled;
  }
};

activateselectElements(selectElements, true);
activateselectElements(fieldsetElements, true);

var activatePage = function (array) {
  for (var j = 0; j < array.length; j++) {
    array[j].disabled = false;
  }

  // выводит объявления
  createPins(randomAds);

  // создаёт массив меток
  var pinsList = [];
  for (var k = 0; k < ADS_AMOUNT; k++) {
    pinsList[k] = createPins(randomAds[k]); //
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
      mapCard.remove();
      createCard(index);
    });
    if (evt.keyCode === ENTER_KEY) {
      item.addEventListener('keydown', function () {
        mapCard.remove();
        createCard(index);
      });
    }
  });
};

mainButton.addEventListener('mousedown', function (evt) {
  if (evt.button === LEFT_MOUSE_BUTTON) {
    activatePage(fieldsetElements);
    activateselectElements(selectElements, false);
    activateselectElements(selectElements, false);
  }
});

// активация по нажатию Enter
mainButton.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEY) {
    activatePage(fieldsetElements);
    activateselectElements(selectElements, false);
    activateselectElements(selectElements, false);
  }
});

// вычисляет координаты относительно окна
var pinX = mainButton.offsetLeft;
var pinY = mainButton.offsetTop;
var addressArea = document.getElementById('address');

// в состоянии disabled метка является кругом и расстояние до центра вычисляю прибавляя половину ширины метки (радиус)
var currentCoordinatesDisabled = [Math.round(pinX) + (PIN_WIDTH / 2), Math.round(pinY) + (PIN_WIDTH / 2)];
// в активном состоянии для вычисления координаты Y острого конца метки прибавляю всю её высоту
var currentCoordinates = [Math.round(pinX) + (PIN_WIDTH / 2), Math.round(pinY) + PIN_HEIGHT];

var getAddress = function () {
  addressArea.value = currentCoordinatesDisabled[0] + ',' + currentCoordinatesDisabled[1];
  mainButton.addEventListener('mousedown', function (evt) {
    if (evt.button === LEFT_MOUSE_BUTTON) {
      addressArea.value = currentCoordinates[0] + ',' + currentCoordinates[1];
    }
  });
};

getAddress();

// проверяет соответствие 'количество комнат и гостей'
var capacity = document.getElementById('capacity');
var roomNumber = document.getElementById('room_number');

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
var housingType = document.getElementById('type');
var priceOfHousing = document.getElementById('price');

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
var timeIn = document.getElementById('timein');
var timeOut = document.getElementById('timeout');

timeIn.addEventListener('change', function () {
  timeOut.value = timeIn.value;
});

timeOut.addEventListener('change', function () {
  timeIn.value = timeOut.value;
});
