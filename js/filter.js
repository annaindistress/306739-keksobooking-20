'use strict';

(function () {
  var filterForm = document.querySelector('.map__filters');

  var onFilterChange = function () {
    window.map.closeCard();
  };

  window.filter = {
    item: filterForm,
    onChange: onFilterChange
  };
})();
