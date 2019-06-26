'use strict';

(function () {
  var ENTER_KEYCODE = 13;
  var ESC_KEYCODE = 27;

  window.util = {
    isEscEvent: function (evt, action) {
      if (evt.keyCode === ESC_KEYCODE) {
        action();
      }
    },
    isEnterEvent: function (evt, action) {
      if (evt.keyCode === ENTER_KEYCODE) {
        action();
      }
    },
    stopEventPropagation: function (evt) {
      evt.stopPropagation();
    },

    getRandomArrayElement: function (arrayLength) {
      var element = Math.floor(Math.random() * arrayLength);

      return element;
    }
  };
})();
