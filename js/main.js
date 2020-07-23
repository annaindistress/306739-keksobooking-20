'use strict';

(function () {
  var map = window.map.item;
  var filterForm = window.filter.item;
  var mainForm = window.form.item;
  var offers = [];

  var onSuccessDataLoad = function (data) {
    offers = data;

    window.pin.render(offers);
    map.addEventListener('click', window.map.onMapClick);
  };

  var toggleDisabled = function (element, isDisabled) {
    if (isDisabled) {
      element.disabled = false;
      return element;
    }

    element.disabled = true;
    return element;
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

    map.removeEventListener('click', window.map.onMapClick);
    filterForm.removeEventListener('change', window.filter.onChange);
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

    window.backend.load(onSuccessDataLoad);
    filterForm.addEventListener('change', window.filter.onChange);
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
})();
