'use strict';

(function () {
  var MAIN_PIN_WIDTH = 65;
  var MAIN_PIN_HEIGHT = 85;
  var MAIN_PIN_MIN_X = 0;
  var MAIN_PIN_MAX_X = 1200;
  var MAIN_PIN_MIN_Y = 130;
  var MAIN_PIN_MAX_Y = 630;

  var mainPinHalf = MAIN_PIN_WIDTH / 2;
  var pinMain = window.map.item.querySelector('.map__pin--main');

  var mainPinStartX = getComputedStyle(pinMain).left;
  var mainPinStartY = getComputedStyle(pinMain).top;

  var setStartingAddress = function () {
    pinMain.style.top = mainPinStartY;
    pinMain.style.left = mainPinStartX;
    window.form.address.value = window.move.setCurrentAddress();
  };

  window.move = {
    pin: pinMain,
    setStartAddress: setStartingAddress,
    setCurrentAddress: function (isActive) {
      var coords = {
        x: parseInt(pinMain.style.left, 10),
        y: parseInt(pinMain.style.top, 10)
      };

      if (isActive) {
        return (coords.x + mainPinHalf) + ', ' + (coords.y + MAIN_PIN_HEIGHT);
      }

      return (coords.x + mainPinHalf) + ', ' + (coords.y + mainPinHalf);
    },
    onMainPinPress: function (evt) {
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

        if (pinMain.offsetTop - shift.y < MAIN_PIN_MIN_Y - MAIN_PIN_HEIGHT) {
          pinMain.style.top = (MAIN_PIN_MIN_Y - MAIN_PIN_HEIGHT) + 'px';
        } else if (pinMain.offsetTop - shift.y > MAIN_PIN_MAX_Y - MAIN_PIN_HEIGHT) {
          pinMain.style.top = (MAIN_PIN_MAX_Y - MAIN_PIN_HEIGHT) + 'px';
        } else {
          pinMain.style.top = (pinMain.offsetTop - shift.y) + 'px';
        }

        if (pinMain.offsetLeft - shift.x < MAIN_PIN_MIN_X - mainPinHalf) {
          pinMain.style.left = (MAIN_PIN_MIN_X - mainPinHalf) + 'px';
        } else if (pinMain.offsetLeft - shift.x > MAIN_PIN_MAX_X - mainPinHalf) {
          pinMain.style.left = (MAIN_PIN_MAX_X - mainPinHalf) + 'px';
        } else {
          pinMain.style.left = (pinMain.offsetLeft - shift.x) + 'px';
        }

        window.form.address.value = window.move.setCurrentAddress(true);
      };

      var onMouseUp = function (upEvt) {
        upEvt.preventDefault();

        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
      };

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    }
  };
})();
