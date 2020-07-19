'use strict';

(function () {
  var OFFERS_DATA_URL = 'https://javascript.pages.academy/keksobooking/data';

  var statusCode = {
    OK: 200
  };

  window.loadOffersData = function (onSuccess) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === statusCode.OK) {
        onSuccess(xhr.response);
      }
    });

    xhr.open('GET', OFFERS_DATA_URL);
    xhr.send();
  };
})();
