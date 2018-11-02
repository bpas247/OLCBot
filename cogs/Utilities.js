"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.randomGrab = exports.isValidDate = void 0;

const isValidDate = text => {
  var t = text.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);

  if (t !== null) {
    var m = +t[1],
        d = +t[2],
        y = +t[3];
    var date = new Date(y, m - 1, d);
    return date.getFullYear() === y && date.getMonth() === m - 1;
  }

  return false;
};

exports.isValidDate = isValidDate;

const randomGrab = array => {
  return array[Math.floor(Math.random() * array.length)];
};

exports.randomGrab = randomGrab;