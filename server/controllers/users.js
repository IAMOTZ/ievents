import jwt from 'jsonwebtoken';
import db from '../models/index';

const { users } = db;

export default {
  signup(req, res) {
    const inputData = {};
    const inputKeys = Object.keys(req.body);
    for (let i = 0; i < inputKeys.length; i += 1) {
      if (typeof (inputKeys[i]) === 'string') {
        inputData[inputKeys[i].toLowerCase()] = req.body[inputKeys[i]];
      }
    }
    const {
      name,
      email,
      password,
      role,
    } = inputData;
    users
      .findOne({
        where: {
          email: email.toLowerCase(),
        },
      })
      .then((userData) => {
        if (userData) {
          res.status(400).json({
            status: 'failed',
            message: 'User already exist',
          });
        } else {
          users
            .create({
              name,
              email: email.toLowerCase(),
              password,
              role,
            })
            .then((newUserData) => {
              const payLoad = {
                id: newUserData.id,
              };
              const token = jwt.sign(payLoad, process.env.JSON_WEB_TOKEN_SECRETE, { expiresIn: '5hr' });
              res.status(201).json({
                status: 'success',
                message: 'user created',
                data: {
                  id: newUserData.id,
                  email: newUserData.email,
                  name: newUserData.name,
                  role: newUserData.role,
                  token,
                },
              });
            });
        }
      })
      .catch((err) => {
        res.status(400).json({
          status: 'error',
          message: err.message,
        });
      });
    return 'done';
  },
};

