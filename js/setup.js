'use strict';

var CHARACTERS_COUNT = 4;
var ENTER_KEYCODE = 13;
var ESC_KEYCODE = 27;

var setup = document.querySelector('.setup');
var setupOpenBtn = document.querySelector('.setup-open-icon');
var setupCloseBtn = setup.querySelector('.setup-close');
var userNameInput = setup.querySelector('.setup-user-name');

var names = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var surnames = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var coatColors = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var eyesColors = ['black', 'red', 'blue', 'yellow', 'green'];
var fireballColors = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

var characters = [];
var charactersList = document.querySelector('.setup-similar-list');
var characterTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
var charactersFragment = document.createDocumentFragment();

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

document.querySelector('.setup-similar').classList.remove('hidden');

var onPopupEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closePopup();
  }
};

var openPopup = function () {
  setup.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscPress);
};

var closePopup = function () {
  setup.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscPress);
};


setupOpenBtn.addEventListener('click', function () {
  openPopup();
});

setupOpenBtn.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    openPopup();
  }
});

setupCloseBtn.addEventListener('click', function () {
  closePopup();
});

setupCloseBtn.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    closePopup();
  }
});

userNameInput.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    evt.stopPropagation();
  }
});

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
