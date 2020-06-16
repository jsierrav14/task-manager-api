"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _user = _interopRequireDefault(require("../controllers/user"));

var _auth = _interopRequireDefault(require("../middleware/auth"));

var _upload = _interopRequireWildcard(require("../middleware/upload"));

var _errors = require("../middleware/errors");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = new _express.Router();
router.post('/users', _user["default"].add);
router.get('/users/me', _auth["default"], _user["default"].getProfile);
router.get('/users/:id', _user["default"].getById);
router.patch('/users/me', _auth["default"], _user["default"].updateUser);
router["delete"]('/users/me', _auth["default"], _user["default"].deleteUser);
router.post('/users/login', _user["default"].logging);
router.post('/users/logout', _auth["default"], _user["default"].logout);
router.post('/users/logoutAll', _auth["default"], _user["default"].logoutAll);
router.post('/users/me/avatar', _auth["default"], _upload.uploadAvatar.single('upload'), _user["default"].uploadProfile, _errors.handleError);
router.post('/upload', _auth["default"], _upload["default"].single('upload'), _user["default"].uploadDocument, _errors.handleError);
router["delete"]('/users/me/avatar', _auth["default"], _user["default"].deleteProfile);
router.get('/users/:id/avatar', _user["default"].getAvatar);
var _default = router;
exports["default"] = _default;