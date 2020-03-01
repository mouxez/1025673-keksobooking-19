'use strict';

(function () {
  var typeOptions = ['palace', 'flat', 'house', 'bungalo'];
  var timeOptions = ['12:00', '13:00', '14:00'];
  var featureOptions = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var photoOptions = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
  var descriptionOptions = ['Описание 1', 'Описание 2', 'Описание 3', 'Описание 4', 'Описание 5', 'Описание 6', 'Описание 7', 'Описание 8'];
  var titleOptions = ['Уютный отель в центре', 'Апартаменты для всей семьи', 'Гостиница рядом с аэропортом', 'Просторное бунгало у реки'];

  // создаёт один рандомный объект
  var createObject = function () {
    return {
      author: {avatar: 'img/avatars/user' + '0' + (i + 1) + '.png'},
      offer: {
        title: window.util.chooseRandomElement(titleOptions),
        address: '600, 350',
        price: window.util.getRandomFromSegment(30000, 100000) + 'руб.',
        type: window.util.chooseRandomElement(typeOptions),
        rooms: window.util.getRandomFromSegment(1, 10),
        guests: window.util.getRandomFromSegment(1, 10),
        checkin: window.util.chooseRandomElement(timeOptions),
        checkout: window.util.chooseRandomElement(timeOptions),
        features: window.util.getRandomArray(featureOptions),
        description: window.util.chooseRandomElement(descriptionOptions),
        photos: window.util.getRandomArray(photoOptions)
      },
      location: {
        x: window.util.getRandomFromSegment(1, 1200),
        y: window.util.getRandomFromSegment(130, 630)
      }
    };
  };

  // создаёт цикл генерации 8 рандомных объектов
  var randomAds = [];
  window.randomAds = randomAds;
  for (var i = 0; i < window.const.ADS_AMOUNT; i++) {
    randomAds[i] = createObject();
  }
})();
