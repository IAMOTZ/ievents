'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  signUp: function signUp(inputData) {
    var name = inputData.name,
        email = inputData.email,
        password = inputData.password,
        confirmpassword = inputData.confirmpassword;


    if (name === undefined) {
      return 'name is required';
    }
    if (name === '') {
      return 'name field cannot be empty';
    }
    if (name.length < 5) {
      return 'name must be equal or more than 5 characters';
    }
    if (name.match(/^\S+$/) === null) {
      return 'name must not contain whitespaces';
    }
    if (name.match(/[$-/:-?{-~!"#^,._`\[\]]/) !== null) {
      return 'name can contain only numbers and letters';
    }
    if (email === undefined) {
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
    if (password === undefined) {
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
    if (confirmpassword === undefined) {
      return 'confirmPassword field is required';
    }
    if (password !== confirmpassword) {
      return 'password and confirm password input does not match';
    }
    return 'success';
  },
  signin: function signin(inputData) {
    var email = inputData.email,
        password = inputData.password;


    if (email === undefined) {
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
    if (password === undefined) {
      return 'password is required';
    }
    if (password === '') {
      return 'password cannot be empty';
    }
    if (password.match(/^\S+$/) === null) {
      return 'password must not contain whitespaces';
    }
    return 'success';
  }
};