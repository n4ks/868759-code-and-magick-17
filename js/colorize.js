'use strict';

(function () {
  var coatColors = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var eyesColors = ['black', 'red', 'blue', 'yellow', 'green'];
  var fireballColors = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

  window.setColor = function (paintingTarget) {
    var color;

    var getColor = function (arr) {
      var randomColor = arr[window.util.getRandomArrayElement(arr.length)];

      return randomColor;
    };

    switch (paintingTarget) {
      case 'coat':
        color = getColor(coatColors);
        break;
      case 'eyes':
        color = getColor(eyesColors);
        break;
      case 'fireball':
        color = getColor(fireballColors);
        break;
      default:
        break;
    }

    return color;
  };

  window.colorize = function (element, fieldInput, paintingTarget) {
    element.addEventListener('click', function () {
      var color = window.setColor(paintingTarget);

      if (element.tagName.toLowerCase() === 'div') {
        element.style.backgroundColor = color;
        fieldInput.value = color;
      } else {
        element.style.fill = color;
        fieldInput.value = color;
      }
    });
  };
}());
