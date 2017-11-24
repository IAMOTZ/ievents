'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _userValidaiton = require('./middlewares/userValidaiton');

var _userValidaiton2 = _interopRequireDefault(_userValidaiton);

var _adminValidation = require('./middlewares/adminValidation');

var _adminValidation2 = _interopRequireDefault(_adminValidation);

var _index = require('./controllers/index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.post('/users', _index2.default.users.signup);

router.post('/users/login', _index2.default.users.signin);

router.get('/centers', _index2.default.centers.getAll);

router.get('/centers/:id', _index2.default.centers.getOne);

router.use(_userValidaiton2.default);

router.post('/events', _index2.default.events.create);

router.put('/events/:id', _index2.default.events.update);

router.delete('/events/:id', _index2.default.events.delete);

router.use(_adminValidation2.default);

router.post('/centers', _index2.default.centers.create);

router.put('/centers/:id', _index2.default.centers.update);

exports.default = router;