import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import db from '../models/index';
import validation from '../validation/users';

const { users } = db;


export default {
  // Controller for signing up a user
  signup(req, res) {
    const inputData = {};
    const inputKeys = Object.keys(req.body);
    for (let i = 0; i < inputKeys.length; i += 1) {
      if (typeof (inputKeys[i]) === 'string') {
        // Convert all the keys of request body to lowercase and trim spaces
        inputData[inputKeys[i].toLowerCase().trim()] = typeof (req.body[inputKeys[i]]) === 'string' ? req.body[inputKeys[i]].trim() : req.body[inputKeys[i]];
      }
    }
    const validationOutput = validation.signUp(inputData); // Validate the user inputs
    if (validationOutput !== 'success') {
      // If validation was not successful, send a failed response
      res.status(400).json({
        status: 'failed',
        message: validationOutput,
      });
    } else {
      // If validation was successfull, check if the user already exist
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
            // If the user exist, send a failure response
            res.status(400).json({
              status: 'failed',
              message: 'User already exist',
            });
          } else {
            // If the user does not exist, create a new user
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
                  // After creating the user, send a success response to the user with user data
                  status: 'success',
                  message: 'user created',
                  user: {
                    id: newUserData.id,
                    email: newUserData.email,
                    name: newUserData.name,
                    role: newUserData.role,
                  },
                  token,
                });
              });
          }
        })
        .catch((err) => {
          // Send an error respose if there was error in the whole process
          res.status(400).json({
            status: 'error',
            message: err.message,
          });
        });
    }
  },

  // Controllers for signing in a user
  signin(req, res) {
    const inputData = {};
    const inputKeys = Object.keys(req.body);
    for (let i = 0; i < inputKeys.length; i += 1) {
      if (typeof (inputKeys[i]) === 'string') {
        // Convert all the keys of request body to lowercase and trim spaces
        inputData[inputKeys[i].toLowerCase().trim()] = req.body[inputKeys[i]].trim();
      }
    }
    const validationOutput = validation.signin(inputData); // Validate the user inputs
    if (validationOutput !== 'success') {
      // If validation was not successful, send a failed response
      res.status(400).json({
        status: 'failed',
        message: validationOutput,
      });
    } else {
      // If validation was successfull,try retrieving the user forom the databaase
      const {
        email,
        password,
      } = inputData;
      users
        .findOne({
          where: {
            email: email.toLowerCase(),
          },
        })
        .then((userData) => {
          if (!userData) {
            // If user is not found in the database, send a failed response
            res.status(400).json({
              status: 'failed',
              message: 'User not found',
            });
          } else if (userData) {
            // If user exist, check if password is correct
            if (!bcrypt.compareSync(password, userData.password)) {
              res.status(400).json({
                status: 'failed',
                message: 'Password incorrect',
              });
            } else {
              const payLoad = {
                id: userData.id,
              };
              const token = jwt.sign(payLoad, process.env.JSON_WEB_TOKEN_SECRETE, { expiresIn: '5hr' });
              res.status(200).json({
                // If password is correct, send a success response with user data
                status: 'success',
                message: 'Logged in',
                user: {
                  name: userData.name,
                  email: userData.email,
                  role: userData.role,
                },
                token,
              });
            }
          }
        })
        .catch((err) => {
          // Send an error respose if there was error in the whole process
          res.status(400).json({ status: 'error', message: err.message });
        });
    }
  },
};
