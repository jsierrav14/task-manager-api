"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _task = _interopRequireDefault(require("../models/task"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var add = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var task;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            task = new _task["default"](_objectSpread(_objectSpread({}, req.body), {}, {
              owner: req.user._id
            }));
            _context.prev = 1;
            _context.next = 4;
            return task.save();

          case 4:
            res.status(201).send(task);
            _context.next = 10;
            break;

          case 7:
            _context.prev = 7;
            _context.t0 = _context["catch"](1);
            res.status(500).send(_context.t0);

          case 10:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[1, 7]]);
  }));

  return function add(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var getAll = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
    var match, sort, parts;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            match = {};
            sort = {};

            if (req.query.sortBy) {
              parts = req.query.sortBy.split(':');
              sort[parts[0]] = parts[1] === 'desc' ? -1 : 1;
            }

            if (req.query.completed) {
              match.completed = req.query.completed === 'true';
            }

            _context2.prev = 4;
            _context2.next = 7;
            return req.user.populate({
              path: 'tasks',
              match: match,
              options: {
                limit: parseInt(req.query.limit),
                skip: parseInt(req.query.skip),
                sort: sort
              }
            }).execPopulate();

          case 7:
            res.status(200).send(req.user.tasks);
            _context2.next = 13;
            break;

          case 10:
            _context2.prev = 10;
            _context2.t0 = _context2["catch"](4);
            res.status(500).send();

          case 13:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[4, 10]]);
  }));

  return function getAll(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

var getById = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
    var _id, task;

    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _id = req.params.id;
            _context3.prev = 1;
            _context3.next = 4;
            return _task["default"].findOne({
              _id: _id,
              owner: req.user._id
            });

          case 4:
            task = _context3.sent;

            if (!task) {
              res.status(404).send('Task cannot found');
            }

            res.status(200).send(task);
            _context3.next = 12;
            break;

          case 9:
            _context3.prev = 9;
            _context3.t0 = _context3["catch"](1);
            res.status(400).send(_context3.t0);

          case 12:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[1, 9]]);
  }));

  return function getById(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

var updateTask = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res) {
    var id, updates, alloweUpdates, isValidOperation, task;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            id = req.params.id;
            updates = Object.keys(req.body);
            alloweUpdates = ['name', 'description', 'date', 'completed'];
            isValidOperation = updates.every(function (update) {
              return alloweUpdates.includes(update);
            });

            if (isValidOperation) {
              _context4.next = 6;
              break;
            }

            return _context4.abrupt("return", res.status(400).send('Invalid update'));

          case 6:
            _context4.prev = 6;
            _context4.next = 9;
            return _task["default"].findOne({
              _id: req.params.id,
              owner: req.user._id
            });

          case 9:
            task = _context4.sent;

            // const task = await Task.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
            if (!task) {
              res.status(404).send('Task cannot found');
            }

            updates.forEach(function (update) {
              return task[update] = req.body[update];
            });
            _context4.next = 14;
            return task.save();

          case 14:
            res.status(200).send(task);
            _context4.next = 20;
            break;

          case 17:
            _context4.prev = 17;
            _context4.t0 = _context4["catch"](6);
            res.status(500).send('Server error  ocurred');

          case 20:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[6, 17]]);
  }));

  return function updateTask(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();

var deleteTask = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(req, res) {
    var id, task;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            id = req.params.id;
            _context5.prev = 1;
            _context5.next = 4;
            return _task["default"].findByIdAndDelete({
              _id: id,
              owner: req.user._id
            });

          case 4:
            task = _context5.sent;

            if (!task) {
              res.status(404).send('Cannot found this task');
            }

            res.status(200).send('Task was remove');
            _context5.next = 12;
            break;

          case 9:
            _context5.prev = 9;
            _context5.t0 = _context5["catch"](1);
            res.status(500).send(_context5.t0);

          case 12:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[1, 9]]);
  }));

  return function deleteTask(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();

var TaskController = {
  add: add,
  getAll: getAll,
  getById: getById,
  updateTask: updateTask,
  deleteTask: deleteTask
};
var _default = TaskController;
exports["default"] = _default;