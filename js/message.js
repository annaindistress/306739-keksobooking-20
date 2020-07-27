'use strict';

(function () {
  var LOAD_ERROR_TEXT = 'Ошибка загрузки данных';

  var mainSection = document.querySelector('main');
  var successTemplate = document.querySelector('#success').content;
  var errorTemplate = document.querySelector('#error').content;
  var errorButton;
  var errorMessage;

  var onEscPress = function (evt) {
    if (window.util.isEscape(evt)) {
      if (mainSection.querySelector('.success')) {
        closeSuccessMessage();
        return;
      }

      closeErrorMessage();
    }
  };

  var closeSuccessMessage = function () {
    var message = document.querySelector('.success');
    message.remove();
    document.removeEventListener('click', closeSuccessMessage);
    document.removeEventListener('keydown', onEscPress);
  };

  var showSuccessMessage = function () {
    var successElement = successTemplate.cloneNode(true).querySelector('.success');
    mainSection.insertAdjacentElement('beforeend', successElement);

    document.addEventListener('click', closeSuccessMessage);
    document.addEventListener('keydown', onEscPress);
  };

  var closeErrorMessage = function () {
    var message = document.querySelector('.error');
    message.remove();
    errorButton.removeEventListener('click', closeErrorMessage);
    document.removeEventListener('click', closeErrorMessage);
    document.removeEventListener('keydown', onEscPress);
  };

  var showErrorMessage = function (isLoadDataError) {
    var errorElement = errorTemplate.cloneNode(true).querySelector('.error');

    if (isLoadDataError) {
      errorMessage = errorElement.querySelector('.error__message');
      errorMessage.textContent = LOAD_ERROR_TEXT;
    }

    mainSection.insertAdjacentElement('afterbegin', errorElement);

    errorButton = document.querySelector('.error__button');
    errorButton.addEventListener('click', closeErrorMessage);

    document.addEventListener('click', closeErrorMessage);
    document.addEventListener('keydown', onEscPress);
  };

  window.message = {
    success: showSuccessMessage,
    error: showErrorMessage
  };
})();
