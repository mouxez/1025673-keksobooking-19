'use strict';

var advAmount = 8;
var typeOptions = ['palace', 'flat', 'house', 'bungalo'];
var timeOptions = ['12:00', '13:00', '14:00'];
var featureOptions = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var photoOptions = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

// Вспомогательные функции

var randomFromSegment = function (min, max) {
  var rand = min - 0.5 + Math.random() * (max - min + 1);

  return Math.round(rand);
};

var chooseRandomElement = function (array) {

  return array[Math.floor(Math.random() * array.length)];
};

var createAuthor = function () {
  var avatar = 'img/avatars/user' + '0' + Math.floor(Math.random() * 8) + '.png'; // доработка неповтора

  return {avatar: avatar};
};

var createOffer = function () {
  var title = 'Просторная двушка в центре';
  var address = '600, 350';
  var price = 40 + ' ' + '000' + 'руб.';
  var type = chooseRandomElement(typeOptions);
  var rooms = 2;
  var guests = 3;
  var checkin = chooseRandomElement(timeOptions);
  var checkout = chooseRandomElement(timeOptions);
  var features = chooseRandomElement(featureOptions); // требует доработки
  var description = 'Светлая и комфортная квартира.';
  var photos = chooseRandomElement(photoOptions); // требует доработки

  return {title: title, address: address, price: price, type: type, rooms: rooms, guests: guests, checkin: checkin, checkout: checkout, features: features, description: description, photos: photos};
};

var createLocation = function () {
  var x = randomFromSegment(100, 200); // доработка
  var y = randomFromSegment(130, 630);

  return {x: x, y: y};
};

var advObject = function () {
  return {author: createAuthor(), offer: createOffer(), location: createLocation()};
};

var randomAd = [];
for (var i = 0; i < advAmount; i++) {
  randomAd[i] = advObject();
}


// document.querySelector('.map').classList.remove('.map--faded');
