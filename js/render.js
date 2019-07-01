'use strict';

(function () {
  var CHARACTERS_COUNT = 4;

  var charactersFragment = document.createDocumentFragment();
  var charactersList = document.querySelector('.setup-similar-list');
  var characterTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

  var generateCharacterElement = function (character) {
    var characterElement = characterTemplate.cloneNode(true);

    characterElement.querySelector('.setup-similar-label').textContent = character.name;
    characterElement.querySelector('.wizard-coat').style.fill = character.colorCoat;
    characterElement.querySelector('.wizard-eyes').style.fill = character.colorEyes;

    return characterElement;
  };

  window.render = function (data) {
    charactersList.innerHTML = '';
    for (var i = 0; i < CHARACTERS_COUNT; i++) {
      charactersFragment.appendChild(generateCharacterElement(data[i]));
    }
    charactersList.appendChild(charactersFragment);
    document.querySelector('.setup-similar').classList.remove('hidden');
  };
}());
