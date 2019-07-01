'use strict';

window.backend = (function () {
  var Code = {
    SUCCESS: 200,
    BAD_REQUEST_ERROR: 400,
    UNAUTHORIZED_ERROR: 401,
    NOT_FOUND_ERROR: 404,
    SERVER_ERROR: 500
  };

  var ErrorMessage = {
    BAD_REQUEST_ERROR: 'Неверный запрос',
    UNAUTHORIZED_ERROR: 'Пользователь не авторизован',
    NOT_FOUND_ERROR: 'Ничего не найдено',
    SERVER_ERROR_ERROR: 'Ошибка сервера',
    DEFAULT_ERROR: 'Cтатус ответа: : ',
    CONNECTION_ERROR: 'Произошла ошибка соединения',
    TIMEOUT_ERROR: {
      MESSAGE: 'Запрос не успел выполниться за ',
      FORMAT: 'мс'
    }
  };

  var SERVER_URL = {
    PATH: 'https://js.dump.academy/code-and-magick/',
    DATA: 'data'
  };

  var onServerResponse = function (url, requestType, successCallback, errorCallback, data) {
    var responseMsg;

    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      switch (xhr.status) {
        case Code.SUCCESS:
          successCallback(xhr.response);
          break;
        case Code.BAD_REQUEST_ERROR:
          responseMsg = ErrorMessage.BAD_REQUEST_ERROR;
          break;
        case Code.UNAUTHORIZED_ERROR:
          responseMsg = ErrorMessage.UNAUTHORIZED_ERROR;
          break;
        case Code.NOT_FOUND_ERROR:
          responseMsg = ErrorMessage.NOT_FOUND_ERROR;
          break;
        case Code.SERVER_ERROR:
          responseMsg = ErrorMessage.SERVER_ERROR_ERROR;
          break;
        default:
          responseMsg = ErrorMessage.DEFAULT_ERROR + xhr.status + ' ' + xhr.statusText;
          break;
      }

      if (responseMsg) {
        var showErrorTemplate = function () {
          var node = document.createElement('div');
          node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
          node.style.position = 'absolute';
          node.style.left = 0;
          node.style.right = 0;
          node.style.fontSize = '30px';

          node.textContent = responseMsg;
          document.body.insertAdjacentElement('afterbegin', node);
        };
        errorCallback(showErrorTemplate);
      }

      xhr.timeout = 10000;

      xhr.addEventListener('error', function () {
        errorCallback(ErrorMessage.CONNECTION_ERROR);
      });

      xhr.addEventListener('timeout', function () {
        errorCallback(ErrorMessage.TIMEOUT_ERROR.MESSAGE + xhr.timeout + ErrorMessage.TIMEOUT_ERROR.FORMAT);
      });
    });

    xhr.open(requestType, url);

    if (data) {
      xhr.send(data);
    } else {
      xhr.send();
    }
  };

  return {
    load: function (successCallback, errorCallback) {
      onServerResponse(SERVER_URL.PATH + SERVER_URL.DATA, 'GET', successCallback, errorCallback);
    },
    submit: function (successCallback, errorCallback, data) {
      onServerResponse(SERVER_URL.PATH, 'POST', successCallback, errorCallback, data);
    }
  };
}());
