import dotEnv from 'dotenv';
import db from './models/index';

dotEnv.config();

const { users } = db;

db.sequelize.sync()
  .then(() => {
    createSuperAdmin(users)
      .then(() => {
        process.exit();
      });
  });


const createSuperAdmin = (userModel) => {
  return new Promise((resolve, reject) => {
    userModel
      .findOne({
        where: {
          email: process.env.SUPER_ADMIN_EMAIL
        }
      })
      .then((user) => {
        if (user) {
          resolve(null);
        } else {
          resolve(
            userModel
              .create({
                name: process.env.SUPER_ADMIN_NAME,
                email: process.env.SUPER_ADMIN_EMAIL,
                password: process.env.SUPER_ADMIN_PASSWORD,
                role: 'superAdmin',
              })
          );
        }
      });
  });
}

