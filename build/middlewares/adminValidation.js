'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = require('../models/index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var users = _index2.default.users;

exports.default = function (req, res, next) {
  var id = req.decoded.id;

  users.findById(id).then(function (userData) {
    if (userData.dataValues.role.toLowerCase() === 'admin') {
      next();
    } else {
      res.status(401).json({
        status: 'failed',
        message: 'You are unauthorized to perform this action'
      });
    }
  });
};