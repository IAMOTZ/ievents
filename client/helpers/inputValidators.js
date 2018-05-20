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
  } else if (!utils.minCharLength(title, 3) || !utils.maxCharLength(title, 30)) {
    errors.titleError = 'Title must be between 3 and 30 characters';
  }
  // Validating description.
  if (utils.isDefined(description) && utils.isNotEmpty(description)) {
    if (!utils.maxCharLength(description, 200)) {
      errors.descriptionError = 'Description must be below 200 characters';
    }
  }
  // Validating date.
  if (!utils.isNotEmpty(date) || !utils.isDefined(date)) {
    errors.dateError = 'Date is required';
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

/**
 * Ensures that user inputs when updating an event are correct.
 * @param {Object} inputs The user inputs.
 * @returns {Object} All the errors identified.
 */
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
    } else if (!utils.minCharLength(title, 3) || !utils.maxCharLength(title, 30)) {
      errors.titleError = 'Title must be between 3 and 30 characters';
    }
  }
  // Validating description.
  if (utils.isDefined(description) && utils.isNotEmpty(description)) {
    if (!utils.maxCharLength(description, 200)) {
      errors.descriptionError = 'Description must be below 200 characters';
    }
  }
  // Validating date.
  if (utils.isDefined(date)) {
    if (!utils.isNotEmpty(date)) {
      errors.dateError = 'Date is required';
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

/**
 * Ensures that user inputs when adding admin are correct.
 * @param {Object} inputs The user inputs.
 * @returns {Object} All the errors identified.
 */
export const validateAddAdminInputs = (inputs) => {
  const { email } = inputs;
  const errors = { emailError: null, errorFound: false };
  // Validateing email.
  if (!utils.isDefined(email) || !utils.isNotEmpty(email)) {
    errors.emailError = 'Email is required';
  } else if (!utils.isEmail(email)) {
    errors.emailError = 'Email format is wrong';
  }
  if (errors.emailError) {
    errors.errorFound = true;
  }
  return errors;
};

/**
 * Ensures that user inputs when changing password are correct.
 * @param {Object} inputs The user inputs.
 * @returns {Object} All the errors identified.
 */
export const validateChangePasswordInputs = (inputs) => {
  const {
    formerPassword, newPassword, confirmNewPassword,
  } = inputs;
  const errors = {
    formerPasswordError: null,
    newPasswordError: null,
    confirmNewPasswordError: null,
  };
  // Validating formerPassword.
  if (!utils.isNotEmpty(formerPassword) || !utils.isDefined(formerPassword)) {
    errors.formerPasswordError = 'Former password is required';
  }
  // Validating newPassword.
  if (!utils.isNotEmpty(newPassword) || !utils.isDefined(newPassword)) {
    errors.newPasswordError = 'New password is required';
  } else if (!utils.minCharLength(newPassword, 7)) {
    errors.newPasswordError = 'New password has to be more than 6 characters';
  } else if (!utils.isStrongPassword(newPassword)) {
    errors.newPasswordError = 'New password must contain capital letters, small letters and numbers';
  }
  // Validating confirmNewPassword
  if (!utils.isNotEmpty(confirmNewPassword) || !utils.isDefined(confirmNewPassword)) {
    errors.confirmNewPasswordError = 'Confirm new password field is required';
  } else if (!utils.isAMatch(newPassword, confirmNewPassword)) {
    errors.confirmNewPasswordError = 'New password and confirm password does not match';
  }
  if (errors.formerPasswordError || errors.newPasswordError
    || errors.confirmNewPasswordError) {
    errors.errorFound = true;
  }
  return errors;
};

/**
 * Ensures that user inputs when deleting account are correct.
 * @param {Object} inputs The user inputs.
 * @returns {Object} All the errors identified.
 */
export const validateDeleteAccountInputs = (inputs) => {
  const { password } = inputs;
  const errors = {
    passwordError: null,
    errorFound: false,
  };
  // Validating password.
  if (!utils.isNotEmpty(password) || !utils.isDefined(password)) {
    errors.passwordError = 'Password is required';
  }
  if (errors.passwordError) {
    errors.errorFound = true;
  }
  return errors;
};

/**
 * Ensures that user inputs when adding a center are correct.
 * @param {Object} inputs The user inputs.
 * @returns {Object} All the errors identified.
 */
export const validateAddCenterInputs = (inputs) => {
  const {
    name, location, details, capacity, price,
  } = inputs;
  const errors = {
    nameError: null,
    locationError: null,
    detailsError: null,
    capacityError: null,
    priceError: null,
    errorFound: false,
  };
  // Validating name.
  if (!utils.isNotEmpty(name) || !utils.isDefined(name)) {
    errors.nameError = 'Name is required';
  } else if (!utils.minCharLength(name, 2) || !utils.maxCharLength(name, 30)) {
    errors.nameError = 'Name must be between 2 and 30 characters';
  }
  // Validating location.
  if (utils.isDefined(location) && utils.isNotEmpty(location)) {
    if (!utils.maxCharLength(location, 50)) {
      errors.locationError = 'Location must be below 50 characters';
    }
  }
  // Validating details.
  if (utils.isDefined(details) && utils.isNotEmpty(details)) {
    if (!utils.maxCharLength(details, 300)) {
      errors.detailsError = 'Details must be below 300 characters';
    }
  }
  // Validating capacity.
  if (!utils.isNotEmpty(capacity) || !utils.isDefined(capacity)) {
    errors.capacityError = 'Capacity is required';
  } else if (!utils.isInteger(capacity)) {
    errors.capacityError = 'Capacity is not valid';
  }
  // Validating price.
  if (!utils.isNotEmpty(price) || !utils.isDefined(price)) {
    errors.priceError = 'Price is required';
  } else if (!utils.isInteger(price)) {
    errors.priceError = 'Price is not valid';
  }
  if (errors.nameError || errors.locationError ||
    errors.detailsError || errors.capacityError ||
    errors.priceError) {
    errors.errorFound = true;
  }
  return errors;
};

export const validateUpdateCenterInputs = (inputs) => {
  const {
    name, location, details, capacity, price,
  } = inputs;
  const errors = {
    nameError: null,
    locationError: null,
    detailsError: null,
    capacityError: null,
    priceError: null,
    errorFound: false,
  };
  // Validating name.
  if (utils.isDefined(name)) {
    if (!utils.isNotEmpty(name)) {
      errors.nameError = 'Name is required';
    } else if (!utils.minCharLength(name, 2) || !utils.maxCharLength(name, 30)) {
      errors.nameError = 'Name must be between 2 and 30 characters';
    }
  }
  // Validating location.
  if (utils.isDefined(location) && utils.isNotEmpty(location)) {
    if (!utils.maxCharLength(location, 50)) {
      errors.locationError = 'Location must be below 50 characters';
    }
  }
  // Validating details.
  if (utils.isDefined(details) && utils.isNotEmpty(details)) {
    if (!utils.maxCharLength(details, 300)) {
      errors.detailsError = 'Details must be below 300 characters';
    }
  }
  // Validating capacity.
  if (utils.isDefined(capacity)) {
    if (!utils.isNotEmpty(capacity) || !utils.isDefined(capacity)) {
      errors.capacityError = 'Capacity is required';
    } else if (!utils.isInteger(capacity)) {
      errors.capacityError = 'Capacity is not valid';
    }
  }
  // Validating price.
  if (utils.isDefined(price)) {
    if (!utils.isNotEmpty(price) || !utils.isDefined(price)) {
      errors.priceError = 'Price is required';
    } else if (!utils.isInteger(price)) {
      errors.priceError = 'Price is not valid';
    }
  }
  if (errors.nameError || errors.locationError ||
    errors.detailsError || errors.capacityError ||
    errors.priceError) {
    errors.errorFound = true;
  }
  return errors;
};
