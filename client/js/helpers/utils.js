
export const isDefined = input => input !== undefined && input !== null;

export const isNotEmpty = input => input !== '';

export const minCharLength = input => input.length >= minCharLength;

export const maxCharLength = input => input.length <= maxCharLength;

export const isAlphanumeric = input => /^[a-z0-9]+$/i.test(input);

export const isEmail = input => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(input);

export const isPasswordStrong = input => /\d/.test(input) && /[A-Z]/.test(input) && /[a-z]/.test(input) && input.length > 7;

export const isAMatch = (input1, input2) => input1 === input2;

export const isDateCorrect = (input) => {
  const currentDate = new Date();
  const inputDate = new Date(input);
  const offset = 24 * 60 * 60 * 1000;
  return currentDate.getTime() + offset >= inputDate;
};
