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

export const validateSignupInputs = () => {
};
