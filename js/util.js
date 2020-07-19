'use strict';

(function () {
  window.util = {
    statusCode: {
      OK: 200
    },
    getRandomInt: function (min, max) {
      if (max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
      }

      return Math.floor(Math.random() * (min + 1));
    },
    getRandomArrayElement: function (array) {
      var index = this.getRandomInt(array.length - 1);
      return array[index];
    },
    getRandomArray: function (array) {
      var newArray = array;

      for (var i = newArray.length - 1; i > 0; i--) {
        var j = this.getRandomInt(i);
        var temp = newArray[i];
        newArray[i] = newArray[j];
        newArray[j] = temp;
      }

      return newArray.slice(0, this.getRandomInt(1, newArray.length));
    }
  };
})();
