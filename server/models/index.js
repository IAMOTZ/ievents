import Sequelize from 'sequelize';
import config from '../config/config';

const env = process.env.NODE_ENV || 'development';
const presentConfg = config[env];

let sequelize;

if (presentConfg.use_env_variable) {
  sequelize = new Sequelize(process.env[presentConfg.use_env_variable]);
} else {
  sequelize = new Sequelize(
    presentConfg.database,
    presentConfg.username,
    presentConfg.password, {
      host: presentConfg.host,
      port: presentConfg.port,
      dialect: presentConfg.dialect,
    },
  );
}

const db = {};
db.sequelize = sequelize;
db.Sequelize = Sequelize;

// fs
//   .readdirSync(__dirname)
//   .filter(file =>
//     (file.indexOf('.') !== 0) &&
//     (file !== basename) &&
//     (file.slice(-3) === '.js'))
//   .forEach((file) => {
//     const model = sequelize.import(path.join(__dirname, file));
//     db[model.name] = model;
//   });

// Object.keys(db).forEach((modelName) => {
//   if (db[modelName].associate) {
//     db[modelName].associate(db);
//   }
// });


export default db;
