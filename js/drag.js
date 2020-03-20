'use strict';

(function () {
  window.map.mainButton.addEventListener('mousedown', function (evt) {
    if (evt.button === window.const.LEFT_MOUSE_BUTTON) {
      var startCoordinates = {
        x: evt.clientX,
        y: evt.clientY
      };

      var dragger = false;

      var onMouseMove = function (move) {
        dragger = true;

        var limits = {
          top: window.const.MIN_WINDOW_Y - window.const.PIN_HEIGHT,
          bottom: window.const.MAX_WINDOW_Y,
          left: window.const.MIN_WINDOW_X - (window.const.PIN_WIDTH / 2),
          right: window.const.MAX_WINDOW_X - (window.const.PIN_WIDTH / 2)
        };

        var shift = {
          x: startCoordinates.x - move.clientX,
          y: startCoordinates.y - move.clientY
        };

        startCoordinates = {
          x: move.clientX,
          y: move.clientY
        };

        var pinTop = window.map.mainButton.offsetTop - shift.y;
        var pinLeft = window.map.mainButton.offsetLeft - shift.x;

        if (pinLeft > limits.right) {
          pinLeft = limits.right;
        } else if (pinLeft < limits.left) {
          pinLeft = limits.left;
        }

        if (pinTop < limits.top) {
          pinTop = limits.top;
        } else if (pinTop > limits.bottom) {
          pinTop = limits.bottom;
        }

        window.pinTop = pinTop;
        window.pinLeft = pinLeft;

        window.map.mainButton.style.left = pinLeft + 'px';
        window.map.mainButton.style.top = pinTop + 'px';

        window.map.mainButton.addEventListener('mousemove', function (click) {
          if (click.button === window.const.LEFT_MOUSE_BUTTON) {
            window.pin.addressArea.value = window.pinLeft + ',' + window.pinTop;
          }
        });
      };

      var onMouseUp = function () {
        if (dragger === true) {
          var onClickPreventDefault = function (click) {
            click.preventDefault();
            window.map.mainButton.removeEventListener('click', onClickPreventDefault);
          };
          window.map.mainButton.addEventListener('click', onClickPreventDefault);
        }
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
      };
      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    }
  });
})();
