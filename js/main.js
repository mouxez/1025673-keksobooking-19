'use strict';

var PIN_WIDTH = 50;
var PIN_HEIGHT = 70;
var PIN_ENDING = 10;
var ADS_AMOUNT = 8;
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

// создаёт объявления
var createPins = function (array) {
  for (var j = 0; j < array.length; j++) {
    fragment.appendChild(renderDraftPin(array[j]));
  }
  pins.appendChild(fragment);
};

// находит и копирует шаблон карточки
// var templateCard = document.querySelector('#card').content;
// var mapCard = templateCard.querySelector('.map__card').cloneNode(true);

// создаёт элемент списка .popup__feature
// var createFeature = function (feature) {
//   var featureElement = document.createElement('li');
//   featureElement.className = 'popup__feature popup__feature--' + feature;

//   return featureElement;
// };

// вставляет элементы списка .popup__feature на страницу
// var createFeatures = function (features) {
//   features.forEach(function (feature) {
//     fragment.appendChild(createFeature(feature));
//   });

//   return fragment;
// };

// создаёт элемент .popup__photo
// var imgElement = function (img) {
//   for (var j = 0; j < img.length; j++) {
//     var photo = document.createElement('img');
//     photo.classList.add('popup__photo');
//     photo.src = img[j];
//     photo.alt = 'Фотография ' + j;
//     photo.style = 'width: 45px; height: 40px;';
//     fragment.appendChild(photo);
//   }
// };

// удаляет заданный элемент
// var removeElement = function (parent) {
//   while (parent.firstChild) {
//     parent.removeChild(parent.firstChild);
//   }
// };

// создаёт данные карточки объявления
// var renderCard = function () {
//   // удаляет существующие элементы photos и features в разметке
//   removeElement(mapCard.querySelector('.popup__photos'));
//   removeElement(mapCard.querySelector('.popup__features'));

//   imgElement(randomAds[0].offer.photos);
//   mapCard.querySelector('.popup__photos').appendChild(fragment);
//   mapCard.querySelector('.popup__title').textContent = randomAds[0].offer.title;
//   mapCard.querySelector('.popup__text--address').textContent = randomAds[0].offer.address;
//   mapCard.querySelector('.popup__text--price').textContent = randomAds[0].offer.price + '₽/ночь';
//   mapCard.querySelector('.popup__text--capacity ').textContent = randomAds[0].offer.rooms + ' комнаты для ' + randomAds[0].offer.guests + ' гостей';
//   mapCard.querySelector('.popup__text--time').textContent = 'Заезд после ' + randomAds[0].offer.checkin + ', выезд до' + randomAds[0].offer.checkout;
//   mapCard.querySelector('.popup__features').innerHTML = '';
//   mapCard.querySelector('.popup__features').appendChild(createFeatures(randomAds[0].offer.features));
//   mapCard.querySelector('.popup__description').textContent = randomAds[0].offer.description;
//   mapCard.querySelector('.popup__avatar').src = randomAds[0].author.avatar;

//   if (randomAds[0].offer.type === 'flat') {
//     mapCard.querySelector('.popup__type').textContent = 'Квартира';
//   } else if (randomAds[0].offer.type === 'bungalo') {
//     mapCard.querySelector('.popup__type').textContent = 'Бунгало';
//   } else if (randomAds[0].offer.type === 'house') {
//     mapCard.querySelector('.popup__type').textContent = 'Дом';
//   } else if (randomAds[0].offer.type === 'palace') {
//     mapCard.querySelector('.popup__type').textContent = 'Дворец';
//   }

//   return mapCard;
// };

// создаёт карточку
// var map = document.querySelector('.map');
// var createCard = function () {
//   fragment.appendChild(renderCard());
//   map.appendChild(fragment);
// };

// выводит первую карточку
// createCard();

// деактивирует страницу
var fieldsetElements = document.getElementsByTagName('fieldset');
var selectElements = document.getElementsByTagName('select');

var disablePage = function (array) {
  for (var j = 0; j < array.length; j++) {
    array[j].disabled = true;
  }
};

disablePage(fieldsetElements, selectElements);

// активирует страницу
var mainButton = document.querySelector('.map__pin--main');
var ENTER_KEY = 'Enter';

var activatePage = function (array) {
  for (var j = 0; j < array.length; j++) {
    array[j].disabled = false;
  }

  // выводит объявления
  createPins(randomAds);

  // убирает класс .map--faded у блока с картой
  document.querySelector('.map').classList.remove('map--faded');
};

mainButton.addEventListener('mousedown', function (evt) {
  if (evt.button === 0) {
    activatePage(fieldsetElements, selectElements);
  }
});

// активация по нажатию Enter
mainButton.addEventListener('keydown', function (evt) {
  if (evt.key === ENTER_KEY) {
    activatePage(fieldsetElements, selectElements);
  }
});

// вычисляет координаты относительно окна
var pinCoordinate = mainButton.getBoundingClientRect();
var addressArea = document.getElementById('address');
var currentCoordinatesDisabled = [Math.round(pinCoordinate.left) + (PIN_WIDTH / 2) + pageXOffset, Math.round(pinCoordinate.top) + (PIN_HEIGHT / 2) + pageYOffset];
var currentCoordinates = [Math.round(pinCoordinate.left) + (PIN_WIDTH / 2) + pageXOffset, Math.round(pinCoordinate.top) + PIN_HEIGHT + PIN_ENDING + pageYOffset];

var getAddress = function () {
  addressArea.value = currentCoordinatesDisabled;
  mainButton.addEventListener('mousedown', function (evt) {
    if (evt.button === 0) {
      addressArea.value = currentCoordinates[0] + ',' + currentCoordinates[1];
    }
  });
  mainButton.addEventListener('mousemove', function () {
    addressArea.value = currentCoordinates[0] + ',' + currentCoordinates[1];
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

checkGuest();
