'use strict';

(function () {
  window.filter = function (data) {
    var valueMap = {
      type: document.querySelector('#housing-type').value
    };

    var filteredOffers = [];

    if (valueMap.type !== 'any') {
      var sameTypeOffers = data.filter(function (it) {
        return it.offer.type === valueMap.type;
      });

      filteredOffers = filteredOffers.concat(sameTypeOffers);
    }

    if (valueMap.type === 'any') {
      return data;
    }

    return filteredOffers;
  };
})();
