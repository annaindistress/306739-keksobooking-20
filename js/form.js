'use strict';

(function () {
  var form = document.querySelector('.ad-form');
  var formAddress = form.querySelector('#address');
  var formType = form.querySelector('#type');
  var formPrice = form.querySelector('#price');
  var formTimeIn = form.querySelector('#timein');
  var formTimeOut = form.querySelector('#timeout');
  var formRoomNumber = form.querySelector('#room_number');
  var formCapacity = form.querySelector('#capacity');

  window.form = {
    mainForm: form,
    address: formAddress,
    type: formType,
    timeIn: formTimeIn,
    timeOut: formTimeOut,
    roomNumber: formRoomNumber,
    capacity: formCapacity,
    onChangeType: function () {
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
    },
    onChangeTime: function (evt) {
      var firstTime = evt.target;
      var secondTime = formTimeOut;

      if (firstTime.id === 'timeout') {
        secondTime = formTimeIn;
      }

      secondTime.options.selectedIndex = firstTime.options.selectedIndex;
    },
    onChangeRoomCapacity: function () {
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
    }
  };
})();
