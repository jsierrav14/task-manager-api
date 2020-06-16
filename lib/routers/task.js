"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _task = _interopRequireDefault(require("../controllers/task"));

var _auth = _interopRequireDefault(require("../middleware/auth"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = new _express.Router();
router.post('/tasks', _auth["default"], _task["default"].add);
router.get('/tasks', _auth["default"], _task["default"].getAll);
router.get('/tasks/:id', _auth["default"], _task["default"].getById);
router.patch('/task/:id', _auth["default"], _task["default"].updateTask);
router["delete"]('/task/:id', _auth["default"], _task["default"].deleteTask);
var _default = router;
exports["default"] = _default;