import db from '../models/index';

const { users } = db;

export default (req, res, next) => {
  const { id } = req.decoded;
  users
    .findById(id)
    .then((userData) => {
      if (userData.dataValues.role.toLowerCase() === 'admin') {
        next();
      } else {
        res.status(401).json({
          status: 'failed',
          message: 'You are unauthorized to perform this action',
        });
      }
    });
};
