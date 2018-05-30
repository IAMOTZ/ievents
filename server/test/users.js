/* eslint-disable import/no-extraneous-dependencies */
import dotEnv from 'dotenv';
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';

dotEnv.config();

// eslint-disable-next-line no-unused-vars
const should = chai.should();

chai.use(chaiHttp);

// The name and confirmPassword are only needed for signup.
const normalUserDetails = {
  name: 'test',
  email: 'test@gmail.com',
  password: 'Password123',
  confirmPassword: 'Password123',
};

const superAdminDetails = {
  email: process.env.SUPER_ADMIN_EMAIL,
  password: process.env.SUPER_ADMIN_PASSWORD,
};

/**
 * Alters some or all of the properties in the normal user details(normalUserDetails).
 * @param {Object} newUserDetails This object would be used to update the normal user details.
 * @returns {Object} The updated user details.
 */
const alterUserDetails = newUserDetails => (
  Object.assign({}, normalUserDetails, newUserDetails)
);

/**
 * An helper function to create a user(signup).
 * @param {Object} userDetails Details of the user to create.
 * @param {Function} assertions The assertions to execute after the request is complete.
 */
const createUser = (userDetails, assertions) => {
  chai.request(app)
    .post('/api/v1/users')
    .send(userDetails)
    .end(assertions);
};

/**
 * An helper function to create an admin.
 * @param {Object} adminDetails The admin details(only the email is required).
 * @param {Function} assertions The assertions to execute after the request is complete.
 */
const createAdmin = (adminDetails, assertions) => {
  chai.request(app)
    .post('/api/v1/users/admin')
    .send(adminDetails)
    .end(assertions);
};

/**
 * An helper function to change the password of a user.
 * @param {Object} passwordDetials The password details.
 * @param {Function} assertions The assertions to execute after the request is complete.
 */
const changePassword = (passwordDetials, assertions) => {
  chai.request(app)
    .put('/api/v1/users/changePassword')
    .send(passwordDetials)
    .end(assertions);
};

/**
 * An helper function to login a user(signin).
 * @param {Object} userDetails The details of the user(email and password required).
 * @param {Funciton} assertions The assertions to execute after the request is complete.
 */
const loginUser = (userDetails, assertions) => {
  chai.request(app)
    .post('/api/v1/users/login')
    .send(userDetails)
    .end(assertions);
};

/**
 * An helper function to delete a user.
 * @param {Object} userDetails The user details(only the password is required)
 * @param {Function} assertions The assertions to execute after the request is complete.
 */
const deleteUser = (userDetails, assertions) => {
  chai.request(app)
    .post('/api/v1/users/deleteUser')
    .send(userDetails)
    .end(assertions);
};

/**
 * An helper function that constructs assertions for a test that is meant to fail.
 * @param {String} message The message expected in the response body.
 * @param {Number} statusCode The status code expected in the response.
 * @param {Fuction} done A callback from mohca to know when this assertion is complete.
 * @returns {Function} The assertion.
 */
const failureAssertions = (message, statusCode = 400, done) => (err, res) => {
  res.should.have.status(statusCode);
  res.body.message.should.be.eql(message);
  res.body.status.should.be.eql('failed');
  done();
};

