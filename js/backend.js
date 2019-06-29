'use strict';

window.backend = (function () {
  var Code = {
    SUCCESS: 200,
    BAD_REQUEST_ERROR: 400,
    UNAUTHORIZED_ERROR: 401,
    NOT_FOUND_ERROR: 404,
    SERVER_ERROR: 500
  };

  return {
    load: function (onSuccess, onError) {
      var URL = 'https://js.dump.academy/code-and-magick/data';
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';

      xhr.addEventListener('load', function () {
        if (xhr.status === 200) {
          onSuccess(xhr.response);
        } else {
          onError('Произошла ошибка соединения');
        }
      });

      xhr.addEventListener('error', function () {
        onError('Произошла ошибка соединения');
      });
      xhr.addEventListener('timeout', function () {
        onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
      });

      xhr.timeout = 10000;

      xhr.open('GET', URL);
      xhr.send();
    },
    submit: function (data, onSuccess, onError) {
      var URL = 'https://js.dump.academy/code-and-magick';
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';

      xhr.addEventListener('load', function () {

        var statusMessage;
        switch (xhr.status) {
          case Code.SUCCESS:
            onSuccess();
            break;
          case Code.BAD_REQUEST_ERROR:
            statusMessage = 'Неверный запрос';
            break;
          case Code.UNAUTHORIZED_ERROR:
            statusMessage = 'Пользователь не авторизован';
            break;
          case Code.NOT_FOUND_ERROR:
            statusMessage = 'Ничего не найдено';
            break;
          case Code.SERVER_ERROR:
            statusMessage = 'Ошибка сервера';
            break;
          default:
            statusMessage = 'Cтатус ответа: : ' + xhr.status + ' ' + xhr.statusText;
        }
        if (statusMessage) {
          onError(statusMessage);
        }
      });

      xhr.open('POST', URL);
      xhr.send(data);
    }
  };
}());
