'use strict';

(function () {
  var templateCard = document.querySelector('#card').content;
  var mapCard = templateCard.querySelector('.map__card').cloneNode(true);

  var createFeature = function (feature) {
    var featureElement = document.createElement('li');
    featureElement.className = 'popup__feature popup__feature--' + feature;

    return featureElement;
  };

  var createFeatures = function (features) {
    features.forEach(function (feature) {
      window.const.FRAGMENT.appendChild(createFeature(feature));
    });

    return window.const.FRAGMENT;
  };

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

  var renderCard = function (index) {
    window.util.removeElement(mapCard.querySelector('.popup__photos'));
    window.util.removeElement(mapCard.querySelector('.popup__features'));

    imgElement(window.data.adsList[index].offer.photos);
    mapCard.querySelector('.popup__photos').appendChild(window.const.FRAGMENT);
    mapCard.querySelector('.popup__title').textContent = window.data.adsList[index].offer.title;
    mapCard.querySelector('.popup__text--address').textContent = window.data.adsList[index].offer.address;
    mapCard.querySelector('.popup__text--price').textContent = window.data.adsList[index].offer.price + '₽/ночь';
    mapCard.querySelector('.popup__text--capacity ').textContent = window.data.adsList[index].offer.rooms + ' комнаты для ' + window.data.adsList[index].offer.guests + ' гостей';
    mapCard.querySelector('.popup__text--time').textContent = 'Заезд после ' + window.data.adsList[index].offer.checkin + ', выезд до' + window.data.adsList[index].offer.checkout;
    mapCard.querySelector('.popup__features').textContent = '';
    mapCard.querySelector('.popup__features').appendChild(createFeatures(window.data.adsList[index].offer.features));
    mapCard.querySelector('.popup__description').textContent = window.data.adsList[index].offer.description;
    mapCard.querySelector('.popup__avatar').src = window.data.adsList[index].author.avatar;

    if (window.data.adsList[index].offer.type === 'flat') {
      mapCard.querySelector('.popup__type').textContent = 'Квартира';
    } else if (window.data.adsList[index].offer.type === 'bungalo') {
      mapCard.querySelector('.popup__type').textContent = 'Бунгало';
    } else if (window.data.adsList[index].offer.type === 'house') {
      mapCard.querySelector('.popup__type').textContent = 'Дом';
    } else if (window.data.adsList[index].offer.type === 'palace') {
      mapCard.querySelector('.popup__type').textContent = 'Дворец';
    }
    return mapCard;
  };

  var map = document.querySelector('.map');
  var createCard = function (index) {
    window.const.FRAGMENT.appendChild(renderCard(index));
    map.appendChild(window.const.FRAGMENT);

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

  window.card = {
    mapCard: mapCard,
    createCard: createCard
  };
})();
