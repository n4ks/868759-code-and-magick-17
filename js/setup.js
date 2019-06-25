'use strict';

(function () {
  var CHARACTERS_COUNT = 4;

  var setup = document.querySelector('.setup');
  var names = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
  var surnames = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
  var coatColors = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var eyesColors = ['black', 'red', 'blue', 'yellow', 'green'];
  var fireballColors = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

  var characters = [];
  var charactersList = document.querySelector('.setup-similar-list');
  var characterTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
  var charactersFragment = document.createDocumentFragment();

  var userNameInput = setup.querySelector('.setup-user-name');
  var setupWizard = document.querySelector('.setup-player');
  var wizardCoat = setupWizard.querySelector('.wizard-coat');
  var wizardCoatInput = setupWizard.querySelector('input[name="coat-color"]');
  var wizardEyes = setupWizard.querySelector('.wizard-eyes');
  var wizardEyesInput = setupWizard.querySelector('input[name="eyes-color"]');
  var wizardFireball = setupWizard.querySelector('.setup-fireball-wrap');
  var wizardFireballInput = wizardFireball.querySelector('input[name="fireball-color"]');

  var getRandomArrayElement = function (arrLength) {
    var element = Math.floor(Math.random() * arrLength);

    return element;
  };

  var generateCharactersStats = function (characterCount) {
    var charArray = [];

    for (var i = 0; i < characterCount; i++) {
      var character = {
        name: names[getRandomArrayElement(names.length)] + ' ' + surnames[getRandomArrayElement(surnames.length)],
        coatColor: coatColors[getRandomArrayElement(coatColors.length)],
        eyesColor: eyesColors[getRandomArrayElement(eyesColors.length)]
      };

      charArray.push(character);
    }

    return charArray;
  };

  characters = generateCharactersStats(CHARACTERS_COUNT);

  var generateCharacterElement = function (character) {
    var characterElement = characterTemplate.cloneNode(true);

    characterElement.querySelector('.setup-similar-label').textContent = character.name;
    characterElement.querySelector('.wizard-coat').style.fill = character.coatColor;
    characterElement.querySelector('.wizard-eyes').style.fill = character.eyesColor;

    return characterElement;
  };

  var appendFragmentElements = function (fragment, array) {
    for (var i = 0; i < array.length; i++) {
      fragment.appendChild(generateCharacterElement(array[i]));
    }
  };

  appendFragmentElements(charactersFragment, characters);

  charactersList.appendChild(charactersFragment);

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

  wizardCoat.addEventListener('click', function () {
    var coatColor = coatColors[getRandomArrayElement(coatColors.length)];
    wizardCoat.style.fill = coatColor;
    wizardCoatInput.value = coatColor;
  });

  wizardEyes.addEventListener('click', function () {
    var eyesColor = eyesColors[getRandomArrayElement(eyesColors.length)];
    wizardEyes.style.fill = eyesColor;
    wizardEyesInput.value = eyesColor;
  });

  wizardFireball.addEventListener('click', function () {
    var fireballColor = fireballColors[getRandomArrayElement(fireballColors.length)];
    wizardFireball.style.background = fireballColor;
    wizardFireballInput.value = fireballColor;
  });

  // Перемещение предмета в инвентарь

  var shopInteraction = function () {

    var shop = setup.querySelector('.setup-artifacts-shop');
    var inventory = setup.querySelector('.setup-artifacts');
    var draggableItem;

    // shop.addEventListener('drag', function () {}, false);

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
})();
