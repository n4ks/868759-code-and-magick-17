'use strict';

(function () {
  var setup = document.querySelector('.setup');
  var setupOpenBtn = document.querySelector('.setup-open-icon');
  var setupCloseBtn = setup.querySelector('.setup-close');
  var userNameInput = setup.querySelector('.setup-user-name');
  var setupStartingPos = {
    x: null,
    y: null
  };

  // Открытие/закрытие попапа
  document.querySelector('.setup-similar').classList.remove('hidden');

  var onPopupEscPress = function (evt) {
    window.util.isEscEvent(evt, closePopup);
  };

  var openPopup = function () {
    setup.classList.remove('hidden');
    document.addEventListener('keydown', onPopupEscPress);
  };

  var closePopup = function () {
    // Если диалог перемещался - при закрытии устанавливаем начальные координаты
    var isMoved = setup.offsetTop !== setupStartingPos.y && setup.offsetLeft !== setupStartingPos.x;
    if (isMoved) {
      setup.style.top = setupStartingPos.y + 'px';
      setup.style.left = setupStartingPos.x + 'px';
    }

    setup.classList.add('hidden');
    document.removeEventListener('keydown', onPopupEscPress);
  };


  setupOpenBtn.addEventListener('click', function () {
    openPopup();
  });

  setupOpenBtn.addEventListener('keydown', function (evt) {
    window.util.isEnterEvent(evt, openPopup);
  });

  setupCloseBtn.addEventListener('click', function () {
    closePopup();
  });

  setupCloseBtn.addEventListener('keydown', function (evt) {
    window.util.isEnterEvent(evt, openPopup);
  });

  userNameInput.addEventListener('keydown', function (evt) {
    window.util.stopEventPropagation(evt);
  });


  // Перемещение попапа
  var dialogHandler = document.querySelector('.upload');

  dialogHandler.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var dragged = false;

    // Если попап перемещают - сохраняем начальные координаты окна
    setupStartingPos = {
      x: setup.offsetLeft,
      y: setup.offsetTop
    };

    // Получаем координаты клика по аватарке
    var coords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      dragged = true;

      // Получаем значения сдвига
      var dialogShift = {
        x: coords.x - moveEvt.clientX,
        y: coords.y - moveEvt.clientY
      };

      // Переопределяем координаты под новую позицию
      coords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      setup.style.top = (setup.offsetTop - dialogShift.y) + 'px';
      setup.style.left = (setup.offsetLeft - dialogShift.x) + 'px';
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      if (dragged) {
        // Предотвращаем клик по аватарке
        var onClickPreventDefault = function (clickEvt) {
          clickEvt.preventDefault();
          dialogHandler.removeEventListener('click', onClickPreventDefault);
        };

        dialogHandler.addEventListener('click', onClickPreventDefault);
      }

      document.removeEventListener('mousemove', onMouseMove);
      dialogHandler.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    dialogHandler.addEventListener('mouseup', onMouseUp);
  });
})();
