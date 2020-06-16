"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.uploadAvatar = void 0;

var _multer = _interopRequireDefault(require("multer"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var uploadDocuments = (0, _multer["default"])({
  dest: 'images',
  limits: {
    fileSize: 1000000
  },
  fileFilter: function fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(doc|docx)$/)) {
      return cb(new Error('Please upload a document'));
    }

    cb(undefined, true);
    cb(undefined, false);
  }
});
var uploadAvatar = (0, _multer["default"])({
  limits: {
    fileSize: 1000000
  },
  fileFilter: function fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(new Error('Please upload an image'));
    }

    cb(undefined, true);
    cb(undefined, false);
  }
});
exports.uploadAvatar = uploadAvatar;
var _default = uploadDocuments;
exports["default"] = _default;