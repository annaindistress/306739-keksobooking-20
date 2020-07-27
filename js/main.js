'use strict';

(function () {
  var map = window.map.item;
  var filterForm = document.querySelector('.map__filters');
  var mainForm = window.form.item;
  var formResetButton = mainForm.querySelector('.ad-form__reset');
  var offers = [];
  var filteredOffers = [];

  var onSuccessDataLoad = function (data) {
    offers = data;
    filteredOffers = data;
    window.pin.render(filteredOffers);
  };

  var onErrorDataLoad = function () {
    window.message.error(true);
    setInactiveState();
  };

  var onFilterChange = window.debounce(function () {
    window.map.closeCard();
    window.map.clean();
    filteredOffers = window.filter(offers, filterForm);
    window.pin.render(filteredOffers);
  });

  var toggleDisabled = function (element, isDisabled) {
    element.disabled = !isDisabled;
  };

  var setInactiveState = function () {
    if (!map.classList.contains('map--faded')) {
      map.classList.add('map--faded');
    }

    filterForm.childNodes.forEach(function (element) {
      toggleDisabled(element);
    });

    if (!mainForm.classList.contains('ad-form--disabled')) {
      mainForm.classList.add('ad-form--disabled');
    }

    mainForm.childNodes.forEach(function (element) {
      toggleDisabled(element);
    });

    window.form.deactivate();
    window.map.clean();
    window.move.setStartingAddress();
    map.removeEventListener('click', onMapClick);
    filterForm.removeEventListener('change', onFilterChange);
    formResetButton.removeEventListener('click', setInactiveState);
  };

  var setActiveState = function () {
    window.load(onSuccessDataLoad, onErrorDataLoad);

    map.classList.remove('map--faded');

    filterForm.childNodes.forEach(function (element) {
      toggleDisabled(element, true);
    });

    mainForm.classList.remove('ad-form--disabled');

    mainForm.childNodes.forEach(function (element) {
      toggleDisabled(element, true);
    });

    window.form.activate();
    map.addEventListener('click', onMapClick);
    filterForm.addEventListener('change', onFilterChange);
    formResetButton.addEventListener('click', setInactiveState);

    window.load(onSuccessDataLoad, onErrorDataLoad);
  };

  var onSuccessFormUpload = function () {
    window.map.clean();
    setInactiveState();
    window.message.success();
  };

  var onErrorFormUpload = function () {
    window.message.error();
  };

  setInactiveState();

  window.pin.main.addEventListener('mousedown', function (evt) {
    if (window.util.isLeftMouseButton(evt)) {
      window.move.onMainPinPress(evt);

      if (map.classList.contains('map--faded')) {
        setActiveState();
      }
    }
  });

  window.pin.main.addEventListener('keydown', function (evt) {
    if (window.util.isEnter(evt) && map.classList.contains('map--faded')) {
      setActiveState();
    }
  });

  mainForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.load(onSuccessFormUpload, onErrorFormUpload, new FormData(mainForm));
  });

  var onMapClick = function (evt) {
    var element = evt.target;

    if (element.classList.contains('map__pin') && !element.classList.contains('map__pin--main')) {
      window.map.openCard(element, filteredOffers);
    } else if (element.parentNode.classList.contains('map__pin') && !element.parentNode.classList.contains('map__pin--main')) {
      element = element.parentNode;
      window.map.openCard(element, filteredOffers);
    }
  };
})();
