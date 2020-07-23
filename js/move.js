'use strict';

(function () {
  var MAIN_PIN_MIN_X = 0;
  var MAIN_PIN_MAX_X = 1200;
  var MAIN_PIN_MIN_Y = 130;
  var MAIN_PIN_MAX_Y = 630;

  var pin = window.pin.main;
  var pinHalf = window.pin.mainHalfWidth;
  var pinHeight = window.pin.mainHeight;
  var mainPinStartX = getComputedStyle(window.pin.main).left;
  var mainPinStartY = getComputedStyle(window.pin.main).top;

  var setStartingAddress = function () {
    window.pin.main.style.top = mainPinStartY;
    window.pin.main.style.left = mainPinStartX;
    window.form.address.value = window.move.setCurrentAddress();
  };

  var setCurrentAddress = function (isActive) {
    var coords = {
      x: parseInt(pin.style.left, 10),
      y: parseInt(pin.style.top, 10)
    };

    if (isActive) {
      return (coords.x + pinHalf) + ', ' + (coords.y + pinHeight);
    }

    return (coords.x + pinHalf) + ', ' + (coords.y + pinHalf);
  };

  var onMainPinPress = function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      if (pin.offsetTop - shift.y < MAIN_PIN_MIN_Y - pinHeight) {
        pin.style.top = (MAIN_PIN_MIN_Y - pinHeight) + 'px';
      } else if (pin.offsetTop - shift.y > MAIN_PIN_MAX_Y - pinHeight) {
        pin.style.top = (MAIN_PIN_MAX_Y - pinHeight) + 'px';
      } else {
        pin.style.top = (pin.offsetTop - shift.y) + 'px';
      }

      if (pin.offsetLeft - shift.x < MAIN_PIN_MIN_X - pinHalf) {
        pin.style.left = (MAIN_PIN_MIN_X - pinHalf) + 'px';
      } else if (pin.offsetLeft - shift.x > MAIN_PIN_MAX_X - pinHalf) {
        pin.style.left = (MAIN_PIN_MAX_X - pinHalf) + 'px';
      } else {
        pin.style.left = (pin.offsetLeft - shift.x) + 'px';
      }

      window.form.address.value = setCurrentAddress(true);
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  window.move = {
    setStartingAddress: setStartingAddress,
    setCurrentAddress: setCurrentAddress,
    onMainPinPress: onMainPinPress
  };
})();
