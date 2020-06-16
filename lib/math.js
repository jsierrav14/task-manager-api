"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.add = exports.farenheitToCelsius = exports.calculateTip = void 0;

var calculateTip = function calculateTip(total) {
  var tipPercent = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : .2;
  var tip = total * tipPercent;
  return total + tip;
};

exports.calculateTip = calculateTip;

var farenheitToCelsius = function farenheitToCelsius(temp) {
  return (temp - 32) / 1.8;
};

exports.farenheitToCelsius = farenheitToCelsius;

var add = function add(a, b) {
  return new Promise(function (resolved, rejected) {
    setTimeout(function () {
      if (a < 0 || b < 0) {
        return rejected('Numbers must be non-negative');
      }

      resolved(a + b);
    });
  });
};

exports.add = add;