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

  var openCard = function (element) {
    var pinButtons = [].slice.call(map.querySelectorAll('.map__pin'), 0);
    var index = pinButtons.indexOf(element);

    if (index === 0) {
      return;
    }

    if (document.querySelector('.map__card')) {
      closeCard();
    }

    window.backend.load(function (offers) {
      mapFilter.insertAdjacentElement('beforeBegin', window.card.render(offers[index - 1]));

      document.addEventListener('keydown', onCardEscPress);

      var cardCloseButton = document.querySelector('.popup__close');
      cardCloseButton.addEventListener('click', function () {
        closeCard();
      });
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
    onMapClick: function (evt) {
      var element = evt.target;

      if (element.classList.contains('map__pin') && !element.classList.contains('map__pin--main')) {
        openCard(element);
      } else if (element.parentNode.classList.contains('map__pin') && !element.parentNode.classList.contains('map__pin--main')) {
        element = element.parentNode;
        openCard(element);
      }
    },
    clean: cleanMap
  };
})();
