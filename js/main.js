'use strict';

(function () {
  var mapFilterForm = window.map.filter.querySelector('.map__filters');

  var toggleDisabled = function (element, isDisabled) {
    if (isDisabled) {
      element.disabled = false;
      return element;
    }

    element.disabled = true;
    return element;
  };

  var setInactiveState = function () {

    if (!window.map.item.classList.contains('map--faded')) {
      window.map.item.classList.add('map--faded');
    }

    for (var i = 0; i < mapFilterForm.childNodes.length; i++) {
      toggleDisabled(mapFilterForm.childNodes[i]);
    }

    if (!window.form.mainForm.classList.contains('ad-form--disabled')) {
      window.form.mainForm.classList.add('ad-form--disabled');
    }

    for (var j = 0; j < window.form.mainForm.childNodes.length; j++) {
      toggleDisabled(window.form.mainForm.childNodes[j]);
    }

    window.form.address.value = window.move.setAddress();

    window.form.roomNumber.removeEventListener('change', window.form.onChangeRoomCapacity);
    window.form.capacity.removeEventListener('change', window.form.onChangeRoomCapacity);
    window.form.timeIn.removeEventListener('change', window.form.onChangeTime);
    window.form.timeOut.removeEventListener('change', window.form.onChangeTime);
    window.form.type.removeEventListener('change', window.form.onChangeType);

    window.map.item.removeEventListener('click', window.map.onMapClick);
  };

  var setActiveState = function () {
    window.map.item.classList.remove('map--faded');

    for (var i = 0; i < mapFilterForm.childNodes.length; i++) {
      toggleDisabled(mapFilterForm.childNodes[i], true);
    }

    window.form.mainForm.classList.remove('ad-form--disabled');

    for (var j = 0; j < window.form.mainForm.childNodes.length; j++) {
      toggleDisabled(window.form.mainForm.childNodes[j], true);
    }

    window.form.address.value = window.move.setAddress(true);

    window.form.roomNumber.addEventListener('change', window.form.onChangeRoomCapacity);
    window.form.capacity.addEventListener('change', window.form.onChangeRoomCapacity);
    window.form.timeIn.addEventListener('change', window.form.onChangeTime);
    window.form.timeOut.addEventListener('change', window.form.onChangeTime);
    window.form.type.addEventListener('change', window.form.onChangeType);

    window.loadOffersData(window.map.renderPinList);

    window.map.item.addEventListener('click', window.map.onMapClick);
  };

  setInactiveState();

  window.move.pin.addEventListener('mousedown', function (evt) {
    if (evt.button === 0) {
      setActiveState();
      window.move.onMainPinPress(evt);
    }
  });

  window.move.pin.addEventListener('keydown', function (evt) {
    if (evt.key === 'Enter') {
      setActiveState();
      window.move.onMainPinPress(evt);
    }
  });
})();
