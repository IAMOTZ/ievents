export default {
  signUp(inputData) {
    const {
      name,
      email,
      password,
      confirmpassword,
    } = inputData;

    if (name === undefined) {
      return 'User name has to be given';
    }
    if (name === '') {
      return 'User name cannot be empty';
    }
    if (name.length < 5) {
      return 'name must be equal or more than 5 characters';
    }
    if (name.match(/^\S+$/) === null) {
      return 'User name must not contain whitespaces';
    }
    if (email === undefined) {
      return 'User email has to be given';
    }
    if (email === '') {
      return 'User email cannot be empty';
    }
    if (!email.match(/^\S+?@\S+.\S+$/)) {
      return 'email format is wrong';
    }
    if (email.match(/^\S+$/) === null) {
      return 'User email must not contain whitespaces';
    }
    if (password === undefined) {
      return 'User password has to be given';
    }
    if (password === '') {
      return 'User password cannot be empty';
    }
    if (password.match(/^\S+$/) === null) {
      return 'User password must not contain whitespaces';
    }
    if (password.length < 7) {
      return 'password must be equal or more than 7 characters';
    }
    if (!/\d/.test(password) || !/[A-Z]/.test(password) || !/[a-z]/.test(password)) {
      return 'password must contain capital letters, small letters and numbers';
    }
    if (confirmpassword === undefined) {
      return 'User confirmpassword has to be given';
    }
    if (password !== confirmpassword) {
      return 'password and confirmpassword does not match';
    }
    return 'success';
  },

  signin(inputData) {
    const {
      email,
      password,
    } = inputData;

    if (email === undefined) {
      return 'User email has to be given';
    }
    if (email === '') {
      return 'User email cannot be empty';
    }
    if (!email.match(/^\S+?@\S+.\S+$/)) {
      return 'email format is wrong';
    }
    if (email.match(/^\S+$/) === null) {
      return 'User email must not contain whitespaces';
    }
    if (password === undefined) {
      return 'User password has to be given';
    }
    if (password === '') {
      return 'User password cannot be empty';
    }
    if (password.match(/^\S+$/) === null) {
      return 'User password must not contain whitespaces';
    }
    return 'success';
  },
};
