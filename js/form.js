'use strict';

(function () {
  var ROOMS_CAPACITY = [
    {
      'rooms': 100,
      'guests_max': 0
    },
    {
      'rooms': 3,
      'guests_min': 1
    },
    {
      'rooms': 2,
      'guests_max': 2,
      'guests_min': 1
    },
    {
      'rooms': 1,
      'guests_max': 1,
      'guests_min': 1
    }
  ];

  var form = document.querySelector('.ad-form');
  var formAddress = form.querySelector('#address');
  var formType = form.querySelector('#type');
  var formPrice = form.querySelector('#price');
  var formTimeIn = form.querySelector('#timein');
  var formTimeOut = form.querySelector('#timeout');
  var formRoomNumber = form.querySelector('#room_number');
  var formCapacity = form.querySelector('#capacity');

  var offerTypeToPrice = {
    'bungalo': 0,
    'flat': 1000,
    'house': 5000,
    'palace': 10000
  };

  var onChangeType = function () {
    var type = formType.value;

    formPrice.min = offerTypeToPrice[type];
    formPrice.placeholder = offerTypeToPrice[type].toString();
  };

  var onChangeTime = function (evt) {
    var firstTime = evt.target;
    var secondTime = formTimeOut;

    if (firstTime.id === formTimeOut.id) {
      secondTime = formTimeIn;
    }

    secondTime.options.selectedIndex = firstTime.options.selectedIndex;
  };

  var onChangeRoomCapacity = function () {
    var rooms = Number(formRoomNumber.value);
    var guests = Number(formCapacity.value);
    var errorMessage = '';

    switch (rooms) {
      case ROOMS_CAPACITY[0].rooms:
        if (guests > ROOMS_CAPACITY[0]['guests_max']) {
          errorMessage = 'Такие места не подходят для размещения гостей';
        }
        break;
      case ROOMS_CAPACITY[1].rooms:
        if (guests < ROOMS_CAPACITY[1]['guests_min']) {
          errorMessage = 'Количество гостей не может быть меньше 1';
        }
        break;
      case ROOMS_CAPACITY[2].rooms:
        if (guests < ROOMS_CAPACITY[2]['guests_min']) {
          errorMessage = 'Количество гостей не может быть меньше 1';
        } else if (guests > ROOMS_CAPACITY[2]['guests_max']) {
          errorMessage = 'Количество гостей не может быть больше 2';
        }
        break;
      case ROOMS_CAPACITY[3].rooms:
        if (guests < ROOMS_CAPACITY[3]['guests_min']) {
          errorMessage = 'Количество гостей не может быть меньше 1';
        } else if (guests > ROOMS_CAPACITY[2]['guests_max']) {
          errorMessage = 'Количество гостей не может быть больше 1';
        }
        break;
    }

    formCapacity.setCustomValidity(errorMessage);
  };

  var deactivateForm = function () {
    form.reset();
    window.images.clearAvatar();
    window.images.clearPropertyPhoto();

    formAddress.value = window.move.setCurrentAddress();

    formType.removeEventListener('change', onChangeType);
    formTimeIn.removeEventListener('change', onChangeTime);
    formTimeOut.removeEventListener('change', onChangeTime);
    formRoomNumber.removeEventListener('change', onChangeRoomCapacity);
    formCapacity.removeEventListener('change', onChangeRoomCapacity);
    window.images.avatar.removeEventListener('change', window.images.onAvatarChange);
    window.images.property.removeEventListener('change', window.images.onProperyPhotoChange);
  };

  var activateForm = function () {
    formAddress.value = window.move.setCurrentAddress(true);

    formRoomNumber.addEventListener('change', onChangeRoomCapacity);
    formCapacity.addEventListener('change', onChangeRoomCapacity);
    formTimeIn.addEventListener('change', onChangeTime);
    formTimeOut.addEventListener('change', onChangeTime);
    formType.addEventListener('change', onChangeType);
    window.images.avatar.addEventListener('change', window.images.onAvatarChange);
    window.images.property.addEventListener('change', window.images.onProperyPhotoChange);
  };

  window.form = {
    item: form,
    address: formAddress,
    deactivate: deactivateForm,
    activate: activateForm
  };
})();
