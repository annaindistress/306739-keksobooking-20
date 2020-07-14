'use strict';

(function () {
  var OFFER_AMOUNT = 8;
  var AVATAR_IMG_ADDRESS = 'img/avatars/user0';
  var AVATAR_IMG_FORMAT = '.png';
  var OFFER_TYPES = ['palace', 'flat', 'house', 'bungalo'];
  var OFFER_TIMES = ['12:00', '13:00', '14:00'];
  var OFFER_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var OFFER_PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
  var PIN_X_MAX = 1200;
  var PIN_Y_MIN = 130;
  var PIN_Y_MAX = 630;

  // Функция создания массива из сгенерированных JS-объектов

  var getOffersData = function (amount) {
    var offers = [];

    for (var i = 0; i < amount; i++) {
      var offerLocationX = window.util.getRandomInt(PIN_X_MAX);
      var offerLocationY = window.util.getRandomInt(PIN_Y_MIN, PIN_Y_MAX);

      offers[i] = {
        author: {
          avatar: AVATAR_IMG_ADDRESS + String(i + 1) + AVATAR_IMG_FORMAT
        },
        location: {
          x: offerLocationX,
          y: offerLocationY
        },
        offer: {
          title: 'Заголовок предложения',
          address: offerLocationX + ', ' + offerLocationY,
          price: 0,
          type: window.util.getRandomArrayElement(OFFER_TYPES),
          rooms: 0,
          guests: 0,
          checkin: window.util.getRandomArrayElement(OFFER_TIMES),
          checkout: window.util.getRandomArrayElement(OFFER_TIMES),
          features: window.util.getRandomArray(OFFER_FEATURES),
          description: 'Строка с описанием',
          photos: window.util.getRandomArray(OFFER_PHOTOS)
        }
      };
    }

    return offers;
  };

  var generatedOffers = getOffersData(OFFER_AMOUNT);

  window.data = {
    offers: generatedOffers
  };
})();
