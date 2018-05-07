/* eslint-disable no-else-return */
import db from '../../models';
import { formatUserData, getUser, generateToken, verifyPassword } from './helpers';

const { users } = db;

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
        message: 'Email or password incorrect',
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
        message: 'Email or password incorrect',
      });
    }
  },

  async changePassword(req, res) {
    const { formerpassword, newpassword } = res.locals.formattedInputs;
    const user = res.locals.currentUser;
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
   */
  async deleteUser(req, res) {
    const userPassword = res.locals.formattedInputs.password;
    const user = res.locals.currentUser;
    if (verifyPassword(userPassword, user.password)) {
      await users.destroy({
        where: {
          email: user.email,
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
