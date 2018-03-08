import * as utils from './utils';


export const validateSigninInputs = (inputs) => {
  const { email, password } = inputs;
  const errors = {
    emailError: null,
    passwordError: null,
    errorFound: false,
  };
  // Validating Email.
  if (!utils.isNotEmpty(email) || !utils.isDefined(email)) {
    errors.emailError = 'email is required';
  }
  // Validating Password.
  if (!utils.isNotEmpty(password) || !utils.isDefined(password)) {
    errors.passwordError = 'password is required';
  }
  if (errors.emailError || errors.passwordError) {
    errors.errorFound = true;
  }
  return errors;
};

export const validateSignupInputs = (inputs) => {
  const {
    name, email, password, confirmPassword,
  } = inputs;
  const errors = {
    nameError: null,
    emailError: null,
    passwordError: null,
    confirmPasswordError: null,
    errorFound: false,
  };
  // Validating name.
  if (!utils.isNotEmpty(name) || !utils.isDefined(name)) {
    errors.nameError = 'name is required';
  } else if (!utils.minCharLength(name, 3)) {
    errors.nameError = 'name has to be more than 2 characters';
  } else if (!utils.isAlphanumeric(name)) {
    errors.nameError = 'name can only contain letters and numbers';
  }
  // Validating email.
  if (!utils.isNotEmpty(email) || !utils.isDefined(email)) {
    errors.emailError = 'email is required';
  } else if (!utils.isEmail(email)) {
    errors.emailError = 'email format is wrong';
  }
  // Validating password.
  if (!utils.isNotEmpty(password) || !utils.isDefined(password)) {
    errors.passwordError = 'password is required';
  } else if (!utils.minCharLength(password, 7)) {
    errors.passwordError = 'password has to be more than 6 characters';
  } else if (!utils.isStrongPassword(password)) {
    errors.passwordError = 'password must contain capital letters, small letters and numbers';
  }
  // Validating confirmPassword.
  if (!utils.isNotEmpty(confirmPassword) || !utils.isDefined(confirmPassword)) {
    errors.confirmPasswordError = 'confirm password field is required';
  } else if (!utils.isAMatch(password, confirmPassword)) {
    errors.confirmPasswordError = 'password and confirm password does not match';
  }
  if (errors.nameError || errors.emailError ||
    errors.passwordError || errors.confirmPasswordError) {
    errors.errorFound = true;
  }
  return errors;
};
