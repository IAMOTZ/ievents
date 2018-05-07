import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

/**
 * Format the user data to be returned to the user.
 * @param {Object} userData The raw user data gotten from the database.
 * @returns {Object} The formatted user data.
 */
export const formatUserData = userData => (
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
export const generateToken = payLoad => (
  jwt.sign(payLoad, process.env.JSON_WEB_TOKEN_SECRETE, { expiresIn: '48hr' })
);

/**
 * Checks if a user input password is correct.
 * @param {String} textPassword The user input password.
 * @param {String} hashedPassword The hashed password.
 * @returns {Boolean} Truthy values representing if the password is correct or not.
 */
export const verifyPassword = (textPassword, hashedPassword) => (
  bcrypt.compareSync(textPassword, hashedPassword)
);

/**
 * Get a single user from the database.
 * @param {Object} userModel The query interface for users in the database.
 * @param {String} userEmail The email of the user to get.
 * @returns {Object} The user gotten from the database.
 */
export const getUser = async (userModel, userEmail) => {
  const user = await userModel.findOne({
    where: {
      email: userEmail.toLowerCase(),
    },
  });
  return user;
};
