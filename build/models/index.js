'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _sequelize = require('sequelize');

var _sequelize2 = _interopRequireDefault(_sequelize);

var _config = require('../config/config');

var _config2 = _interopRequireDefault(_config);

var _users = require('./users');

var _users2 = _interopRequireDefault(_users);

var _events = require('./events');

var _events2 = _interopRequireDefault(_events);

var _centers = require('./centers');

var _centers2 = _interopRequireDefault(_centers);

var _transactions = require('./transactions');

var _transactions2 = _interopRequireDefault(_transactions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var env = process.env.NODE_ENV || 'development';
var presentConfg = _config2.default[env];

var sequelize = void 0;

console.log('we are on ' + env + ' enviroment');

if (presentConfg.use_env_variable) {
  sequelize = new _sequelize2.default(process.env[presentConfg.use_env_variable]);
} else {
  sequelize = new _sequelize2.default(presentConfg.database, presentConfg.userName, presentConfg.password, {
    host: presentConfg.host,
    port: presentConfg.port,
    dialect: 'postgres'
  });
}

var db = {};
db.sequelize = sequelize;
db.Sequelize = _sequelize2.default;

db.users = (0, _users2.default)(sequelize, _sequelize2.default.DataTypes);
db.events = (0, _events2.default)(sequelize, _sequelize2.default.DataTypes);
db.centers = (0, _centers2.default)(sequelize, _sequelize2.default.DataTypes);
db.transactions = (0, _transactions2.default)(sequelize, _sequelize2.default.DataTypes);

db.users.hasMany(db.events);
db.users.hasMany(db.centers);
db.users.hasMany(db.transactions);

db.centers.belongsTo(db.users);
db.centers.hasOne(db.transactions);
db.centers.hasMany(db.events);

db.events.belongsTo(db.users);
db.events.belongsTo(db.centers);

db.transactions.belongsTo(db.users);
db.transactions.belongsTo(db.centers);

exports.default = db;