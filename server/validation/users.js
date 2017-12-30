export default {
  signUp(inputData) {
    const {
      name,
      email,
      password,
      confirmpassword,
    } = inputData;

    if (name === undefined || name === null) {
      return 'name is required';
    }
    if (name === '') {
      return 'name field cannot be empty';
    }
    if (name.length < 3) {
      return 'name must be equal or more than 3 characters';
    }
    if (name.match(/^\S+$/) === null) {
      return 'name must not contain whitespaces';
    }
    if (name.match(/[$-/:-?{-~!"#^,._`\[\]]/) !== null) {
      return 'name can contain only numbers and letters';
    }
    if (email === undefined || email === null) {
      return 'email is required';
    }
    if (email === '') {
      return 'email field cannot be empty';
    }
    if (!email.match(/^\S+?@\S+.\S+$/)) {
      return 'email format is wrong';
    }
    if (email.match(/^\S+$/) === null) {
      return 'email must not contain whitespaces';
    }
    if (password === undefined || password === null) {
      return 'password is required';
    }
    if (password === '') {
      return 'password field cannot be empty';
    }
    if (password.match(/^\S+$/) === null) {
      return 'password must not contain whitespaces';
    }
    if (password.length < 7) {
      return 'password must be equal or more than 7 characters';
    }
    if (!/\d/.test(password) || !/[A-Z]/.test(password) || !/[a-z]/.test(password)) {
      return 'password must contain capital letters, small letters and numbers';
    }
    if (confirmpassword === undefined || confirmpassword === null) {
      return 'confirmPassword field is required';
    }
    if (password !== confirmpassword) {
      return 'password and confirm password input does not match';
    }
    return 'success';
  },

  signin(inputData) {
    const {
      email,
      password,
    } = inputData;

    if (email === undefined || email === null) {
      return 'email is required';
    }
    if (email === '') {
      return 'email cannot be empty';
    }
    if (!email.match(/^\S+?@\S+.\S+$/)) {
      return 'email format is wrong';
    }
    if (email.match(/^\S+$/) === null) {
      return 'email must not contain whitespaces';
    }
    if (password === undefined || password === null) {
      return 'password is required';
    }
    if (password === '') {
      return 'password cannot be empty';
    }
    if (password.match(/^\S+$/) === null) {
      return 'password must not contain whitespaces';
    }
    return 'success';
  },

  createAdminInput(inputData) {
    const { email } = inputData;
    if (email === undefined || email === null) {
      return 'email is required';
    }
    if (email === '') {
      return 'email cannot be empty';
    }
    if (typeof (email) !== 'string') {
      return 'email has to be a string'
    }
    if (!email.match(/^\S+?@\S+.\S+$/)) {
      return 'email format is wrong';
    }
    if (email.match(/^\S+$/) === null) {
      return 'email must not contain whitespaces';
    }
    return 'success';
  }
};
