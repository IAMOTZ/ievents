import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import db from '../models';

const { users } = db;

/**
 * Format the user data to be returned to the user.
 * @param {Object} userData The raw user data gotten from the database.
 * @returns {Object} The formatted user data.
 */
const formatUserData = (userData) => {
  return {
    id: userData.id,
    email: userData.email,
    name: userData.name,
    role: userData.role,
  };
};

/**
 * Generates a token.
 * @param {Object} payLoad The information to embed in the token.
 * @returns {String} The token.
 */
const generateToken = (payLoad) => {
  return jwt.sign(payLoad, process.env.JSON_WEB_TOKEN_SECRETE, { expiresIn: '48hr' });
}

/**
 * Checks if a user input password is correct.
 * @param {String} textPassword The user input password.
 * @param {String} hashedPassword The hashed password.
 * @returns {Boolean} Truthy values representing if the password is correct or not.
 */
const verifyPassword = (textPassword, hashedPassword) => {
  return bcrypt.compareSync(textPassword, hashedPassword);
}

/**
 * Get a single user from the database.
 * @param {Object} userModel The query interface for users in the database.
 * @param {String} userEmail The email of the user to get.
 * @returns {Object} The user gotten from the database.
 */
const getUser = async (userModel, userEmail) => {
  const user = await userModel.findOne({
    where: {
      email: userEmail.toLowerCase()
    }
  });
  return user;
}

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
        message: 'user created',
        user: formatUserData(newUser),
        token: generateToken({ id: newUser.id, role: newUser.role, }),
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
    const { email, password, } = res.locals.formattedInputs;
    const user = await getUser(users, email, );
    if (!user) {
      return res.status(400).json({
        status: 'failed',
        message: 'user not found',
      });
    } else if (verifyPassword(password, user.password)) {
      return res.status(200).json({
        status: 'success',
        message: 'Logged in',
        user: formatUserData(user),
        token: generateToken({ id: user.id, role: user.role, }),
      });
    } else {
      res.status(400).json({
        status: 'failed',
        message: 'password incorrect',
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
      return res.status(400).json({
        status: 'failed',
        message: 'user not found',
      });
    } else if (user.role === 'admin' || user.role === 'superAdmin') {
      return res.status(200).json({
        status: 'failed',
        message: 'the user is already an admin',
      });
    } else {
      await user.update({ role: 'admin' });
      return res.status(200).json({
        status: 'success',
        message: 'the user has been updated to become an admin',
      });
    }
  }
};
