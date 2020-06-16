"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.handleError = void 0;

var handleError = function handleError(error, req, res, next) {
  res.status(400).send({
    error: error.message
  });
};

exports.handleError = handleError;