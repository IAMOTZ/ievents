/**
 * A middleware.
 * Ensures that the inputs given when creating a user are valid.
 * @param {Object} req The request object.
 * @param {Object} res The response object.
 * @param {Function} next The function that transfers to the next middleware.
 */
export const validateSignUpInputs = (req, res, next) => {
  const {
    name,
    email,
    password,
    confirmpassword,
  } = res.locals.formattedInputs;
  try {
    if (name === undefined || name === null) {
      throw new Error('name is required');
    }
    if (name === '') {
      throw new Error('name field cannot be empty');
    }
    if (name.length < 3) {
      throw new Error('name must be equal or more than 3 characters');
    }
    if (name.match(/^\S+$/) === null) {
      throw new Error('name must not contain whitespaces');
    }
    if (name.match(/[$-/:-?{-~!"#^,._`[\]]/) !== null) {
      throw new Error('name can contain only numbers and letters');
    }
    if (email === undefined || email === null) {
      throw new Error('email is required');
    }
    if (email === '') {
      throw new Error('email field cannot be empty');
    }
    if (!email.match(/^\S+?@\S+.\S+$/)) {
      throw new Error('email format is wrong');
    }
    if (password === undefined || password === null) {
      throw new Error('password is required');
    }
    if (password === '') {
      throw new Error('password field cannot be empty');
    }
    if (password.match(/^\S+$/) === null) {
      throw new Error('password must not contain whitespaces');
    }
    if (password.length < 7) {
      throw new Error('password must be equal or more than 7 characters');
    }
    if (!/\d/.test(password) || !/[A-Z]/.test(password) || !/[a-z]/.test(password)) {
      throw new Error('password must contain capital letters, small letters and numbers');
    }
    if (confirmpassword === undefined || confirmpassword === null) {
      throw new Error('confirmPassword field is required');
    }
    if (password !== confirmpassword) {
      throw new Error('password and confirm password input does not match');
    }
  } catch (error) {
    res.status(400).json({ status: 'failed', message: error.message });
    return;
  }
  next();
};

/**
 * A middleware.
 * Ensures that the inputs given when authenticating a user are valid.
 * @param {Object} req The request object.
 * @param {Object} res The response object.
 * @param {Function} next The function that transfers to the next middleware.
 */
export const validateSigninInputs = (req, res, next) => {
  const {
    email,
    password,
  } = res.locals.formattedInputs;
  try {
    if (email === undefined || email === null) {
      throw new Error('email is required');
    }
    if (email === '') {
      throw new Error('email cannot be empty');
    }
    if (!email.match(/^\S+?@\S+.\S+$/)) {
      throw new Error('email format is wrong');
    }
    if (password === undefined || password === null) {
      throw new Error('password is required');
    }
    if (password === '') {
      throw new Error('password cannot be empty');
    }
  } catch (error) {
    res.status(400).json({ status: 'failed', message: error.message });
    return;
  }
  next();
};

/**
 * A middleware.
 * Ensures that the inputs given when creating an admin are valid.
 * @param {Object} req The request object.
 * @param {Object} res The response object.
 * @param {Function} next The function that transfers to the next middleware.
 */
export const validateCreateAdminInputs = (req, res, next) => {
  const { email } = res.locals.formattedInputs;
  try {
    if (email === undefined || email === null) {
      throw new Error('email is required');
    }
    if (email === '') {
      throw new Error('email cannot be empty');
    }
    if (!email.match(/^\S+?@\S+.\S+$/)) {
      throw new Error('email format is wrong');
    }
  } catch (error) {
    res.status(400).json({ status: 'failed', message: error.message });
    return;
  }
  next();
};
