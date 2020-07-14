'use strict';

(function () {
  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;

  var pinTemplate = document.querySelector('#pin').content;

  window.pin = {
    render: function (offerItem) {
      var pinItem = pinTemplate.cloneNode(true).querySelector('button');
      var pinImg = pinItem.querySelector('img');

      pinItem.style.left = offerItem.location.x - PIN_WIDTH / 2 + 'px';
      pinItem.style.top = offerItem.location.y - PIN_HEIGHT + 'px';
      pinImg.src = offerItem.author.avatar;
      pinImg.alt = offerItem.offer.title;

      return pinItem;
    }
  };
})();
