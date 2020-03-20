'use strict';
(function () {
  window.debounce = function (callback) {
    var lastTimeout = null;

    return function () {
      var parameters = arguments;
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = setTimeout(function () {
        callback.apply(null, parameters);
      }, window.const.DEBOUNCE_INTERVAL);
    };
  };
})();
