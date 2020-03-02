'use strict';

(function () {
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
      window.const.FRAGMENT.appendChild(createFeature(feature));
    });

    return window.const.FRAGMENT;
  };

  // создаёт элемент .popup__photo
  var imgElement = function (img) {
    for (var j = 0; j < img.length; j++) {
      var photo = document.createElement('img');
      photo.classList.add('popup__photo');
      photo.src = img[j];
      photo.alt = 'Фотография ' + j;
      photo.style = 'width: 45px; height: 40px;';
      window.const.FRAGMENT.appendChild(photo);
    }
  };

  // создаёт данные карточки объявления
  var renderCard = function (index) {
    // удаляет существующие элементы photos и features в разметке
    window.util.removeElement(mapCard.querySelector('.popup__photos'));
    window.util.removeElement(mapCard.querySelector('.popup__features'));

    imgElement(window.randomAds[index].offer.photos);
    mapCard.querySelector('.popup__photos').appendChild(window.const.FRAGMENT);
    mapCard.querySelector('.popup__title').textContent = window.randomAds[index].offer.title;
    mapCard.querySelector('.popup__text--address').textContent = window.randomAds[index].offer.address;
    mapCard.querySelector('.popup__text--price').textContent = window.randomAds[index].offer.price + '₽/ночь';
    mapCard.querySelector('.popup__text--capacity ').textContent = window.randomAds[index].offer.rooms + ' комнаты для ' + window.randomAds[index].offer.guests + ' гостей';
    mapCard.querySelector('.popup__text--time').textContent = 'Заезд после ' + window.randomAds[index].offer.checkin + ', выезд до' + window.randomAds[index].offer.checkout;
    mapCard.querySelector('.popup__features').innerHTML = '';
    mapCard.querySelector('.popup__features').appendChild(createFeatures(window.randomAds[index].offer.features));
    mapCard.querySelector('.popup__description').textContent = window.randomAds[index].offer.description;
    mapCard.querySelector('.popup__avatar').src = window.randomAds[index].author.avatar;

    if (window.randomAds[index].offer.type === 'flat') {
      mapCard.querySelector('.popup__type').textContent = 'Квартира';
    } else if (window.randomAds[index].offer.type === 'bungalo') {
      mapCard.querySelector('.popup__type').textContent = 'Бунгало';
    } else if (window.randomAds[index].offer.type === 'house') {
      mapCard.querySelector('.popup__type').textContent = 'Дом';
    } else if (window.randomAds[index].offer.type === 'palace') {
      mapCard.querySelector('.popup__type').textContent = 'Дворец';
    }
    return mapCard;
  };

  // создаёт карточку
  var map = document.querySelector('.map');
  var createCard = function (index) {
    window.const.FRAGMENT.appendChild(renderCard(index));
    map.appendChild(window.const.FRAGMENT);

    // закрывает объявление
    var popupClose = document.querySelector('.popup__close');
    popupClose.addEventListener('click', function () {
      mapCard.remove();
    });
  };
  document.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.const.ESC_CODE) {
      mapCard.remove();
    }
  });
  window.mapCard = mapCard;
  window.createCard = createCard;
})();
