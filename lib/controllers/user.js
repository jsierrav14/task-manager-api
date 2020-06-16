"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _user = _interopRequireDefault(require("../models/user"));

var _sharp = _interopRequireDefault(require("sharp"));

var _email = require("./email");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var add = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var user, token;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            console.log(req.body);
            user = new _user["default"](req.body);
            _context.prev = 2;
            _context.next = 5;
            return user.save();

          case 5:
            _context.next = 7;
            return (0, _email.sendEmail)(user.email, user.name);

          case 7:
            _context.next = 9;
            return user.generateAuthToken();

          case 9:
            token = _context.sent;
            res.status(201).send({
              user: user,
              token: token
            });
            _context.next = 16;
            break;

          case 13:
            _context.prev = 13;
            _context.t0 = _context["catch"](2);
            res.status(400).send(_context.t0);

          case 16:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[2, 13]]);
  }));

  return function add(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var getProfile = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            console.log(req.user);
            res.status(200).send(req.user);

          case 2:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function getProfile(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

var updateUser = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
    var updates, alloweUpdates, isValidOperation;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            updates = Object.keys(req.body);
            alloweUpdates = ['name', 'email', 'password', 'age'];
            isValidOperation = updates.every(function (update) {
              return alloweUpdates.includes(update);
            });

            if (isValidOperation) {
              _context3.next = 5;
              break;
            }

            return _context3.abrupt("return", res.status(400).send('Invalid update'));

          case 5:
            _context3.prev = 5;
            // const user = await User.findById(req.params.id);
            updates.forEach(function (update) {
              return req.user[update] = req.body[update];
            });
            _context3.next = 9;
            return req.user.save();

          case 9:
            //const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
            res.send(req.user);
            _context3.next = 15;
            break;

          case 12:
            _context3.prev = 12;
            _context3.t0 = _context3["catch"](5);
            res.status(400).send(_context3.t0);

          case 15:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[5, 12]]);
  }));

  return function updateUser(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

var deleteUser = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res) {
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            (0, _email.sendCancelEmail)(req.user.email, req.user.name);
            _context4.next = 4;
            return req.user.remove();

          case 4:
            res.status(200).send(req.user);
            _context4.next = 10;
            break;

          case 7:
            _context4.prev = 7;
            _context4.t0 = _context4["catch"](0);
            res.status(500).send('An error a ocurred');

          case 10:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[0, 7]]);
  }));

  return function deleteUser(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();

var getById = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(req, res) {
    var id, user;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            id = req.params.id;
            _context5.prev = 1;
            _context5.next = 4;
            return _user["default"].findById(id);

          case 4:
            user = _context5.sent;

            if (!user) {
              res.status(404).send('User cannot found');
            }

            res.status(200).send(user);
            _context5.next = 12;
            break;

          case 9:
            _context5.prev = 9;
            _context5.t0 = _context5["catch"](1);
            res.status(500).send('An error a ocurred');

          case 12:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[1, 9]]);
  }));

  return function getById(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();

var uploadProfile = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(req, res) {
    var avatar;
    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.next = 2;
            return (0, _sharp["default"])(req.file.buffer).resize({
              height: 200,
              width: 150
            }).png().toBuffer();

          case 2:
            avatar = _context6.sent;
            req.user.avatar = avatar;
            _context6.next = 6;
            return req.user.save();

          case 6:
            res.send('Avatatar was loaded sucessfully');

          case 7:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  }));

  return function uploadProfile(_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}();

var deleteProfile = /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(req, res) {
    return regeneratorRuntime.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            req.user.avatar = undefined;
            _context7.next = 3;
            return req.user.save();

          case 3:
            res.send('Avatar was delete');

          case 4:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7);
  }));

  return function deleteProfile(_x13, _x14) {
    return _ref7.apply(this, arguments);
  };
}();

var getAvatar = /*#__PURE__*/function () {
  var _ref8 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(req, res) {
    var user;
    return regeneratorRuntime.wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            _context8.prev = 0;
            _context8.next = 3;
            return _user["default"].findById(req.params.id);

          case 3:
            user = _context8.sent;

            if (!user || !user.avatar) {
              res.status(404).send("Avatar doesn't exits");
            }

            res.set('Content-Type', 'image/png');
            res.send(user.avatar);
            _context8.next = 12;
            break;

          case 9:
            _context8.prev = 9;
            _context8.t0 = _context8["catch"](0);
            res.status(404).send();

          case 12:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8, null, [[0, 9]]);
  }));

  return function getAvatar(_x15, _x16) {
    return _ref8.apply(this, arguments);
  };
}();

var uploadDocument = function uploadDocument(req, res) {
  res.send();
};

var logging = /*#__PURE__*/function () {
  var _ref9 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9(req, res) {
    var user, token;
    return regeneratorRuntime.wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            _context9.prev = 0;
            _context9.next = 3;
            return _user["default"].findByCredentials(req.body.email, req.body.password);

          case 3:
            user = _context9.sent;
            _context9.next = 6;
            return user.generateAuthToken();

          case 6:
            token = _context9.sent;
            res.status(201).send({
              user: user,
              token: token
            });
            _context9.next = 13;
            break;

          case 10:
            _context9.prev = 10;
            _context9.t0 = _context9["catch"](0);
            res.status(400).send(_context9.t0);

          case 13:
          case "end":
            return _context9.stop();
        }
      }
    }, _callee9, null, [[0, 10]]);
  }));

  return function logging(_x17, _x18) {
    return _ref9.apply(this, arguments);
  };
}();

var logout = /*#__PURE__*/function () {
  var _ref10 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee10(req, res) {
    return regeneratorRuntime.wrap(function _callee10$(_context10) {
      while (1) {
        switch (_context10.prev = _context10.next) {
          case 0:
            _context10.prev = 0;
            req.user.tokens = req.user.tokens.filter(function (token) {
              return token.token !== req.token;
            });
            _context10.next = 4;
            return req.user.save();

          case 4:
            res.send();
            _context10.next = 10;
            break;

          case 7:
            _context10.prev = 7;
            _context10.t0 = _context10["catch"](0);
            res.status(500).send();

          case 10:
          case "end":
            return _context10.stop();
        }
      }
    }, _callee10, null, [[0, 7]]);
  }));

  return function logout(_x19, _x20) {
    return _ref10.apply(this, arguments);
  };
}();

var logoutAll = /*#__PURE__*/function () {
  var _ref11 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee11(req, res) {
    return regeneratorRuntime.wrap(function _callee11$(_context11) {
      while (1) {
        switch (_context11.prev = _context11.next) {
          case 0:
            _context11.prev = 0;
            req.users.tokens = [];
            _context11.next = 4;
            return req.user.save();

          case 4:
            _context11.next = 9;
            break;

          case 6:
            _context11.prev = 6;
            _context11.t0 = _context11["catch"](0);
            res.status(500).send();

          case 9:
          case "end":
            return _context11.stop();
        }
      }
    }, _callee11, null, [[0, 6]]);
  }));

  return function logoutAll(_x21, _x22) {
    return _ref11.apply(this, arguments);
  };
}();

var UserController = {
  add: add,
  getProfile: getProfile,
  getById: getById,
  updateUser: updateUser,
  uploadProfile: uploadProfile,
  deleteUser: deleteUser,
  deleteProfile: deleteProfile,
  logging: logging,
  logout: logout,
  logoutAll: logoutAll,
  uploadDocument: uploadDocument,
  getAvatar: getAvatar
};
var _default = UserController;
exports["default"] = _default;