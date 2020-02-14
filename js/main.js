'use strict';

var PIN_WIDTH = 50;
var PIN_HEIGHT = 70;
var ADS_AMOUNT = 8;
var typeOptions = ['palace', 'flat', 'house', 'bungalo'];
var timeOptions = ['12:00', '13:00', '14:00'];
var featureOptions = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var photoOptions = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var descriptionOptions = ['Описание 1', 'Описание 2', 'Описание 3', 'Описание 4', 'Описание 5', 'Описание 6', 'Описание 7', 'Описание 8'];

var getRandomFromSegment = function (min, max) {
  return Math.round(min - 0.5 + Math.random() * (max - min + 1));
};

var chooseRandomElement = function (array) {
  return array[Math.floor(Math.random() * array.length)];
};

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
      title: 'Сдаётся квартира',
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

// 2. убирает класс .map--faded у блока с картой
document.querySelector('.map').classList.remove('map--faded');

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

// создаёт объявления
var createPins = function (array) {
  var fragment = document.createDocumentFragment();
  for (var j = 0; j < array.length; j++) {
    fragment.appendChild(renderDraftPin(array[j]));
  }
  pins.appendChild(fragment);
};

// выводит объявления
createPins(randomAds);

// находит и копирует шаблон карточки
var templateCard = document.querySelector('#card').content;
var mockCard = templateCard.querySelector('.map__card').cloneNode(true);

// создаёт элемент списка
var createFeature = function (feature) {
  var featureElement = document.createElement('LI');
  featureElement.className = 'popup__feature popup__feature--' + feature;

  return featureElement;
};

// вставляет элементы списка на страницу
var createFeatures = function (features) {
  var fragment = document.createDocumentFragment();
  features.forEach(function (feature) {
    fragment.appendChild(createFeature(feature));
  });

  return fragment;
};

// создаёт данные карточки объявления
var renderCard = function () {
  mockCard.querySelector('.popup__title').textContent = randomAds[0].offer.title;
  mockCard.querySelector('.popup__text--address').textContent = randomAds[0].offer.address;
  mockCard.querySelector('.popup__text--price').textContent = randomAds[0].offer.price + '₽/ночь';
  mockCard.querySelector('.popup__text--capacity ').textContent = randomAds[0].offer.rooms + ' комнаты для ' + randomAds[0].offer.guests + ' гостей';
  mockCard.querySelector('.popup__text--time').textContent = 'Заезд после ' + randomAds[0].offer.checkin + ', выезд до' + randomAds[0].offer.checkout;
  mockCard.querySelector('.popup__features').innerHTML = '';
  mockCard.querySelector('.popup__features').appendChild(createFeatures(randomAds[0].offer.features));
  mockCard.querySelector('.popup__description').textContent = randomAds[0].offer.description;
  mockCard.querySelector('.popup__photos').src = randomAds[0].offer.photos;
  mockCard.querySelector('.popup__avatar').src = randomAds[0].author.avatar;

  if (randomAds[0].offer.type === 'flat') {
    mockCard.querySelector('.popup__type').textContent = 'Квартира';
  } else if (randomAds[0].offer.type === 'bungalo') {
    mockCard.querySelector('.popup__type').textContent = 'Бунгало';
  } else if (randomAds[0].offer.type === 'house') {
    mockCard.querySelector('.popup__type').textContent = 'Дом';
  } else if (randomAds[0].offer.type === 'palace') {
    mockCard.querySelector('.popup__type').textContent = 'Дворец';
  }

  return mockCard;
};

// создаёт карточку
var map = document.querySelector('.map');
var createCard = function () {
  var fragment = document.createDocumentFragment();
  fragment.appendChild(renderCard());
  map.appendChild(fragment);
};

// выводит первую карточку
createCard();
