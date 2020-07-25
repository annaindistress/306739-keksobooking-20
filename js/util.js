'use strict';

(function () {
  var ESCAPE_KEYCODE = 'Escape';
  var ENTER_KEYCODE = 'Enter';
  var LEFT_MOUSE_BUTTON_KEYCODE = 0;

  var isEscape = function (evt) {
    return evt.key === ESCAPE_KEYCODE ? true : false;
  };

  var isEnter = function (evt) {
    return evt.key === ENTER_KEYCODE ? true : false;
  };

  var isLeftMouseButton = function (evt) {
    return evt.button === LEFT_MOUSE_BUTTON_KEYCODE ? true : false;
  };

  window.util = {
    isEscape: isEscape,
    isEnter: isEnter,
    isLeftMouseButton: isLeftMouseButton
  };
})();
