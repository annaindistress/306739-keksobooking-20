'use strict';

(function () {
  window.form.setInactiveState();

  window.move.pin.addEventListener('mousedown', function (evt) {
    if (evt.button === 0) {
      window.move.onMainPinPress(evt);

      if (window.map.item.classList.contains('map--faded')) {
        window.form.setActiveState();
      }
    }
  });

  window.move.pin.addEventListener('keydown', function (evt) {
    if (evt.key === 'Enter' && window.map.item.classList.contains('map--faded')) {
      window.form.setActiveState();
    }
  });

  window.form.item.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.backend.save(new FormData(window.form.item), window.form.onSuccessFormUpload, window.form.onErrorFormUpload);
  });
})();
