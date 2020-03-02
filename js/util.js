'use strict';

(function () {
  window.util = {
    // удаляет заданный элемент
    removeElement: function (parent) {
      while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
      }
    },
    // возвращает одно рандомное значение из заданного промежутка
    getRandomFromSegment: function (min, max) {
      return Math.round(min - 0.5 + Math.random() * (max - min + 1));
    },
    // возвращает одно рандомное значение из заданного массива
    chooseRandomElement: function (array) {
      return array[Math.floor(Math.random() * array.length)];
    },
    // возвращает массив рандомной длины
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
