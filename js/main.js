'use strict';

// Константы
var MAIN_PIN_WIDTH = 65;
var MAIN_PIN_HEIGHT = 85;

// Переменные

var map = document.querySelector('.map');
var pinMain = map.querySelector('.map__pin--main');
var pinList = document.querySelector('.map__pins');
var mapFilter = document.querySelector('.map__filters-container');
var mapFilterForm = mapFilter.querySelector('.map__filters');

// Функция заполнения карты пин-метками на основе массива JS-объектов

var renderPinList = function (offerList) {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < offerList.length; i++) {
    fragment.appendChild(window.pin.render(offerList[i]));
  }

  pinList.appendChild(fragment);
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

  if (!window.form.mainForm.classList.contains('ad-form--disabled')) {
    window.form.mainForm.classList.add('ad-form--disabled');
  }

  for (var j = 0; j < window.form.mainForm.childNodes.length; j++) {
    toggleDisabled(window.form.mainForm.childNodes[j]);
  }

  window.form.address.value = getCoordinates();

  window.form.roomNumber.removeEventListener('change', window.form.onChangeRoomCapacity);
  window.form.capacity.removeEventListener('change', window.form.onChangeRoomCapacity);
  window.form.timeIn.removeEventListener('change', window.form.onChangeTime);
  window.form.timeOut.removeEventListener('change', window.form.onChangeTime);
  window.form.type.removeEventListener('change', window.form.onChangeType);
};

// Функция, которая задает активное состояние страницы

var setActiveState = function () {
  map.classList.remove('map--faded');

  for (var i = 0; i < mapFilterForm.childNodes.length; i++) {
    toggleDisabled(mapFilterForm.childNodes[i], true);
  }

  window.form.mainForm.classList.remove('ad-form--disabled');

  for (var j = 0; j < window.form.mainForm.childNodes.length; j++) {
    toggleDisabled(window.form.mainForm.childNodes[j], true);
  }

  window.form.address.value = getCoordinates(true);

  window.form.roomNumber.addEventListener('change', window.form.onChangeRoomCapacity);
  window.form.capacity.addEventListener('change', window.form.onChangeRoomCapacity);
  window.form.timeIn.addEventListener('change', window.form.onChangeTime);
  window.form.timeOut.addEventListener('change', window.form.onChangeTime);
  window.form.type.addEventListener('change', window.form.onChangeType);

  renderPinList(window.data.offers);
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

  mapFilter.insertAdjacentElement('beforeBegin', window.card.render(window.data.offers[index - 1]));

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

// Открытие доступного предложения

map.addEventListener('click', function (evt) {
  var element = evt.target;

  if (element.classList.contains('map__pin')) {
    openCard(element);
  } else if (element.parentNode.classList.contains('map__pin')) {
    element = element.parentNode;
    openCard(element);
  }
});
