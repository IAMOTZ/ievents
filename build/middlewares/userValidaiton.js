'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (req, res, next) {
  var token = req.body.token || req.query.token || req.headers['access-token'];
  if (token) {
    _jsonwebtoken2.default.verify(token, process.env.JSON_WEB_TOKEN_SECRETE, function (err, decoded) {
      if (err) {
        res.status(401).json({
          status: 'failed',
          message: 'Failed to authenticate token'
        });
      } else {
        req.decoded = decoded;
        next();
      }
    });
  } else {
    return res.status(401).send({
      status: 'failed',
      message: 'No access-token provided'
    });
  }
};