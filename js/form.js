'use strict';

(function () {
  var form = document.querySelector('.ad-form');
  var formTitle = form.querySelector('#title');
  var formAddress = form.querySelector('#address');
  var formType = form.querySelector('#type');
  var formPrice = form.querySelector('#price');
  var formTimeIn = form.querySelector('#timein');
  var formTimeOut = form.querySelector('#timeout');
  var formRoomNumber = form.querySelector('#room_number');
  var formCapacity = form.querySelector('#capacity');
  var formFeaturesList = form.querySelector('.features');
  var formDescription = form.querySelector('#description');
  var mapFilterForm = window.map.filter.querySelector('.map__filters');

  var toggleDisabled = function (element, isDisabled) {
    if (isDisabled) {
      element.disabled = false;
      return element;
    }

    element.disabled = true;
    return element;
  };

  var clearFeatures = function () {
    for (var i = 0; i < formFeaturesList.childNodes.length; i++) {
      if (formFeaturesList.childNodes[i].tagName === 'INPUT') {
        formFeaturesList.childNodes[i].checked = false;
      }
    }
  };

  var onChangeType = function () {
    var type = formType.value;

    switch (type) {
      case 'bungalo':
        formPrice.min = 0;
        formPrice.placeholder = '0';
        break;
      case 'flat':
        formPrice.min = 1000;
        formPrice.placeholder = '1000';
        break;
      case 'house':
        formPrice.min = 5000;
        formPrice.placeholder = '5000';
        break;
      case 'palace':
        formPrice.min = 10000;
        formPrice.placeholder = '10000';
        break;
    }
  };

  var onChangeTime = function (evt) {
    var firstTime = evt.target;
    var secondTime = formTimeOut;

    if (firstTime.id === 'timeout') {
      secondTime = formTimeIn;
    }

    secondTime.options.selectedIndex = firstTime.options.selectedIndex;
  };

  var onChangeRoomCapacity = function () {
    var rooms = formRoomNumber.value;
    var guests = formCapacity.value;
    var errorMessage = '';

    switch (rooms) {
      case '100':
        if (guests > '0') {
          errorMessage = 'Такие места не подходят для размещения гостей';
        }
        break;
      case '3':
        if (guests < '1') {
          errorMessage = 'Количество гостей не может быть меньше 1';
        }
        break;
      case '2':
        if (guests < '1') {
          errorMessage = 'Количество гостей не может быть меньше 1';
        } else if (guests > '2') {
          errorMessage = 'Количество гостей не может быть больше 2';
        }
        break;
      case '1':
        if (guests < '1') {
          errorMessage = 'Количество гостей не может быть меньше 1';
        } else if (guests > '1') {
          errorMessage = 'Количество гостей не может быть больше 1';
        }
        break;
    }

    formCapacity.setCustomValidity(errorMessage);
  };

  var setInactiveState = function () {

    if (!window.map.item.classList.contains('map--faded')) {
      window.map.item.classList.add('map--faded');
    }

    for (var i = 0; i < mapFilterForm.childNodes.length; i++) {
      toggleDisabled(mapFilterForm.childNodes[i]);
    }

    if (!form.classList.contains('ad-form--disabled')) {
      form.classList.add('ad-form--disabled');
    }

    for (var j = 0; j < form.childNodes.length; j++) {
      toggleDisabled(form.childNodes[j]);
    }

    formAddress.value = window.move.setCurrentAddress();

    formTitle.value = '';
    formType.value = 'flat';
    formType.removeEventListener('change', onChangeType);
    formPrice.value = '';
    formTimeIn.value = '12:00';
    formTimeIn.removeEventListener('change', onChangeTime);
    formTimeOut.value = '12:00';
    formTimeOut.removeEventListener('change', onChangeTime);
    formRoomNumber.value = 1;
    formRoomNumber.removeEventListener('change', onChangeRoomCapacity);
    formCapacity.value = 1;
    formCapacity.removeEventListener('change', onChangeRoomCapacity);
    formDescription.value = '';

    clearFeatures();

    window.map.item.removeEventListener('click', window.map.onMapClick);
  };

  var setActiveState = function () {
    window.map.item.classList.remove('map--faded');

    for (var i = 0; i < mapFilterForm.childNodes.length; i++) {
      toggleDisabled(mapFilterForm.childNodes[i], true);
    }

    form.classList.remove('ad-form--disabled');

    for (var j = 0; j < form.childNodes.length; j++) {
      toggleDisabled(form.childNodes[j], true);
    }

    formAddress.value = window.move.setCurrentAddress(true);

    formRoomNumber.addEventListener('change', onChangeRoomCapacity);
    formCapacity.addEventListener('change', onChangeRoomCapacity);
    formTimeIn.addEventListener('change', onChangeTime);
    formTimeOut.addEventListener('change', onChangeTime);
    formType.addEventListener('change', onChangeType);

    window.loadOffersData(function (offers) {
      window.map.renderPinList(offers);
      window.map.item.addEventListener('click', window.map.onMapClick);
    });
  };

  var onSuccessFormUpload = function () {
    window.map.clean();
    setInactiveState();
    window.move.setStartAddress();
    window.message.success();
  };

  var onErrorFormUpload = function () {
    window.message.error();
  };

  window.form = {
    item: form,
    address: formAddress,
    setActiveState: setActiveState,
    setInactiveState: setInactiveState,
    onSuccessFormUpload: onSuccessFormUpload,
    onErrorFormUpload: onErrorFormUpload
  };
})();
