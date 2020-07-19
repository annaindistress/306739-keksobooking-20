'use strict';

(function () {
  var OFFERS_DATA_URL = 'https://javascript.pages.academy/keksobooking/data';

  window.loadOffersData = function (onSuccess) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === window.util.statusCode.OK) {
        onSuccess(xhr.response);
      }
    });

    xhr.open('GET', OFFERS_DATA_URL);
    xhr.send();
  };
})();
