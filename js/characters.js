'use strict';

(function () {
  var CHARACTERS_COUNT = 4;

  var setup = document.querySelector('.setup');
  var form = setup.querySelector('.setup-wizard-form');
  var charactersFragment = document.createDocumentFragment();
  var charactersList = document.querySelector('.setup-similar-list');
  var characterTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

  var generateCharacterElement = function (character) {
    var characterElement = characterTemplate.cloneNode(true);

    characterElement.querySelector('.setup-similar-label').textContent = character.name;
    characterElement.querySelector('.wizard-coat').style.fill = character.colorCoat;
    characterElement.querySelector('.wizard-eyes').style.fill = character.coloarEyes;

    return characterElement;
  };

  var onError = function (statusMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';

    node.textContent = statusMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  // Получение данных с сервера
  var getData = function () {

    var onSuccess = function (response) {
      for (var i = 0; i < CHARACTERS_COUNT; i++) {
        var randomCharacter = response[window.util.getRandomArrayElement(response.length)];
        charactersFragment.appendChild(generateCharacterElement(randomCharacter));
      }
      charactersList.appendChild(charactersFragment);
      document.querySelector('.setup-similar').classList.remove('hidden');
    };
    window.backend.load(onSuccess, onError);
  };

  getData();

  // Отправка данных на сервер
  var submitData = function () {

    var onSuccess = function () {
      setup.classList.add('hidden');
    };

    form.addEventListener('submit', function (evt) {
      window.backend.submit(new FormData(form), onSuccess, onError);
      evt.preventDefault();
    });
  };

  submitData();
}());
