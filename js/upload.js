'use strict';

(function () {
  var USER_INFO_URL = 'https://javascript.pages.academy/keksobooking';
  var TIMEOUT_IN_MS = 10000;

  window.uploadUserInfo = function (data, onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {

      if (xhr.status === window.util.statusCode.OK) {
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

    xhr.open('POST', USER_INFO_URL);
    xhr.send(data);
  };
})();
