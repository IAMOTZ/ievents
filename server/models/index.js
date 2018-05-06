import Sequelize from 'sequelize';
import config from '../config/config';

import users from './users';
import events from './events';
import centers from './centers';

const env = process.env.NODE_ENV || 'development';
const presentConfg = config[env];

let sequelize;

if (presentConfg.use_env_variable) {
  sequelize = new Sequelize(process.env[presentConfg.use_env_variable]);
} else {
  sequelize = new Sequelize(
    presentConfg.database,
    presentConfg.userName,
    presentConfg.password, {
      host: presentConfg.host,
      port: presentConfg.port,
      dialect: 'postgres',
      logging: () => {},
    },
  );
}

const db = {};
db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.users = users(sequelize, Sequelize.DataTypes);
db.events = events(sequelize, Sequelize.DataTypes);
db.centers = centers(sequelize, Sequelize.DataTypes);

db.users.hasMany(db.events);
db.users.hasMany(db.centers);

db.centers.belongsTo(db.users);
db.centers.hasMany(db.events);

db.events.belongsTo(db.users);
db.events.belongsTo(db.centers);

export default db;
