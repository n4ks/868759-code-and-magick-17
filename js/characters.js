'use strict';

(function () {
  var CHARACTERS_COUNT = 4;

  var names = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
  var surnames = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
  var characters = [];
  var charactersList = document.querySelector('.setup-similar-list');
  var characterTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
  var charactersFragment = document.createDocumentFragment();

  var getRandomNickname = function (namesLength, surnamesLength) {
    var nickname = names[window.util.getRandomArrayElement(namesLength)] + ' ' + surnames[window.util.getRandomArrayElement(surnamesLength)];

    return nickname;
  };

  var generateCharactersStats = function (characterCount) {
    var charArray = [];

    for (var i = 0; i < characterCount; i++) {

      var character = {
        name: getRandomNickname(names.length, surnames.length),
        coatColor: window.setColor('coat'),
        eyesColor: window.setColor('eyes')
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
}());
