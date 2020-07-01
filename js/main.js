'use strict';

// Константы

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
var PIN_WIDTH = 50;
var PIN_HEIGHT = 70;
var IMAGE_WIDTH = 45;
var IMAGE_HEIGHT = 40;

// Переменные

var map = document.querySelector('.map');
var mapFilters = document.querySelector('.map__filters-container');
var pinList = document.querySelector('.map__pins');
var pinTemplate = document.querySelector('#pin').content;
var cardTemplate = document.querySelector('#card').content;

// Функция генерации случайного числа от min до max

var getRandomInt = function (min, max) {
  if (max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  return Math.floor(Math.random() * (min + 1));
};

// Функция получения случайного значения из массива

var getRandomArrayElement = function (array) {
  var index = getRandomInt(array.length - 1);
  return array[index];
};

// Функция создания нового массива случайной длины из существующего

var getRandomArray = function (array) {
  var newArray = array;

  for (var i = newArray.length - 1; i > 0; i--) {
    var j = getRandomInt(i);
    var temp = newArray[i];
    newArray[i] = newArray[j];
    newArray[j] = temp;
  }

  return newArray.slice(0, getRandomInt(1, newArray.length));
};

// Функция создания массива из сгенерированных JS-объектов

var getOffersData = function (amount) {
  var offers = [];

  for (var i = 0; i < amount; i++) {
    var offerLocationX = getRandomInt(PIN_X_MAX);
    var offerLocationY = getRandomInt(PIN_Y_MIN, PIN_Y_MAX);

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
        type: getRandomArrayElement(OFFER_TYPES),
        rooms: 0,
        guests: 0,
        checkin: getRandomArrayElement(OFFER_TIMES),
        checkout: getRandomArrayElement(OFFER_TIMES),
        features: getRandomArray(OFFER_FEATURES),
        description: 'Строка с описанием',
        photos: getRandomArray(OFFER_PHOTOS)
      }
    };
  }

  return offers;
};

// Функция создания пин-метки на основе JS-объекта

var renderPinItem = function (offerItem) {
  var pinItem = pinTemplate.cloneNode(true).querySelector('button');
  var pinImg = pinItem.querySelector('img');

  pinItem.style.left = offerItem.location.x - PIN_WIDTH / 2 + 'px';
  pinItem.style.top = offerItem.location.y - PIN_HEIGHT + 'px';
  pinImg.src = offerItem.author.avatar;
  pinImg.alt = offerItem.offer.title;

  return pinItem;
};

// Функция заполнения карты пин-метками на основе массива JS-объектов

var renderPinList = function (offerList) {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < offerList.length; i++) {
    fragment.appendChild(renderPinItem(offerList[i]));
  }

  pinList.appendChild(fragment);
};

// Функция отрисовки преимуществ места

var renderCardFeatures = function (features) {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < features.length; i++) {
    var feature = document.createElement('li');
    feature.classList.add('popup__feature', 'popup__feature--' + features[i]);
    fragment.appendChild(feature);
  }

  return fragment;
};

// Функция отрисовки изображений места

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

// Функция создания карточки места на основе JS-объекта

var renderCardItem = function (offerItem) {
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
};

// Основная часть

map.classList.remove('map--faded');
var offers = getOffersData(OFFER_AMOUNT);
renderPinList(offers);
mapFilters.insertAdjacentElement('beforeBegin', renderCardItem(offers[0]));
