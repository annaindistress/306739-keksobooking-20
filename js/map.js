'use strict';

(function () {
  var map = document.querySelector('.map');
  var mapFilter = map.querySelector('.map__filters-container');

  var onCardEscPress = function (evt) {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      closeCard();
    }
  };

  var openCard = function (element, data) {
    var pinButtons = [].slice.call(map.querySelectorAll('.map__pin'), 0);
    var index = pinButtons.indexOf(element);

    if (index === 0) {
      return;
    }

    if (document.querySelector('.map__card')) {
      closeCard();
    }

    mapFilter.insertAdjacentElement('beforeBegin', window.card.render(data[index - 1]));

    document.addEventListener('keydown', onCardEscPress);

    var cardCloseButton = document.querySelector('.popup__close');
    cardCloseButton.addEventListener('click', function () {
      closeCard();
    });
  };

  var closeCard = function () {
    var card = map.querySelector('.map__card');

    if (card) {
      card.remove();
    }

    document.removeEventListener('keydown', onCardEscPress);
  };

  var cleanMap = function () {
    var pins = map.querySelectorAll('.map__pin');

    for (var i = 0; i < pins.length; i++) {
      if (!pins[i].classList.contains('map__pin--main')) {
        pins[i].remove();
      }
    }

    closeCard();
  };

  window.map = {
    item: map,
    filterContainer: mapFilter,
    openCard: openCard,
    closeCard: closeCard,
    clean: cleanMap
  };
})();
