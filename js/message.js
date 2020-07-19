'use strict';

(function () {
  var main = document.querySelector('main');
  var successTemplate = document.querySelector('#success').content;
  var errorTemplate = document.querySelector('#error').content;
  var errorButton = document.querySelector('.error__button');

  var onSuccessClick = function () {
    var message = document.querySelector('.success');
    message.remove();
    document.removeEventListener('click', onSuccessClick);
  };

  var onErrorClick = function () {
    var message = document.querySelector('.error');
    message.remove();
    errorButton.removeEventListener('click', onErrorClick);
    document.removeEventListener('click', onErrorClick);
  };

  var showSuccessMessage = function () {
    var successItem = successTemplate.cloneNode(true).querySelector('.success');
    main.insertAdjacentElement('afterbegin', successItem);

    document.addEventListener('click', onSuccessClick);
    document.addEventListener('keydown', function (evt) {
      if (evt.key === 'Escape') {
        onSuccessClick();
      }
    });
  };

  var showErrorMessage = function () {
    var errorItem = errorTemplate.cloneNode(true).querySelector('.error');
    main.insertAdjacentElement('afterbegin', errorItem);

    document.addEventListener('click', onErrorClick);
    document.addEventListener('keydown', function (evt) {
      if (evt.key === 'Escape') {
        onErrorClick();
      }
    });
    errorButton.addEventListener('click', onErrorClick);
  };

  window.message = {
    success: showSuccessMessage,
    error: showErrorMessage
  };
})();
