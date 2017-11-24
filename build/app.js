'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _index = require('./models/index');

var _index2 = _interopRequireDefault(_index);

var _apiRoutes = require('./apiRoutes');

var _apiRoutes2 = _interopRequireDefault(_apiRoutes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();

if (process.env.NODE_ENV !== 'test') {
  app.use((0, _morgan2.default)('dev'));
}

app.use(_bodyParser2.default.json());
app.use(_bodyParser2.default.urlencoded({ extended: false }));

app.use('/api/v1', _apiRoutes2.default);

app.use(function (req, res) {
  res.status(404).json({ error: 'page not found' });
});

app.set('port', process.env.PORT || 3000);

_index2.default.sequelize.sync().then(function () {
  app.listen(app.get('port'), function () {
    console.log('App started on port ' + app.get('port'));
  });
});

exports.default = app;