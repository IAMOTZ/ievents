import db from './models/index';
import { createSuperAdmin } from './helpers';

const { users } = db;

// Synchronizes the sequelize configurations with the database and then 
// creates the superAdmin if he does not exit.
db.sequelize.sync()
  .then(() => {
    createSuperAdmin(users)
      .then(() => {
        process.exit();
      });
  });
