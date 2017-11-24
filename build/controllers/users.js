'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _bcryptjs = require('bcryptjs');

var _bcryptjs2 = _interopRequireDefault(_bcryptjs);

var _index = require('../models/index');

var _index2 = _interopRequireDefault(_index);

var _users = require('../validation/users');

var _users2 = _interopRequireDefault(_users);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var users = _index2.default.users;
exports.default = {
  signup: function signup(req, res) {
    var inputData = {};
    var inputKeys = Object.keys(req.body);
    for (var i = 0; i < inputKeys.length; i += 1) {
      if (typeof inputKeys[i] === 'string') {
        inputData[inputKeys[i].toLowerCase()] = req.body[inputKeys[i]];
      }
    }
    var validationOutput = _users2.default.signUp(inputData);
    if (validationOutput !== 'success') {
      res.status(400).json({
        status: 'failed',
        message: validationOutput
      });
    } else {
      var name = inputData.name,
          email = inputData.email,
          password = inputData.password,
          role = inputData.role;


      users.findOne({
        where: {
          email: email.toLowerCase()
        }
      }).then(function (userData) {
        if (userData) {
          res.status(400).json({
            status: 'failed',
            message: 'User already exist'
          });
        } else {
          users.create({
            name: name,
            email: email.toLowerCase(),
            password: password,
            role: role
          }).then(function (newUserData) {
            var payLoad = {
              id: newUserData.id
            };
            var token = _jsonwebtoken2.default.sign(payLoad, process.env.JSON_WEB_TOKEN_SECRETE, { expiresIn: '5hr' });
            res.status(201).json({
              status: 'success',
              message: 'user created',
              user: {
                id: newUserData.id,
                email: newUserData.email,
                name: newUserData.name,
                role: newUserData.role
              },
              token: token
            });
          });
        }
      }).catch(function (err) {
        res.status(400).json({
          status: 'error',
          message: err.message
        });
      });
    }
  },
  signin: function signin(req, res) {
    var inputData = {};
    var inputKeys = Object.keys(req.body);
    for (var i = 0; i < inputKeys.length; i += 1) {
      if (typeof inputKeys[i] === 'string') {
        inputData[inputKeys[i].toLowerCase()] = req.body[inputKeys[i]];
      }
    }
    var validationOutput = _users2.default.signin(inputData);
    if (validationOutput !== 'success') {
      res.status(400).json({
        status: 'failed',
        message: validationOutput
      });
    } else {
      var email = inputData.email,
          password = inputData.password;

      users.findOne({
        where: {
          email: email.toLowerCase()
        }
      }).then(function (userData) {
        if (!userData) {
          res.status(400).json({
            status: 'failed',
            message: 'User not found'
          });
        } else if (userData) {
          if (!_bcryptjs2.default.compareSync(password, userData.password)) {
            res.status(400).json({
              status: 'failed',
              message: 'Password incorrect'
            });
          } else {
            var payLoad = {
              id: userData.id
            };
            var token = _jsonwebtoken2.default.sign(payLoad, process.env.JSON_WEB_TOKEN_SECRETE, { expiresIn: '5hr' });
            res.status(200).json({
              status: 'success',
              message: 'Logged in',
              user: {
                name: userData.name,
                email: userData.email
              },
              token: token
            });
          }
        }
      }).catch(function (err) {
        res.status(400).json({ status: 'error', message: err.message });
      });
    }
  }
};