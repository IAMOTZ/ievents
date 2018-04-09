/* eslint-disable no-else-return */
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import db from '../models';

const { users } = db;

/**
 * Format the user data to be returned to the user.
 * @param {Object} userData The raw user data gotten from the database.
 * @returns {Object} The formatted user data.
 */
const formatUserData = userData => (
  {
    id: userData.id,
    email: userData.email,
    name: userData.name,
    role: userData.role,
  }
);

/**
 * Generates a token.
 * @param {Object} payLoad The information to embed in the token.
 * @returns {String} The token.
 */
const generateToken = payLoad => (
  jwt.sign(payLoad, process.env.JSON_WEB_TOKEN_SECRETE, { expiresIn: '48hr' })
);

/**
 * Checks if a user input password is correct.
 * @param {String} textPassword The user input password.
 * @param {String} hashedPassword The hashed password.
 * @returns {Boolean} Truthy values representing if the password is correct or not.
 */
const verifyPassword = (textPassword, hashedPassword) => (
  bcrypt.compareSync(textPassword, hashedPassword)
);

/**
 * Get a single user from the database.
 * @param {Object} userModel The query interface for users in the database.
 * @param {String} userEmail The email of the user to get.
 * @returns {Object} The user gotten from the database.
 */
const getUser = async (userModel, userEmail) => {
  const user = await userModel.findOne({
    where: {
      email: userEmail.toLowerCase(),
    },
  });
  return user;
};

export default {
  /**
   * Creates a user.
   * @param {Object} req The request object.
   * @param {Object} res The response object.
   * @returns {Object} The response object containing some response data.
   */
  async signup(req, res) {
    const {
      name, email, password,
    } = res.locals.formattedInputs;
    const user = await getUser(users, email);
    if (user) {
      return res.status(400).json({
        status: 'failed',
        message: 'User already exist',
      });
    } else {
      const newUser = await users.create({
        name,
        email: email.toLowerCase(),
        password,
      });
      return res.status(201).json({
        status: 'success',
        message: 'User created',
        token: generateToken(formatUserData(newUser)),
      });
    }
  },

  /**
   * Grants authentication to a registered user.
   * @param {Object} req The request object.
   * @param {Object} res The response object.
   * @returns {Object} The response object containing some response data.
   */
  async signin(req, res) {
    const { email, password } = res.locals.formattedInputs;
    const user = await getUser(users, email);
    if (!user) {
      return res.status(404).json({
        status: 'failed',
        message: 'User not found',
      });
    } else if (verifyPassword(password, user.password)) {
      return res.status(200).json({
        status: 'success',
        message: 'Logged in',
        token: generateToken(formatUserData(user)),
      });
    } else {
      return res.status(400).json({
        status: 'failed',
        message: 'Password incorrect',
      });
    }
  },

  async changePassword(req, res) {
    const { formerpassword, newpassword } = res.locals.formattedInputs;
    const userEmail = req.decoded.email;
    const user = await getUser(users, userEmail);
    if (verifyPassword(formerpassword, user.password)) {
      await user.update({
        password: newpassword,
      });
      return res.status(200).json({
        status: 'success',
        message: 'Password changed',
      });
    } else {
      return res.status(400).json({
        status: 'failed',
        message: 'The former password is incorrect',
      });
    }
  },

  /**
   * Creates an admin user.
   * @param {Object} req The request object.
   * @param {Object} res The response object.
   * @returns {Object} The response object containing some response data.
   */
  async createAdmin(req, res) {
    const { email } = res.locals.formattedInputs;
    const user = await getUser(users, email);
    if (!user) {
      return res.status(404).json({
        status: 'failed',
        message: 'User not found',
      });
    } else if (user.role === 'admin' || user.role === 'superAdmin') {
      return res.status(200).json({
        status: 'failed',
        message: 'The user is already an admin',
      });
    } else {
      await user.update({ role: 'admin' });
      return res.status(200).json({
        status: 'success',
        message: 'The user has been updated to become an admin',
      });
    }
  },

  /**
   * Deletes a user.
   * @param {Object} req The request object.
   * @param {Object} res The response object.
   * @returns {Object} The response object containing some resonse data.
   */
  async deleteUser(req, res) {
    const userEmail = req.decoded.email;
    const userPassword = res.locals.formattedInputs.password;
    const user = await getUser(users, userEmail);
    if (verifyPassword(userPassword, user.password)) {
      await users.destroy({
        where: {
          email: userEmail,
        },
      });
      res.status(200).json({
        status: 'success',
        message: 'user deleted',
      });
    } else {
      res.status(400).json({
        status: 'failed',
        message: 'password incorrect',
      });
    }
  },
};