describe('User Endpoints', () => {
  describe('Signup Endpoint', () => {
    it('should not create a user without name', (done) => {
      createUser(
        alterUserDetails({ name: null }),
        failureAssertions('Name is required', 400, done),
      );
    });
    it('should not create a user with empty name', (done) => {
      createUser(
        alterUserDetails({ name: '' }),
        failureAssertions('Name is required', 400, done),
      );
    });
    it('should not create a user with name less that 3 char', (done) => {
      createUser(
        alterUserDetails({ name: 'te' }),
        failureAssertions('Name must be equal or more than 3 characters', 400, done),
      );
    });
    it('should not create a user with name containing white spaces', (done) => {
      createUser(
        alterUserDetails({ name: 'te st' }),
        failureAssertions('Name can contain only numbers and letters', 400, done),
      );
    });
    it('should not create a user with name containing symbols', (done) => {
      createUser(
        alterUserDetails({ name: 'te&st' }),
        failureAssertions('Name can contain only numbers and letters', 400, done),
      );
    });
    it('should not create a user without email', (done) => {
      createUser(
        alterUserDetails({ email: null }),
        failureAssertions('Email is required', 400, done),
      );
    });
    it('should not create a user with empty email', (done) => {
      createUser(
        alterUserDetails({ email: '' }),
        failureAssertions('Email is required', 400, done),
      );
    });
    it('should not create a user with wrong email format', (done) => {
      createUser(
        alterUserDetails({ email: 'test.com' }),
        failureAssertions('Email format is wrong', 400, done),
      );
    });
    it('should not create user without password', (done) => {
      createUser(
        alterUserDetails({ password: null }),
        failureAssertions('Password is required', 400, done),
      );
    });
    it('should not create a user with empty password', (done) => {
      createUser(
        alterUserDetails({ password: '' }),
        failureAssertions('Password is required', 400, done),
      );
    });
    it('should not create a user with password containing white spaces', (done) => {
      createUser(
        alterUserDetails({ password: 'Pass word123' }),
        failureAssertions('Password must not contain whitespaces', 400, done),
      );
    });
    it('should not create user with password less than 7 char', (done) => {
      createUser(
        alterUserDetails({ password: 'Passw' }),
        failureAssertions('Password must be equal or more than 7 characters', 400, done),
      );
    });
    it('should not create user when password do not contain capital-small letters and numbers', (done) => {
      createUser(
        alterUserDetails({ password: 'paswword' }),
        failureAssertions('Password must contain capital letters, small letters and numbers', 400, done),
      );
    });
    it('should not create user without confirm password field', (done) => {
      createUser(
        alterUserDetails({ confirmPassword: null }),
        failureAssertions('ConfirmPassword field is required', 400, done),
      );
    });
    it('should not create a user if password and confirmPassword field don\'t match', (done) => {
      createUser(
        alterUserDetails({ confirmPassword: 'AnotherPass123' }),
        failureAssertions('Password and confirm password input does not match', 400, done),
      );
    });
    it('should create a new user', (done) => {
      createUser(
        normalUserDetails,
        (err, res) => {
          res.should.have.status(201);
          res.body.status.should.be.eql('success');
          res.body.token.should.be.a('string');
          done();
        },
      );
    });
    it('should create a another new user', (done) => {
      createUser(
        alterUserDetails({ email: 'test2@gmail.com' }),
        (err, res) => {
          res.should.have.status(201);
          res.body.status.should.be.eql('success');
          res.body.token.should.be.a('string');
          done();
        },
      );
    });
    it('should not create a user that already exist', (done) => {
      createUser(
        normalUserDetails,
        failureAssertions('User already exist', 400, done),
      );
    });
  });
  describe('Signin Endpoint', () => {
    it('should not signin a user without email', (done) => {
      loginUser(
        alterUserDetails({ email: null }),
        failureAssertions('Email is required', 400, done),
      );
    });
    it('should not signin a user with empty email', (done) => {
      loginUser(
        alterUserDetails({ email: '' }),
        failureAssertions('Email is required', 400, done),
      );
    });
    it('should not signin a user with wrong email format', (done) => {
      loginUser(
        alterUserDetails({ email: 'test.com' }),
        failureAssertions('Email format is wrong', 400, done),
      );
    });
    it('should not signin a user without password', (done) => {
      loginUser(
        alterUserDetails({ password: null }),
        failureAssertions('Password is required', 400, done),
      );
    });
    it('should not signin a user with empty password', (done) => {
      loginUser(
        alterUserDetails({ password: '' }),
        failureAssertions('Password is required', 400, done),
      );
    });
    it('should not signin a user if password is wrong', (done) => {
      loginUser(
        alterUserDetails({ password: 'WrongPassword123' }),
        failureAssertions('Email or password incorrect', 400, done),
      );
    });
    it('should not signin a user that does not exist', (done) => {
      loginUser(
        alterUserDetails({ email: 'notRegistered@gmail.com' }),
        failureAssertions('Email or password incorrect', 404, done),
      );
    });
    it('should signin a user', (done) => {
      loginUser(
        normalUserDetails,
        (err, res) => {
          res.should.have.status(200);
          res.body.status.should.be.eql('success');
          res.body.token.should.be.a('string');
          done();
        },
      );
    });
  });
  describe('Admin Endpoint', () => {
    let superAdminToken;
    const adminDetails = {
      email: 'test@gmail.com',
      token: null,
    };
    const alterAdminDetails = newAdminDetails => (
      Object.assign({}, adminDetails, newAdminDetails)
    );
    before((done) => {
      loginUser(
        superAdminDetails,
        (err, res) => {
          superAdminToken = res.body.token;
          adminDetails.token = superAdminToken;
          done();
        },
      );
    });
    it('should not create admin without email', (done) => {
      createAdmin(
        alterAdminDetails({ email: null }),
        failureAssertions('Email is required', 400, done),
      );
    });
    it('should not create admin with empty email', (done) => {
      createAdmin(
        alterAdminDetails({ email: '' }),
        failureAssertions('Email is required', 400, done),
      );
    });
    it('should not create admin with wrong email format', (done) => {
      createAdmin(
        alterAdminDetails({ email: 'test.com' }),
        failureAssertions('Email format is wrong', 400, done),
      );
    });
    it('should not create admin, if the user is not registered', (done) => {
      createAdmin(
        alterAdminDetails({ email: 'notRegistered@gmail.com' }),
        failureAssertions('User not found', 404, done),
      );
    });
    it('should create admin', (done) => {
      createAdmin(
        adminDetails,
        (err, res) => {
          res.should.have.status(200);
          res.body.status.should.be.eql('success');
          res.body.message.should.be.eql('The user has been updated to become an admin');
          done();
        },
      );
    });
    it('should not create admin if he already exist', (done) => {
      createAdmin(
        adminDetails,
        failureAssertions('The user is already an admin', 409, done),
      );
    });
  });
  describe('Changing Password Endpoint', () => {
    const passwordDetials = {
      formerPassword: normalUserDetails.password,
      newPassword: 'Password567',
      confirmNewPassword: 'Password567',
      token: null,
    };
    const alterPasswordDetails = newPasswordDetails => (
      Object.assign({}, passwordDetials, newPasswordDetails)
    );
    before('login the users', (done) => {
      loginUser(
        normalUserDetails,
        (err, res) => {
          passwordDetials.token = res.body.token;
          done();
        },
      );
    });
    it('should not change password without the former password', (done) => {
      changePassword(
        alterPasswordDetails({ formerPassword: null }),
        failureAssertions('The former password is required', 400, done),
      );
    });
    it('should not change password without a new password', (done) => {
      changePassword(
        alterPasswordDetails({ newPassword: null }),
        failureAssertions('The new password is required', 400, done),
      );
    });
    it('should not change password without a confirm password field', (done) => {
      changePassword(
        alterPasswordDetails({ confirmNewPassword: null }),
        failureAssertions('Confirm password field is required', 400, done),
      );
    });
    it('should not change password if the new password contains whitespace', (done) => {
      const badPassword = 'Passwo rd567';
      changePassword(
        alterPasswordDetails({
          newPassword: badPassword,
          confirmNewPassword: badPassword,
        }),
        failureAssertions('The new password must not contain whitespaces', 400, done),
      );
    });
    it('should not change password if the new password is less than 7 char', (done) => {
      const badPassword = 'Pass12';
      changePassword(
        alterPasswordDetails({
          newPassword: badPassword,
          confirmNewPassword: badPassword,
        }),
        failureAssertions('The new password must be equal or more than 7 characters', 400, done),
      );
    });
    it('should not change the password if the new password does not contain capital, small letters and number', (done) => {
      const badPassword = 'password';
      changePassword(
        alterPasswordDetails({
          newPassword: badPassword,
          confirmNewPassword: badPassword,
        }),
        failureAssertions('The new password must contain capital letters, small letters and numbers', 400, done),
      );
    });
    it('should not change password if password do not match confirm password', (done) => {
      changePassword(
        alterPasswordDetails({
          newPassword: 'Password567',
          confirmNewPassword: 'Password897',
        }),
        failureAssertions('The new password and confirm password input does not match', 400, done),
      );
    });
    it('should not change password if former password is incorrect', (done) => {
      changePassword(
        alterPasswordDetails({ formerPassword: 'WrongPassword12' }),
        failureAssertions('The former password is incorrect', 400, done),
      );
    });
    it('should change the password', (done) => {
      changePassword(
        passwordDetials,
        (err, res) => {
          res.should.have.status(200);
          res.body.status.should.be.eql('success');
          res.body.message.should.be.eql('Password changed');
          done();
        },
      );
    });
    it('should change the password again', (done) => {
      changePassword(
        alterPasswordDetails({
          formerPassword: 'Password567',
          newPassword: 'Password123',
          confirmNewPassword: 'Password123',
        }),
        (err, res) => {
          res.should.have.status(200);
          res.body.status.should.be.eql('success');
          res.body.message.should.be.eql('Password changed');
          done();
        },
      );
    });
  });
  describe('Delete User Endpoint', () => {
    const userInfo = {
      password: 'Password123',
      token: null,
    };
    const alterUserInfo = newUserInfo => (
      Object.assign({}, userInfo, newUserInfo)
    );
    before('login the user', (done) => {
      loginUser(
        {
          email: 'test2@gmail.com',
          password: userInfo.password,
        },
        (err, res) => {
          userInfo.token = res.body.token;
          done();
        },
      );
    });
    it('should not delete user if password is not given', (done) => {
      deleteUser(
        alterUserInfo({ password: null }),
        failureAssertions('password is required', 400, done),
      );
    });
    it('should not delete user if password is incorrect', (done) => {
      deleteUser(
        alterUserInfo({ password: 'WrongPassword12' }),
        failureAssertions('password incorrect', 400, done),
      );
    });
    it('should delete user', (done) => {
      deleteUser(
        userInfo,
        (err, res) => {
          res.should.have.status(200);
          res.body.status.should.be.eql('success');
          res.body.message.should.be.eql('user deleted');
          done();
        },
      );
    });
    it('should create the user back', (done) => {
      createUser(
        alterUserDetails({ email: 'test2@gmail.com' }),
        (err, res) => {
          res.should.have.status(201);
          res.body.status.should.be.eql('success');
          res.body.token.should.be.a('string');
          done();
        },
      );
    });
  });
});
