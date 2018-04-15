
/**
 * Ensures that a value is not undefined or null.
 * @param {String} input The value to verify.
 * @returns {Boolean} Truthy value to tell if the check is successsful or not.
 */
export const isDefined = input => input !== undefined && input !== null;

/**
 * Ensures that a string is not empty.
 * @param {String} input The string to verify.
 * @returns {Boolean} Truthy value to tell if the check is successsful or not.
 */
export const isNotEmpty = (input) => {
  const result = input ? input.trim() !== '' : false;
  return result;
};

/**
 * Ensures that a string is of a minimum length.
 * @param {String} input The string to verify.
 * @param {Number} minCharCount The minimum length.
 * @returns {Boolean} Truthy value to tell if the check is successsful or not.
 */
export const minCharLength = (input, minCharCount) => input.length >= minCharCount;

/**
 * Ensures that a string is of a maximum length.
 * @param {String} input The string to verify.
 * @param {Number} maxCharCount The maximum length.
 * @returns {Boolean} Truthy value to tell if the check is successsful or not.
 */
export const maxCharLength = (input, maxCharCount) => input.length <= maxCharCount;

/**
 * Ensures that a string contains alphanumeric characters.
 * @param {String} input The string to verify.
 * @returns {Boolean} Truthy value to tell if the check is successsful or not.
 */
export const isAlphanumeric = input => /^[a-z0-9]+$/i.test(input);

/**
 * Ensures that a number is an integer.
 * The number to be verified can be a string text or a number value.
 * @param {String} input The number to verify.
 * @returns {Boolean} Truthy value to tell if the check is successsful or not.
 */
export const isInteger = (input) => {
  if (typeof input === 'string' || typeof input === 'number') {
    return Number.isInteger(Number(input)) || false;
  }
  return false;
};

/**
 * Ensures that an email string is in the correct format.
 * @param {String} input The email string to verify.
 * @returns {Boolean} Truthy value to tell if the check is successsful or not.
 */
export const isEmail = input => /^.+?@.+?\..+$/.test(input);

/**
 * Ensures that a string representing password is strong.
 * The password must be greater that 7 charachters.
 * The password should contain capital letters, small letters and numbers.
 * @param {String} input The password string to verify.
 * @returns {Boolean} Truthy value to tell if the check is successsful or not.
 */
export const isStrongPassword = input => (
  /\d/.test(input) &&
  /[A-Z]/.test(input) &&
  /[a-z]/.test(input) &&
  input.length > 7
);

/**
 * Ensures that two values matches themselves.
 * @param {String} input1 The first value.
 * @param {String} input2 The second value.
 * @returns {Boolean} Truthy value to tell if the check is successsful or not.
 */
export const isAMatch = (input1, input2) => input1 === input2;
