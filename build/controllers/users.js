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
  // Controller for signing up a user
  signup: function signup(req, res) {
    var inputData = {};
    var inputKeys = Object.keys(req.body);
    for (var i = 0; i < inputKeys.length; i += 1) {
      if (typeof inputKeys[i] === 'string') {
        // Convert all the keys of request body to lowercase and trim spaces
        inputData[inputKeys[i].toLowerCase().trim()] = req.body[inputKeys[i]].trim();
      }
    }
    var validationOutput = _users2.default.signUp(inputData); // Validate the user inputs
    if (validationOutput !== 'success') {
      // If validation was not successful, send a failed response
      res.status(400).json({
        status: 'failed',
        message: validationOutput
      });
    } else {
      // If validation was successfull, check if the user already exist
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
          // If the user exist, send a failure response
          res.status(400).json({
            status: 'failed',
            message: 'User already exist'
          });
        } else {
          // If the user does not exist, create a new user
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
              // After creating the user, send a success response to the user with user data
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
        // Send an error respose if there was error in the whole process
        res.status(400).json({
          status: 'error',
          message: err.message
        });
      });
    }
  },


  // Controllers for signing in a user
  signin: function signin(req, res) {
    var inputData = {};
    var inputKeys = Object.keys(req.body);
    for (var i = 0; i < inputKeys.length; i += 1) {
      if (typeof inputKeys[i] === 'string') {
        // Convert all the keys of request body to lowercase and trim spaces
        inputData[inputKeys[i].toLowerCase().trim()] = req.body[inputKeys[i]].trim();
      }
    }
    var validationOutput = _users2.default.signin(inputData); // Validate the user inputs
    if (validationOutput !== 'success') {
      // If validation was not successful, send a failed response
      res.status(400).json({
        status: 'failed',
        message: validationOutput
      });
    } else {
      // If validation was successfull,try retrieving the user forom the databaase
      var email = inputData.email,
          password = inputData.password;

      users.findOne({
        where: {
          email: email.toLowerCase()
        }
      }).then(function (userData) {
        if (!userData) {
          // If user is not found in the database, send a failed response
          res.status(400).json({
            status: 'failed',
            message: 'User not found'
          });
        } else if (userData) {
          // If user exist, check if password is correct
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
              // If password is correct, send a success response with user data
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
        // Send an error respose if there was error in the whole process
        res.status(400).json({ status: 'error', message: err.message });
      });
    }
  }
};