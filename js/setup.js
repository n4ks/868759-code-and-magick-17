'use strict';

var setup = document.querySelector('.setup');
setup.classList.remove('hidden');

var names = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var surnames = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var coatColors = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var eyeColors = ['black', 'red', 'blue', 'yellow', 'green'];
var CHARACTERS_COUNT = 4;
var characters = [];
var charactersList = document.querySelector('.setup-similar-list');
var characterTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
var charactersFragment = document.createDocumentFragment();

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
      eyesColor: eyeColors[getRandomArrayElement(eyeColors.length)]
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
