'use strict';

var PIN_WIDTH = 50;
var PIN_HEIGHT = 70;
var ADV_AMOUNT = 8;
var typeOptions = ['palace', 'flat', 'house', 'bungalo'];
var timeOptions = ['12:00', '13:00', '14:00'];
var featureOptions = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var photoOptions = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var descriptionOptions = ['Светлая и комфортная квартира', 'Близко к метро', 'Чудесный вид на сад', 'Новый ремонт'];

var getRandomFromSegment = function (min, max) {
  return Math.round(min - 0.5 + Math.random() * (max - min + 1));
};

var chooseRandomElement = function (array) {
  return array[Math.floor(Math.random() * array.length)];
};

var getRandomArray = function (array) {
  var number = getRandomFromSegment(1, array.length);
  var arrItems = [];
  for (var i = 0; i < number; i++) {
    arrItems.push(array[i]);
  }
  return arrItems;
};

// создаёт один рандомный объект
var advObject = function () {
  return {
    author:
  {avatar: 'img/avatars/user' + '0' + (i + 1) + '.png'},

    offer:
  {title: 'Сдаётся квартира',
    address: '600, 350',
    price: getRandomFromSegment(30000, 100000) + 'руб.',
    type: chooseRandomElement(typeOptions),
    rooms: getRandomFromSegment(1, 10),
    guests: getRandomFromSegment(1, 10),
    checkin: chooseRandomElement(timeOptions),
    checkout: chooseRandomElement(timeOptions),
    features: getRandomArray(featureOptions),
    description: chooseRandomElement(descriptionOptions),
    photos: getRandomArray(photoOptions)},

    location:
  {x: getRandomFromSegment(1, 1200),
    y: getRandomFromSegment(130, 630)}
  };
};

// создаёт цикл генерации 8 рандомных объектов
var randomAd = [];
for (var i = 0; i < ADV_AMOUNT; i++) {
  randomAd[i] = advObject();
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

// создаёт 8 объявлений
var createPins = function (array) {
  var fragment = document.createDocumentFragment();
  for (var j = 0; j < array.length; j++) {
    fragment.appendChild(renderDraftPin(array[j]));
  }
  pins.appendChild(fragment);
};

// выводит объявления
createPins(randomAd);
