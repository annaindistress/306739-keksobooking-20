'use strict';

(function () {
  var map = window.map.item;
  var filterForm = document.querySelector('.map__filters');
  var mainForm = window.form.item;
  var offers = [];
  var filteredOffers = [];

  var onSuccessDataLoad = function (data) {
    offers = data;
    filteredOffers = data;
  };

  window.backend.load(onSuccessDataLoad);

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

    map.removeEventListener('click', onMapClick);
    filterForm.removeEventListener('change', onFilterChange);
  };

  var setActiveState = function () {
    map.classList.remove('map--faded');

    filterForm.childNodes.forEach(function (element) {
      toggleDisabled(element, true);
    });

    mainForm.classList.remove('ad-form--disabled');

    mainForm.childNodes.forEach(function (element) {
      toggleDisabled(element, true);
    });

    window.form.activate();

    window.pin.render(offers);
    map.addEventListener('click', onMapClick);

    filterForm.addEventListener('change', onFilterChange);
  };

  var onSuccessFormUpload = function () {
    window.map.clean();
    setInactiveState();
    window.move.setStartingAddress();
    window.message.success();
  };

  var onErrorFormUpload = function () {
    window.message.error();
  };

  setInactiveState();

  window.pin.main.addEventListener('mousedown', function (evt) {
    if (evt.button === 0) {
      window.move.onMainPinPress(evt);

      if (map.classList.contains('map--faded')) {
        setActiveState();
      }
    }
  });

  window.pin.main.addEventListener('keydown', function (evt) {
    if (evt.key === 'Enter' && map.classList.contains('map--faded')) {
      setActiveState();
    }
  });

  mainForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.backend.save(new FormData(mainForm), onSuccessFormUpload, onErrorFormUpload);
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
