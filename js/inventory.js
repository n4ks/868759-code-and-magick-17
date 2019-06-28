'use strict';

(function () {
  var setup = document.querySelector('.setup');

  var shopInteraction = function () {

    var shop = setup.querySelector('.setup-artifacts-shop');
    var inventory = setup.querySelector('.setup-artifacts');
    var draggableItem;

    shop.addEventListener('dragstart', function (evt) {
      if (evt.target.hasAttribute('draggable')) {
        draggableItem = evt.target;
      }
    });

    inventory.addEventListener('dragover', function (evt) {
      evt.preventDefault();
    }, false);

    inventory.addEventListener('drop', function (evt) {
      if (evt.target.className === 'setup-artifacts-cell') {
        evt.preventDefault();

        draggableItem.parentNode.removeChild(draggableItem);
        evt.target.appendChild(draggableItem);
      }
    });
  };

  shopInteraction();
}());
