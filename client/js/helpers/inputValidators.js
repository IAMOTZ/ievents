import * as utils from './utils';

/**
 * Ensures that user inputs when signing up are correct.
 * @param {Object} inputs The user inputs
 * @returns {Object} All the errors identified
 */
export const validateSigninInputs = (inputs) => {
  const { email, password } = inputs;
  const errors = {
    emailError: null,
    passwordError: null,
    errorFound: false,
  };
  // Validating Email.
  if (!utils.isNotEmpty(email) || !utils.isDefined(email)) {
    errors.emailError = 'Email is required';
  }
  // Validating Password.
  if (!utils.isNotEmpty(password) || !utils.isDefined(password)) {
    errors.passwordError = 'Password is required';
  }
  if (errors.emailError || errors.passwordError) {
    errors.errorFound = true;
  }
  return errors;
};

/**
 * Ensures that user inputs when signing in are correct.
 * @param {Object} inputs The user inputs.
 * @returns {Object} All the errors identified.
 */
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
    errors.nameError = 'Name is required';
  } else if (!utils.minCharLength(name, 3)) {
    errors.nameError = 'Name has to be more than 2 characters';
  } else if (!utils.isAlphanumeric(name)) {
    errors.nameError = 'Name can only contain letters and numbers';
  }
  // Validating email.
  if (!utils.isNotEmpty(email) || !utils.isDefined(email)) {
    errors.emailError = 'Email is required';
  } else if (!utils.isEmail(email)) {
    errors.emailError = 'Email format is wrong';
  }
  // Validating password.
  if (!utils.isNotEmpty(password) || !utils.isDefined(password)) {
    errors.passwordError = 'Password is required';
  } else if (!utils.minCharLength(password, 7)) {
    errors.passwordError = 'Password has to be more than 6 characters';
  } else if (!utils.isStrongPassword(password)) {
    errors.passwordError = 'Password must contain capital letters, small letters and numbers';
  }
  // Validating confirmPassword.
  if (!utils.isNotEmpty(confirmPassword) || !utils.isDefined(confirmPassword)) {
    errors.confirmPasswordError = 'Confirm password field is required';
  } else if (!utils.isAMatch(password, confirmPassword)) {
    errors.confirmPasswordError = 'Password and confirm password does not match';
  }
  if (errors.nameError || errors.emailError ||
    errors.passwordError || errors.confirmPasswordError) {
    errors.errorFound = true;
  }
  return errors;
};

/**
 * Ensures that user inputs when adding event are correct.
 * @param {Object} inputs The user inputs.
 * @returns {Object} All the errors identified.
 */
export const validateAddEventInputs = (inputs) => {
  const {
    title, description, date, centerId,
  } = inputs;
  const errors = {
    titleError: null,
    descriptionError: null,
    dateError: null,
    centerIdError: null,
    errorFound: false,
  };
  // Validating title.
  if (!utils.isNotEmpty(title) || !utils.isDefined(title)) {
    errors.titleError = 'Title is required';
  } else if (!utils.minCharLength(title, 5) || !utils.maxCharLength(title, 30)) {
    errors.titleError = 'Title must be between 5 and 30 characters';
  }
  // Validating description.
  if (utils.isDefined(description) && utils.isNotEmpty(description)) {
    if (!utils.maxCharLength(description, 200)) {
      errors.descriptionError = 'Description must be less that 200 characters';
    }
  }
  // Validating date.
  if (!utils.isNotEmpty(date) || !utils.isDefined(date)) {
    errors.dateError = 'date is required';
  } else if (!utils.isCorrectDate(date)) {
    errors.dateError = 'Choose today or upcoming days';
  }
  // Validating center.
  if (!utils.isNotEmpty(centerId) || !utils.isDefined(centerId)) {
    errors.centerIdError = 'Center is required';
  }
  if (errors.titleError || errors.descriptionError
    || errors.dateError || errors.centerIdError) {
    errors.errorFound = true;
  }
  return errors;
};

export const validateUpdateEventInputs = (inputs) => {
  const {
    title, description, date, centerId,
  } = inputs;
  const errors = {
    titleError: null,
    descriptionError: null,
    dateError: null,
    centerIdError: null,
    errorFound: false,
  };
  // Validating title.
  if (utils.isDefined(title)) {
    if (!utils.isNotEmpty(title)) {
      errors.titleError = 'Title is required';
    } else if (!utils.minCharLength(title, 5) || !utils.maxCharLength(title, 30)) {
      errors.titleError = 'Title must be between 5 and 30 characters';
    }
  }
  // Validating description.
  if (utils.isDefined(description) && utils.isNotEmpty(description)) {
    if (!utils.maxCharLength(description, 200)) {
      errors.descriptionError = 'Description must be less that 200 characters';
    }
  }
  // Validating date.
  if (utils.isDefined(date)) {
    if (!utils.isNotEmpty(date)) {
      errors.dateError = 'date is required';
    } else if (!utils.isCorrectDate(date)) {
      errors.dateError = 'Choose today or upcoming days';
    }
  }
  // Validating center.
  if (utils.isDefined(centerId)) {
    if (!utils.isNotEmpty(centerId)) {
      errors.centerIdError = 'Center is required';
    }
  }
  if (errors.titleError || errors.descriptionError
    || errors.dateError || errors.centerIdError) {
    errors.errorFound = true;
  }
  return errors;
};
