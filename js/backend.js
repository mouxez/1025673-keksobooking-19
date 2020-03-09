'use strict';

(function () {
  var LOAD_URL = 'https://js.dump.academy/keksobooking/data';
  var xhr = new XMLHttpRequest();

  var load = function () {

    xhr.responseType = 'json';
    xhr.open('GET', LOAD_URL);
    xhr.send();
  };

  window.backend = {
    load: load
  };
})();
