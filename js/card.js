'use strict';

(function () {
  var IMAGE_WIDTH = 45;
  var IMAGE_HEIGHT = 40;

  var offerTypeMap = {
    'palace': 'Дворец',
    'house': 'Дом',
    'flat': 'Квартира',
    'bungalo': 'Бунгало'
  };

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

  var renderCardItem = function (data) {
    var cardItem = cardTemplate.cloneNode(true).querySelector('.map__card');
    var cardFeatures = cardItem.querySelector('.popup__features');
    var cardImages = cardItem.querySelector('.popup__photos');

    cardItem.querySelector('.popup__title').textContent = data.offer.title;
    cardItem.querySelector('.popup__text--address').textContent = data.offer.address;
    cardItem.querySelector('.popup__text--price').textContent = data.offer.price + '₽/ночь';
    cardItem.querySelector('.popup__type').textContent = offerTypeMap[data.offer.type];

    cardItem.querySelector('.popup__text--capacity').textContent = data.offer.rooms + ' комнаты для ' + data.offer.guests + ' гостей';
    cardItem.querySelector('.popup__text--time').textContent = 'Заезд после ' + data.offer.checkin + ', выезд до ' + data.offer.checkout;

    cardFeatures.innerHTML = '';
    cardFeatures.appendChild(renderCardFeatures(data.offer.features));

    cardItem.querySelector('.popup__description').textContent = data.offer.description;

    cardImages.innerHTML = '';
    cardImages.appendChild(renderCardImages(data.offer.photos));

    cardItem.querySelector('.popup__avatar').src = data.author.avatar;

    return cardItem;
  };

  window.card = {
    render: renderCardItem
  };
})();
