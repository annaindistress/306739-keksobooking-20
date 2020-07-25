'use strict';

(function () {
  var PRICE_LOW = 10000;
  var PRICE_HIGH = 50000;
  var FILTER_DEFAULT_VALUE = 'any';
  var FILTER_LOW_PRICE_VALUE = 'low';
  var FILTER_MIDDLE_PRICE_VALUE = 'middle';
  var FILTER_HIGHT_PRICE_VALUE = 'high';

  var type = document.querySelector('#housing-type');
  var price = document.querySelector('#housing-price');
  var roomsAmount = document.querySelector('#housing-rooms');
  var guestsAmount = document.querySelector('#housing-guests');
  var features = document.querySelector('#housing-features');

  var filterByType = function (item) {
    var typeValue = type.value;

    return typeValue !== FILTER_DEFAULT_VALUE ? item.offer.type === typeValue : [];
  };

  var filterByPrice = function (item) {
    var priceValue = price.value;

    switch (priceValue) {
      case FILTER_LOW_PRICE_VALUE:
        return item.offer.price < PRICE_LOW;
      case FILTER_MIDDLE_PRICE_VALUE:
        return item.offer.price >= PRICE_LOW && item.offer.price <= PRICE_HIGH;
      case FILTER_HIGHT_PRICE_VALUE:
        return item.offer.price > PRICE_HIGH;
      default:
        return [];
    }
  };

  var filterByRooms = function (item) {
    var roomsValue = roomsAmount.value;

    return roomsValue !== FILTER_DEFAULT_VALUE ? item.offer.rooms === parseInt(roomsValue, 10) : [];
  };

  var filterByGuests = function (item) {
    var guestsValue = guestsAmount.value;

    return guestsValue !== FILTER_DEFAULT_VALUE ? item.offer.guests === parseInt(guestsValue, 10) : [];
  };

  var filterByFeatures = function (item) {
    var selectedFeatures = Array.from(features.querySelectorAll('input:checked'));

    return selectedFeatures.every(function (feature) {
      return item.offer.features.includes(feature.value);
    });
  };

  window.filter = function (data) {
    var filteredOffers = [];

    data.forEach(function (item) {
      if (filterByType(item) && filterByPrice(item) && filterByRooms(item) && filterByGuests(item) && filterByFeatures(item)) {
        filteredOffers.push(item);
      }
    });
    return filteredOffers;
  };
})();
