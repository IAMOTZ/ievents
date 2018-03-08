
export const isDefined = input => input !== undefined && input !== null;

export const isNotEmpty = input => input !== '';

export const minCharLength = (input, minCharCount) => input.length >= minCharCount;

export const maxCharLength = (input, maxCharCount) => input.length <= maxCharCount;

export const isAlphanumeric = input => /^[a-z0-9]+$/i.test(input);

export const isEmail = input => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(input);

export const isStrongPassword = input => /\d/.test(input) && /[A-Z]/.test(input) && /[a-z]/.test(input) && input.length > 7;

export const isAMatch = (input1, input2) => input1 === input2;

export const isCorrectDate = (input) => {
  const currentDate = new Date();
  const inputDate = new Date(input);
  const offset = 24 * 60 * 60 * 1000;
  return currentDate.getTime() + offset >= inputDate;
};
