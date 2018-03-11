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
      throw new Error('Name is required');
    }
    if (name === '') {
      throw new Error('Name field cannot be empty');
    }
    if (name.length < 3) {
      throw new Error('Name must be equal or more than 3 characters');
    }
    if (name.match(/^\S+$/) === null) {
      throw new Error('Name must not contain whitespaces');
    }
    if (name.match(/[$-/:-?{-~!"#^,._`[\]]/) !== null) {
      throw new Error('Name can contain only numbers and letters');
    }
    if (email === undefined || email === null) {
      throw new Error('Email is required');
    }
    if (email === '') {
      throw new Error('Email field cannot be empty');
    }
    if (!email.match(/^\S+?@\S+.\S+$/)) {
      throw new Error('Email format is wrong');
    }
    if (password === undefined || password === null) {
      throw new Error('Password is required');
    }
    if (password === '') {
      throw new Error('Password field cannot be empty');
    }
    if (password.match(/^\S+$/) === null) {
      throw new Error('Password must not contain whitespaces');
    }
    if (password.length < 7) {
      throw new Error('Password must be equal or more than 7 characters');
    }
    if (!/\d/.test(password) || !/[A-Z]/.test(password) || !/[a-z]/.test(password)) {
      throw new Error('Password must contain capital letters, small letters and numbers');
    }
    if (confirmpassword === undefined || confirmpassword === null) {
      throw new Error('ConfirmPassword field is required');
    }
    if (password !== confirmpassword) {
      throw new Error('Password and confirm password input does not match');
    }
  } catch (error) {
    return res.status(400).json({ status: 'failed', message: error.message });
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
      throw new Error('Email is required');
    }
    if (email === '') {
      throw new Error('Email cannot be empty');
    }
    if (!email.match(/^\S+?@\S+.\S+$/)) {
      throw new Error('Email format is wrong');
    }
    if (password === undefined || password === null) {
      throw new Error('Password is required');
    }
    if (password === '') {
      throw new Error('Password cannot be empty');
    }
  } catch (error) {
    return res.status(400).json({ status: 'failed', message: error.message });
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
      throw new Error('Email is required');
    }
    if (email === '') {
      throw new Error('Email cannot be empty');
    }
    if (!email.match(/^\S+?@\S+.\S+$/)) {
      throw new Error('Email format is wrong');
    }
  } catch (error) {
    return res.status(400).json({ status: 'failed', message: error.message });
  }
  next();
};

/**
 * A middleware.
 * Ensures that the inputs given when changing password are valid.
 * @param {Object} req The request object.
 * @param {Object} res  The response objcet.
 * @param {Object} next The function that transfers to the next middleware.
 */
export const validateChangePasswordInputs = (req, res, next) => {
  const {
    formerpassword, newpassword, confirmnewpassword,
  } = res.locals.formattedInputs;
  try {
    if (!formerpassword) {
      throw new Error('The former password is required');
    }
    if (!newpassword) {
      throw new Error('The new password is required');
    }
    if (!confirmnewpassword) {
      throw new Error('Confirm password field is required');
    }
    if (newpassword.match(/^\S+$/) === null) {
      throw new Error('The new password must not contain whitespaces');
    }
    if (newpassword.length < 7) {
      throw new Error('The new password must be equal or more than 7 characters');
    }
    if (!/\d/.test(newpassword) || !/[A-Z]/.test(newpassword) || !/[a-z]/.test(newpassword)) {
      throw new Error('The new password must contain capital letters, small letters and numbers');
    }
    if (newpassword !== confirmnewpassword) {
      throw new Error('The new password and confirm password input does not match');
    }
  } catch (error) {
    return res.status(400).json({ status: 'failed', message: error.message });
  }
  next();
};

/**
 * A middleware.
 * Ensures that the inputs given when deleting a user are valid.
 * @param {Object} req The request object.
 * @param {Object} res  The response objcet.
 * @param {Object} next The function that transfers to the next middleware.
 */
export const validateDeleteUserInputs = (req, res, next) => {
  const { password } = res.locals.formattedInputs;
  try {
    if (!password) {
      throw new Error('password is required');
    }
  } catch (error) {
    return res.status(400).json({ status: 'failed', message: error.message });
  }
  next();
};
