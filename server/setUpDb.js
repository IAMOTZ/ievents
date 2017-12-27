import db from './models/index';
import { createSuperAdmin } from './helpers';

const { users } = db;

db.sequelize.sync()
  .then(() => {
    createSuperAdmin(users)
      .then(() => {
        process.exit();
      });
  });
