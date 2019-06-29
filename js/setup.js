'use strict';

(function () {
  var setup = document.querySelector('.setup');
  var userNameInput = setup.querySelector('.setup-user-name');
  var setupWizard = document.querySelector('.setup-player');
  var coloringElements = {
    'coat': {
      wizardElement: setupWizard.querySelector('.wizard-coat'),
      inputField: setupWizard.querySelector('input[name="coat-color"]')
    },
    'eyes': {
      wizardElement: setupWizard.querySelector('.wizard-eyes'),
      inputField: setupWizard.querySelector('input[name="eyes-color"]')
    },
    'fireball': {
      wizardElement: setupWizard.querySelector('.setup-fireball-wrap'),
      inputField: setupWizard.querySelector('input[name="fireball-color"]')
    }
  };

  userNameInput.addEventListener('invalid', function () {
    if (userNameInput.validity.tooShort) {
      userNameInput.setCustomValidity('Имя персонажа не менее 2х символов');
    } else if (userNameInput.validity.tooLong) {
      userNameInput.setCustomValidity('Имя персонажа не более 25 символов');
    } else if (userNameInput.validity.valueMissing) {
      userNameInput.setCustomValidity('Поле обязательно для заполнения');
    } else {
      userNameInput.setCustomValidity('');
    }
  });

  var setupElementsColors = function (elements) {
    for (var propName in elements) {
      if (elements.hasOwnProperty(propName)) {
        var currentElement = elements[propName];
        window.colorize(currentElement.wizardElement, currentElement.inputField, propName);
      }
    }
  };

  setupElementsColors(coloringElements);
})();
