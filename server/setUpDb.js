import db from './models/index';

db.sequelize.sync()
  .then(() => {
    console.log('Sequelize successfully synchronized with database');
    process.exit();
  })
  .catch((err) => {
    console.log({
      message: 'Error synchronizing sequelize with database',
      error: err.message,
    });
  });
