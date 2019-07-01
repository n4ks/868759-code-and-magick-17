'use strict';

(function () {
  var setup = document.querySelector('.setup');
  var form = setup.querySelector('.setup-wizard-form');

  // Для фильтрации
  var characters = [];
  var setupWizard = document.querySelector('.setup-player');
  var mainCharacter = {
    coat: setupWizard.querySelector('.wizard-coat'),
    eyes: setupWizard.querySelector('.wizard-eyes'),
  };

  // Получение данных с сервера
  var getData = function () {
    var successCallback = function (response) {
      characters = response;
      window.render(characters);
    };

    var onError = function (showDialogTemplate) {
      showDialogTemplate();
    };

    window.backend.load(successCallback, onError);
  };
  getData();

  // Отправка данных на сервер
  var submitData = function () {
    var successCallback = function () {
      setup.classList.add('hidden');
    };

    form.addEventListener('submit', function (evt) {
      var errorCallback = function (showErrorTemplate) {
        showErrorTemplate();
      };

      window.backend.submit(new FormData(form), successCallback, errorCallback);
      evt.preventDefault();
    });
  };
  submitData();

  var getRank = function (character) {
    var rank = 0;

    if (character.colorCoat === mainCharacter.coat.style.fill) {
      rank += 2;
    }
    if (character.colorEyes === mainCharacter.eyes.style.fill) {
      rank += 1;
    }

    return rank;
  };

  var namesComparer = function (left, right) {
    if (left > right) {
      return 1;
    } else if (left < right) {
      return -1;
    } else {
      return 0;
    }
  };
  // Фильтрация похожих персонажей перед выводом на экран
  window.characters = {
    setCharactersFilter: function () {

      window.render(characters.sort(function (left, right) {
        var rankDiff = getRank(right) - getRank(left);
        if (rankDiff === 0) {
          rankDiff = namesComparer(left.name, right.name);
        }
        return rankDiff;
      }));
    }
  };
}());
