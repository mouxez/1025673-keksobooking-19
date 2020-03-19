'use strict';

(function () {
  var housingType = document.querySelector('#housing-type');
  var housingPrice = document.querySelector('#housing-price');
  var housingRoom = document.querySelector('#housing-rooms');
  var housingGuest = document.querySelector('#housing-guests');

  var featureWifi = document.querySelector('#filter-wifi');
  var featureDishwasher = document.querySelector('#filter-dishwasher');
  var featureParking = document.querySelector('#filter-parking');
  var featureWasher = document.querySelector('#filter-washer');
  var featureElevator = document.querySelector('#filter-elevator');
  var featureConditioner = document.querySelector('#filter-conditioner');

  var onFilterChange = function (array) {
    var filteredType = housingType.value;
    var filteredPrice = housingPrice.value;
    var filteredRoom = housingRoom.value;
    var filteredGuest = housingGuest.value;

    var typeFilteredOffers = array.filter(function (adOffer) {
      if (filteredType === 'any') {
        return adOffer;
      }

      return adOffer.offer.type === filteredType;
    });

    var priceFilteredOffers = typeFilteredOffers.filter(function (adOffer) {
      if (filteredPrice === 'middle') {
        return (adOffer.offer.price >= 10000 && adOffer.offer.price <= 50000);
      } else if (filteredPrice === 'low') {
        return (adOffer.offer.price < 10000);
      } else if (filteredPrice === 'high') {
        return (adOffer.offer.price > 50000);
      }

      return adOffer;
    });

    var roomsFilteredOffers = priceFilteredOffers. filter(function (adOffer) {
      if (filteredRoom === 'any') {
        return adOffer;
      }

      return adOffer.offer.rooms === Number(filteredRoom);
    });

    var guestsFilteredOffers = roomsFilteredOffers.filter(function (adOffer) {
      if (filteredGuest === 'any') {
        return adOffer;
      }

      return adOffer.offer.guests === Number(filteredGuest);
    });

    var wifiFilteredOffers = guestsFilteredOffers.filter(function (adOffer) {
      if (featureWifi.checked === true) {
        return adOffer.offer.features.includes('wifi');
      }

      return adOffer;
    });

    var dishwasherFilteredOffers = wifiFilteredOffers.filter(function (adOffer) {
      if (featureDishwasher.checked === true) {
        return adOffer.offer.features.includes('dishwasher');
      }

      return adOffer;
    });

    var parkingFilteredOffers = dishwasherFilteredOffers.filter(function (adOffer) {
      if (featureParking.checked === true) {
        return adOffer.offer.features.includes('parking');
      }

      return adOffer;
    });

    var washerFilteredOffers = parkingFilteredOffers.filter(function (adOffer) {
      if (featureWasher.checked === true) {
        return adOffer.offer.features.includes('washer');
      }

      return adOffer;
    });

    var elevatorFilteredOffers = washerFilteredOffers.filter(function (adOffer) {
      if (featureElevator.checked === true) {
        return adOffer.offer.features.includes('elevator');
      }

      return adOffer;
    });

    var conditionerFilteredOffers = elevatorFilteredOffers.filter(function (adOffer) {
      if (featureConditioner.checked === true) {
        return adOffer.offer.features.includes('conditioner');
      }

      return adOffer;
    });

    var filteredOffers = conditionerFilteredOffers;
    return filteredOffers;
  };

  window.filter = {
    onFilterChange: onFilterChange
  };
})();
