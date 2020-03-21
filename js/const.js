'use strict';

(function () {
  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;
  var ADS_AMOUNT = 8;
  var LEFT_MOUSE_BUTTON = 0;
  var ENTER_KEY = 13;
  var ESC_CODE = 27;
  var MIN_WINDOW_Y = 130;
  var MAX_WINDOW_Y = 630;
  var MIN_WINDOW_X = 1;
  var MAX_WINDOW_X = 1200;
  var TIMEOUT_MS = 10000;
  var LOAD_URL = 'https://js.dump.academy/keksobooking/data';
  var SAVE_URL = 'https://js.dump.academy/keksobooking';
  var DEBOUNCE_INTERVAL = 500;


  window.const = {
    PIN_WIDTH: PIN_WIDTH,
    PIN_HEIGHT: PIN_HEIGHT,
    ADS_AMOUNT: ADS_AMOUNT,
    LEFT_MOUSE_BUTTON: LEFT_MOUSE_BUTTON,
    ENTER_KEY: ENTER_KEY,
    ESC_CODE: ESC_CODE,
    MIN_WINDOW_Y: MIN_WINDOW_Y,
    MAX_WINDOW_Y: MAX_WINDOW_Y,
    MIN_WINDOW_X: MIN_WINDOW_X,
    MAX_WINDOW_X: MAX_WINDOW_X,
    TIMEOUT_MS: TIMEOUT_MS,
    LOAD_URL: LOAD_URL,
    SAVE_URL: SAVE_URL,
    DEBOUNCE_INTERVAL: DEBOUNCE_INTERVAL
  };
})();
