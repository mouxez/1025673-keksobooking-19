'use strict';

(function () {
  // перемещает главную метку
  window.mainButton.addEventListener('mousedown', function (evt) {
    var startCoordinates = {
      x: evt.clientX,
      y: evt.clientY
    };
    var onMouseMove = function (move) {
      var shift = {
        x: startCoordinates.x - move.clientX,
        y: startCoordinates.y - move.clientY
      };
      startCoordinates = {
        x: move.clientX,
        y: move.clientY
      };
      window.mainButton.style.top = (window.mainButton.offsetTop - shift.y) + 'px';
      window.mainButton.style.left = (window.mainButton.offsetLeft - shift.x) + 'px';

      // как мне кажется, этот код должет делать ограничение и держать метку внутри заданного окна, но он не совсем корректно работает
      if (window.mainButton.style.left < window.const.MIN_WINDOW_X) {
        window.mainButton.style.left = window.const.MIN_WINDOW_X;
      } else if (window.mainButton.style.left > window.const.MAX_WINDOW_X) {
        window.mainButton.style.left = window.const.MAX_WINDOW_X;
      } else if (window.mainButton.style.top < window.const.MIN_WINDOW_Y) {
        window.mainButton.style.top = window.const.MIN_WINDOW_Y;
      } else if (window.mainButton.style.top > window.const.MAX_WINDOW_Y) {
        window.mainButton.style.top = window.const.MAX_WINDOW_Y;
      }
    };

    var onMouseUp = function () {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();
