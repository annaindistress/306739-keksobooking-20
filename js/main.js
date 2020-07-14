'use strict';

// Константы
var MAIN_PIN_WIDTH = 65;
var MAIN_PIN_HEIGHT = 85;

// Переменные

var pinMain = window.map.item.querySelector('.map__pin--main');
var mapFilterForm = window.map.filter.querySelector('.map__filters');

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

  if (!window.map.item.classList.contains('map--faded')) {
    window.map.item.classList.add('map--faded');
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

  window.map.item.removeEventListener('click', window.map.onMapClick);
};

// Функция, которая задает активное состояние страницы

var setActiveState = function () {
  window.map.item.classList.remove('map--faded');

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

  window.map.renderPinList(window.data.offers);
  window.map.item.addEventListener('click', window.map.onMapClick);
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
