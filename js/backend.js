'use strict';

(function () {
  var URL_LOAD_OFFERS_DATA = 'https://javascript.pages.academy/keksobooking/data';
  var URL_SAVE_USER_DATA = 'https://javascript.pages.academy/keksobooking';
  var OK_STATUS_CODE = 200;
  var TIMEOUT_IN_MS = 10000;

  var loadOffersData = function (onSuccess) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === OK_STATUS_CODE) {
        onSuccess(xhr.response);
      }
    });

    xhr.open('GET', URL_LOAD_OFFERS_DATA);
    xhr.send();
  };

  var saveUserData = function (data, onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {

      if (xhr.status === OK_STATUS_CODE) {
        onSuccess(xhr.responce);
      } else {
        onError('Произошла ошибка ' + xhr.status + ' ' + xhr.responce);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = TIMEOUT_IN_MS;

    xhr.open('POST', URL_SAVE_USER_DATA);
    xhr.send(data);
  };

  window.backend = {
    load: loadOffersData,
    save: saveUserData
  };
})();
