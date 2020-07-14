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
var MAIN_PIN_WIDTH = 65;
var MAIN_PIN_HEIGHT = 85;

// Переменные

var map = document.querySelector('.map');
var pinMain = map.querySelector('.map__pin--main');
var pinList = document.querySelector('.map__pins');
var mapFilter = document.querySelector('.map__filters-container');
var mapFilterForm = mapFilter.querySelector('.map__filters');
var adForm = document.querySelector('.ad-form');
var adFormAddress = adForm.querySelector('#address');
var adFormType = adForm.querySelector('#type');
var adFormPrice = adForm.querySelector('#price');
var adFormTimeIn = adForm.querySelector('#timein');
var adFormTimeOut = adForm.querySelector('#timeout');
var adFormRoomNumber = adForm.querySelector('#room_number');
var adFormCapacity = adForm.querySelector('#capacity');

// Переменные с template

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

// Функция удаления/добавления атрибута disabled для элемента

var toggleDisabled = function (element, isDisabled) {
  if (isDisabled) {
    element.disabled = false;
    return element;
  }

  element.disabled = true;
  return element;
};

// Функция для получения координат метки

var getCoordinates = function (isActive) {
  var left = pinMain.style.left;
  var x = parseInt(left, 10);

  var top = pinMain.style.top;
  var y = parseInt(top, 10);

  if (isActive) {
    return (x + MAIN_PIN_WIDTH / 2) + ', ' + (y + MAIN_PIN_HEIGHT);
  }

  return (x + MAIN_PIN_WIDTH / 2) + ', ' + (y + MAIN_PIN_HEIGHT / 2);
};

// Функция, которая задает неактивное состояние страницы

var setInactiveState = function () {

  if (!map.classList.contains('map--faded')) {
    map.classList.add('map--faded');
  }

  for (var i = 0; i < mapFilterForm.childNodes.length; i++) {
    toggleDisabled(mapFilterForm.childNodes[i]);
  }

  if (!adForm.classList.contains('ad-form--disabled')) {
    adForm.classList.add('ad-form--disabled');
  }

  for (var j = 0; j < adForm.childNodes.length; j++) {
    toggleDisabled(adForm.childNodes[j]);
  }

  adFormAddress.value = getCoordinates();
};

// Функция, которая задает активное состояние страницы

var setActiveState = function () {
  map.classList.remove('map--faded');

  for (var i = 0; i < mapFilterForm.childNodes.length; i++) {
    toggleDisabled(mapFilterForm.childNodes[i], true);
  }

  adForm.classList.remove('ad-form--disabled');

  for (var j = 0; j < adForm.childNodes.length; j++) {
    toggleDisabled(adForm.childNodes[j], true);
  }

  adFormAddress.value = getCoordinates(true);

  adFormRoomNumber.addEventListener('change', onChangeRoomCapacity);
  adFormCapacity.addEventListener('change', onChangeRoomCapacity);
  adFormTimeIn.addEventListener('change', function (evt) {
    onChangeTime(evt.target);
  });
  adFormTimeOut.addEventListener('change', function (evt) {
    onChangeTime(evt.target);
  });
  adFormType.addEventListener('change', onChangeType);

  renderPinList(offers);
};

// Функция проверки вместимости комнат

var onChangeRoomCapacity = function () {
  var rooms = adFormRoomNumber.value;
  var guests = adFormCapacity.value;
  var errorMessage = '';

  switch (rooms) {
    case '100':
      if (guests > '0') {
        errorMessage = 'Такие места не подходят для размещения гостей';
      }
      break;
    case '3':
      if (guests < '1') {
        errorMessage = 'Количество гостей не может быть меньше 1';
      }
      break;
    case '2':
      if (guests < '1') {
        errorMessage = 'Количество гостей не может быть меньше 1';
      } else if (guests > '2') {
        errorMessage = 'Количество гостей не может быть больше 2';
      }
      break;
    case '1':
      if (guests < '1') {
        errorMessage = 'Количество гостей не может быть меньше 1';
      } else if (guests > '1') {
        errorMessage = 'Количество гостей не может быть больше 1';
      }
      break;
  }

  adFormCapacity.setCustomValidity(errorMessage);
};

// Функция проверки времени выезда/заезда

var onChangeTime = function (element) {
  var firstTime = element;
  var secondTime = adFormTimeOut;

  if (firstTime.id === 'timeout') {
    secondTime = adFormTimeIn;
  }

  secondTime.options.selectedIndex = firstTime.options.selectedIndex;
};

// Функция проверки соответствия типа жилья и цены за ночь

var onChangeType = function () {
  var type = adFormType.value;

  switch (type) {
    case 'bungalo':
      adFormPrice.min = 0;
      adFormPrice.placeholder = '0';
      break;
    case 'flat':
      adFormPrice.min = 1000;
      adFormPrice.placeholder = '1000';
      break;
    case 'house':
      adFormPrice.min = 5000;
      adFormPrice.placeholder = '5000';
      break;
    case 'palace':
      adFormPrice.min = 10000;
      adFormPrice.placeholder = '10000';
      break;
  }
};

// Функция, открывающая карточку

var openCard = function (element) {
  var pinButtons = [].slice.call(map.querySelectorAll('.map__pin'), 0);
  var index = pinButtons.indexOf(element);

  if (index === 0) {
    return;
  }

  if (document.querySelector('.map__card')) {
    closeCard();
  }

  mapFilter.insertAdjacentElement('beforeBegin', renderCardItem(offers[index - 1]));

  document.addEventListener('keydown', onCardEscPress);

  var cardCloseButton = document.querySelector('.popup__close');
  cardCloseButton.addEventListener('click', function () {
    closeCard();
  });
};

// Функция, закрывающая карточку

var closeCard = function () {
  var card = map.querySelector('.map__card');
  card.remove();
  document.removeEventListener('keydown', onCardEscPress);
};

// Функция, обрабатывающая нажатие на Esc

var onCardEscPress = function (evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    closeCard();
  }
};

// Основная часть

setInactiveState();
var offers = getOffersData(OFFER_AMOUNT);

// Запуск страницы при взаимодействии с pinMain

pinMain.addEventListener('mousedown', function (evt) {
  if (evt.button === 0) {
    setActiveState();
  }
});

pinMain.addEventListener('keydown', function (evt) {
  if (evt.key === 'Enter') {
    setActiveState();
  }
});

map.addEventListener('click', function (evt) {
  var element = evt.target;

  if (element.classList.contains('map__pin')) {
    openCard(element);
  } else if (element.parentNode.classList.contains('map__pin')) {
    element = element.parentNode;
    openCard(element);
  }
});
