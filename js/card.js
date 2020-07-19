'use strict';

(function () {
  var IMAGE_WIDTH = 45;
  var IMAGE_HEIGHT = 40;

  var cardTemplate = document.querySelector('#card').content;

  var renderCardFeatures = function (features) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < features.length; i++) {
      var feature = document.createElement('li');
      feature.classList.add('popup__feature', 'popup__feature--' + features[i]);
      fragment.appendChild(feature);
    }

    return fragment;
  };

  var renderCardImages = function (images) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < images.length; i++) {
      var image = document.createElement('img');
      image.classList.add('popup__photo');
      image.src = images[i];
      image.width = IMAGE_WIDTH;
      image.height = IMAGE_HEIGHT;
      image.alt = 'Фотография жилья';
      fragment.appendChild(image);
    }

    return fragment;
  };

  window.card = {
    render: function (offerItem) {
      var cardItem = cardTemplate.cloneNode(true).querySelector('.map__card');
      var cardFeatures = cardItem.querySelector('.popup__features');
      var cardImages = cardItem.querySelector('.popup__photos');

      cardItem.querySelector('.popup__title').textContent = offerItem.offer.title;
      cardItem.querySelector('.popup__text--address').textContent = offerItem.offer.address;
      cardItem.querySelector('.popup__text--price').textContent = offerItem.offer.price + '₽/ночь';

      switch (offerItem.offer.type) {
        case 'palace':
          cardItem.querySelector('.popup__type').textContent = 'Дворец';
          break;
        case 'flat':
          cardItem.querySelector('.popup__type').textContent = 'Квартира';
          break;
        case 'house':
          cardItem.querySelector('.popup__type').textContent = 'Дом';
          break;
        case 'bungalo':
          cardItem.querySelector('.popup__type').textContent = 'Бунгало';
          break;
      }

      cardItem.querySelector('.popup__text--capacity').textContent = offerItem.offer.rooms + ' комнаты для ' + offerItem.offer.guests + ' гостей';
      cardItem.querySelector('.popup__text--time').textContent = 'Заезд после ' + offerItem.offer.checkin + ', выезд до ' + offerItem.offer.checkout;

      cardFeatures.innerHTML = '';
      cardFeatures.appendChild(renderCardFeatures(offerItem.offer.features));

      cardItem.querySelector('.popup__description').textContent = offerItem.offer.description;

      cardImages.innerHTML = '';
      cardImages.appendChild(renderCardImages(offerItem.offer.photos));

      cardItem.querySelector('.popup__avatar').src = offerItem.author.avatar;

      return cardItem;
    }
  };
})();
