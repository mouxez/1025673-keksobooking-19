'use strict';

(function () {
  var templateCard = document.querySelector('#card').content;
  var mapCard = templateCard.querySelector('.map__card').cloneNode(true);
  var fragment = document.createDocumentFragment();

  var createFeature = function (feature) {
    var featureElement = document.createElement('li');
    featureElement.className = 'popup__feature popup__feature--' + feature;

    return featureElement;
  };

  var createFeatures = function (features) {
    features.forEach(function (feature) {
      fragment.appendChild(createFeature(feature));
    });

    return fragment;
  };

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

  var removeElement = function (parent) {
    while (parent.firstChild) {
      parent.removeChild(parent.firstChild);
    }
  };

  var renderCard = function (index) {
    removeElement(mapCard.querySelector('.popup__photos'));
    removeElement(mapCard.querySelector('.popup__features'));

    imgElement(window.data.adsList[index].offer.photos);
    mapCard.querySelector('.popup__photos').appendChild(fragment);
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
  var mapPinNodeList = document.querySelectorAll('.map__pin:not(.map__pin--main)');

  var map = document.querySelector('.map');
  var createCard = function (index) {
    fragment.appendChild(renderCard(index));
    map.appendChild(fragment);

    var popupClose = document.querySelector('.popup__close');
    popupClose.addEventListener('click', function () {
      mapCard.remove();
      mapPinNodeList = document.querySelectorAll('.map__pin:not(.map__pin--main)');
      [].forEach.call(mapPinNodeList, function (item) {
        item.classList.remove('map__pin--active', true);
      });
    });
  };
  document.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.const.ESC_CODE) {
      mapCard.remove();
      mapPinNodeList = document.querySelectorAll('.map__pin:not(.map__pin--main)');
      [].forEach.call(mapPinNodeList, function (item) {
        item.classList.remove('map__pin--active', true);
      });
    }
  });

  window.card = {
    mapCard: mapCard,
    createCard: createCard
  };
})();
