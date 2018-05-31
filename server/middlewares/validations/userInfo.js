import * as utils from './utils';
import { failureResponse } from '../../commonHelpers';

/**
 * A middleware.
 * Ensures that the inputs given when creating a user are valid.
 * @param {Object} req The request object.
 * @param {Object} res The response object.
 * @param {Function} next The function that transfers to the next middleware.
 * @returns {Object} The response object with the error message.
 */
export const validateSignUpInputs = (req, res, next) => {
  const {
    name, email, password, confirmpassword,
  } = res.locals.formattedInputs;
  try {
    // Validating Name.
    if (!utils.isNotEmpty(name) || !utils.isDefined(name)) {
      throw new Error('Name is required');
    }
    if (!utils.minCharLength(name, 3)) {
      throw new Error('Name must be equal or more than 3 characters');
    }
    if (!utils.isAlphanumeric(name)) {
      throw new Error('Name can contain only numbers and letters');
    }
    // Validating email.
    if (!utils.isNotEmpty(email) || !utils.isDefined(email)) {
      throw new Error('Email is required');
    }
    if (!utils.isEmail(email)) {
      throw new Error('Email format is wrong');
    }
    // Validating password.
    if (!utils.isNotEmpty(password) || !utils.isDefined(password)) {
      throw new Error('Password is required');
    }
    if (password.match(/^\S+$/) === null) {
      throw new Error('Password must not contain whitespaces');
    }
    if (!utils.minCharLength(password, 7)) {
      throw new Error('Password must be equal or more than 7 characters');
    }
    if (!utils.isStrongPassword(password)) {
      throw new Error('Password must contain capital letters, small letters and numbers');
    }
    // Validating confirm password.
    if (!utils.isNotEmpty(confirmpassword) || !utils.isDefined(confirmpassword)) {
      throw new Error('ConfirmPassword field is required');
    }
    if (!utils.isAMatch(password, confirmpassword)) {
      throw new Error('Password and confirm password input does not match');
    }
  } catch (error) {
    return failureResponse(res, error.message);
  }
  next();
};

/**
 * A middleware.
 * Ensures that the inputs given when authenticating a user are valid.
 * @param {Object} req The request object.
 * @param {Object} res The response object.
 * @param {Function} next The function that transfers to the next middleware.
 * @returns {Object} The response object with the error message.
 */
export const validateSigninInputs = (req, res, next) => {
  const {
    email, password,
  } = res.locals.formattedInputs;
  try {
    // Validating Email.
    if (!utils.isNotEmpty(email) || !utils.isDefined(email)) {
      throw new Error('Email is required');
    }
    if (!utils.isEmail(email)) {
      throw new Error('Email format is wrong');
    }
    // Validating Password.
    if (!utils.isNotEmpty(password) || !utils.isDefined(password)) {
      throw new Error('Password is required');
    }
  } catch (error) {
    return failureResponse(res, error.message);
  }
  next();
};

/**
 * A middleware.
 * Ensures that the inputs given when creating an admin are valid.
 * @param {Object} req The request object.
 * @param {Object} res The response object.
 * @param {Function} next The function that transfers to the next middleware.
 * @returns {Object} The response object with the error message.
 */
export const validateCreateAdminInputs = (req, res, next) => {
  const { email } = res.locals.formattedInputs;
  try {
    if (!utils.isDefined(email) || !utils.isNotEmpty(email)) {
      throw new Error('Email is required');
    }
    if (!utils.isEmail(email)) {
      throw new Error('Email format is wrong');
    }
  } catch (error) {
    return failureResponse(res, error.message);
  }
  next();
};

/**
 * A middleware.
 * Ensures that the inputs given when changing password are valid.
 * @param {Object} req The request object.
 * @param {Object} res  The response objcet.
 * @param {Function} next The function that transfers to the next middleware.
 * @returns {Object} The response object with the error message.
 */
export const validateChangePasswordInputs = (req, res, next) => {
  const {
    formerpassword, newpassword, confirmnewpassword,
  } = res.locals.formattedInputs;
  try {
    // Validating Former password.
    if (!utils.isNotEmpty(formerpassword) || !utils.isDefined(formerpassword)) {
      throw new Error('The former password is required');
    }
    // Validating New password.
    if (!utils.isNotEmpty(newpassword) || !utils.isDefined(newpassword)) {
      throw new Error('The new password is required');
    }
    // Validating Confirm new password.
    if (!utils.isNotEmpty(confirmnewpassword) || !utils.isDefined(confirmnewpassword)) {
      throw new Error('Confirm password field is required');
    }
    // Validating New Password.
    if (newpassword.match(/^\S+$/) === null) {
      throw new Error('The new password must not contain whitespaces');
    }
    if (!utils.minCharLength(newpassword, 7)) {
      throw new Error('The new password must be equal or more than 7 characters');
    }
    if (!utils.isStrongPassword(newpassword)) {
      throw new Error('The new password must contain capital letters, small letters and numbers');
    }
    if (!utils.isAMatch(newpassword, confirmnewpassword)) {
      throw new Error('The new password and confirm password input does not match');
    }
  } catch (error) {
    return failureResponse(res, error.message);
  }
  next();
};

/**
 * A middleware.
 * Ensures that the inputs given when deleting a user are valid.
 * @param {Object} req The request object.
 * @param {Object} res  The response objcet.
 * @param {Object} next The function that transfers to the next middleware.
 * @returns {Object} The response object with the error message.
 */
export const validateDeleteUserInputs = (req, res, next) => {
  const { password } = res.locals.formattedInputs;
  try {
    if (!utils.isNotEmpty(password) || !utils.isDefined(password)) {
      throw new Error('password is required');
    }
  } catch (error) {
    return failureResponse(res, error.message);
  }
  next();
};

/**
 * A middleware.
 * Ensures that the ID of a resource specified in a request is valid.
 * @param {Object} req The request object.
 * @param {Object} res The response object.
 * @param {Function} next The function that transfers to the next middleware.
 * @returns {Object} The response object with the error message.
 */
export const validateResourceID = (req, res, next) => {
  const resourceID = req.params.id;
  if (utils.isInteger(resourceID)) {
    next();
  } else {
    return failureResponse(res, 'Resource ID must be an integer');
  }
};
