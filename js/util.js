'use strict';

(function () {
  window.util = {
    removeElement: function (parent) {
      while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
      }
    },
    getRandomFromSegment: function (min, max) {
      return Math.round(min - 0.5 + Math.random() * (max - min + 1));
    },
    chooseRandomElement: function (array) {
      return array[Math.floor(Math.random() * array.length)];
    },
    getRandomArray: function (array) {
      var number = window.util.getRandomFromSegment(1, array.length);
      var items = [];
      for (var i = 0; i < number; i++) {
        items.push(array[i]);
      }
      return items;
    }
  };
})();
