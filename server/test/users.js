import dotEnv from 'dotenv';
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';

dotEnv.config();

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

const alterUserDetails = newUserDetails => (
  Object.assign({}, normalUserDetails, newUserDetails)
);

const createUser = (userDetails, assertions) => {
  chai.request(app)
    .post('/api/v1/users')
    .send(userDetails)
    .end(assertions);
};

const createAdmin = (adminDetails, assertions) => {
  chai.request(app)
    .post('/api/v1/users/admin')
    .send(adminDetails)
    .end(assertions);
};

const changePassword = (passwordDetials, assertions) => {
  chai.request(app)
    .put('/api/v1/users/changePassword')
    .send(passwordDetials)
    .end(assertions);
};

const loginUser = (userDetails, assertions) => {
  chai.request(app)
    .post('/api/v1/users/login')
    .send(userDetails)
    .end(assertions);
};

const deleteUser = (userDetails, assertions) => {
  chai.request(app)
    .post('/api/v1/users/deleteUser')
    .send(userDetails)
    .end(assertions);
};

const failureAssertions = (message, statusCode = 400, done) => (err, res) => {
  res.should.have.status(statusCode);
  res.body.message.toLowerCase().should.be.eql(message.toLowerCase());
  res.body.status.should.be.eql('failed');
  done();
};

describe('User Endpoints', () => {
  describe('Signup Endpoint', () => {
    it('should not create a user without name', (done) => {
      createUser(
        alterUserDetails({ name: null }),
        failureAssertions('name is required', 400, done),
      );
    });
    it('should not create a user with empty name', (done) => {
      createUser(
        alterUserDetails({ name: '' }),
        failureAssertions('name field cannot be empty', 400, done),
      );
    });
    it('should not create a user with name less that 3 char', (done) => {
      createUser(
        alterUserDetails({ name: 'te' }),
        failureAssertions('name must be equal or more than 3 characters', 400, done),
      );
    });
    it('should not create a user with name containing white spaces', (done) => {
      createUser(
        alterUserDetails({ name: 'te st' }),
        failureAssertions('name must not contain whitespaces', 400, done),
      );
    });
    it('should not create a user with name containing symbols', (done) => {
      createUser(
        alterUserDetails({ name: 'te&st' }),
        failureAssertions('name can contain only numbers and letters', 400, done),
      );
    });
    it('should not create a user without email', (done) => {
      createUser(
        alterUserDetails({ email: null }),
        failureAssertions('email is required', 400, done),
      );
    });
    it('shoulld not create a user with empty email', (done) => {
      createUser(
        alterUserDetails({ email: '' }),
        failureAssertions('email field cannot be empty', 400, done),
      );
    });
    it('should not create a user with wrong email format', (done) => {
      createUser(
        alterUserDetails({ email: 'test.com' }),
        failureAssertions('email format is wrong', 400, done),
      );
    });
    it('should not create user without password', (done) => {
      createUser(
        alterUserDetails({ password: null }),
        failureAssertions('password is required', 400, done),
      );
    });
    it('should not create user with empty password', (done) => {
      createUser(
        alterUserDetails({ password: '' }),
        failureAssertions('password field cannot be empty', 400, done),
      );
    });
    it('should not create a user with password containing white spaces', (done) => {
      createUser(
        alterUserDetails({ password: 'Pass word123' }),
        failureAssertions('password must not contain whitespaces', 400, done),
      );
    });
    it('should not create user with password less than 7 char', (done) => {
      createUser(
        alterUserDetails({ password: 'Passw' }),
        failureAssertions('password must be equal or more than 7 characters', 400, done),
      );
    });
    it('should not create user when password do not contain capital-small letters and numbers', (done) => {
      createUser(
        alterUserDetails({ password: 'paswword' }),
        failureAssertions('password must contain capital letters, small letters and numbers', 400, done),
      );
    });
    it('should not create user without confirm password field', (done) => {
      createUser(
        alterUserDetails({ confirmPassword: null }),
        failureAssertions('confirmPassword field is required', 400, done),
      );
    });
    it('should not create a user if password and confirmPassword field don\'t match', (done) => {
      createUser(
        alterUserDetails({ confirmPassword: 'AnotherPass123' }),
        failureAssertions('password and confirm password input does not match', 400, done),
      );
    });
    it('should create a new user', (done) => {
      createUser(
        normalUserDetails,
        (err, res) => {
          console.log('=====>', res.body);
          res.should.have.status(201);
          res.body.status.should.be.eql('success');
          res.body.token.should.be.a('string');
          res.body.user.name.should.be.eql('test');
          res.body.user.email.should.be.eql('test@gmail.com');
          res.body.user.role.should.be.eql('user');
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
          res.body.user.name.should.be.eql('test');
          res.body.user.email.should.be.eql('test2@gmail.com');
          res.body.user.role.should.be.eql('user');
          done();
        },
      );
    });
    it('should not create a user that already exist', (done) => {
      createUser(
        normalUserDetails,
        failureAssertions('user already exist', 400, done),
      );
    });
  });
  describe('Signin Endpoint', () => {
    it('should not signin a user without email', (done) => {
      loginUser(
        alterUserDetails({ email: null }),
        failureAssertions('email is required', 400, done),
      );
    });
    it('should not signin a user with empty email', (done) => {
      loginUser(
        alterUserDetails({ email: '' }),
        failureAssertions('email cannot be empty', 400, done),
      );
    });
    it('should not signin a user with wrong email format', (done) => {
      loginUser(
        alterUserDetails({ email: 'test.com' }),
        failureAssertions('email format is wrong', 400, done),
      );
    });
    it('should not signin a user without password', (done) => {
      loginUser(
        alterUserDetails({ password: null }),
        failureAssertions('password is required', 400, done),
      );
    });
    it('should not signin a user with empty password', (done) => {
      loginUser(
        alterUserDetails({ password: '' }),
        failureAssertions('password cannot be empty', 400, done),
      );
    });
    it('should not signin a user if password is wrong', (done) => {
      loginUser(
        alterUserDetails({ password: 'WrongPassword123' }),
        failureAssertions('password incorrect', 400, done),
      );
    });
    it('should not signin a user that does not exist', (done) => {
      loginUser(
        alterUserDetails({ email: 'notRegistered@gmail.com' }),
        failureAssertions('user not found', 400, done),
      );
    });
    it('should signin a user', (done) => {
      loginUser(
        normalUserDetails,
        (err, res) => {
          res.should.have.status(200);
          res.body.status.should.be.eql('success');
          res.body.token.should.be.a('string');
          res.body.user.name.should.be.eql('test');
          res.body.user.email.should.be.eql('test@gmail.com');
          res.body.user.role.should.be.eql('user');
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
        failureAssertions('email is required', 400, done),
      );
    });
    it('should not create admin with empty email', (done) => {
      createAdmin(
        alterAdminDetails({ email: '' }),
        failureAssertions('email cannot be empty', 400, done),
      );
    });
    it('should not create admin with wrong email format', (done) => {
      createAdmin(
        alterAdminDetails({ email: 'test.com' }),
        failureAssertions('email format is wrong', 400, done),
      );
    });
    it('should not create admin, if the user is not registered', (done) => {
      createAdmin(
        alterAdminDetails({ email: 'notRegistered@gmail.com' }),
        failureAssertions('user not found', 400, done),
      );
    });
    it('should create admin', (done) => {
      createAdmin(
        adminDetails,
        (err, res) => {
          res.should.have.status(200);
          res.body.status.should.be.eql('success');
          res.body.message.should.be.eql('the user has been updated to become an admin');
          done();
        },
      );
    });
    it('should not create admin if he already exist', (done) => {
      createAdmin(
        adminDetails,
        failureAssertions('the user is already an admin', 200, done),
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
        failureAssertions('the former password is required', 400, done),
      );
    });
    it('should not change password without a new password', (done) => {
      changePassword(
        alterPasswordDetails({ newPassword: null }),
        failureAssertions('the new password is required', 400, done),
      );
    });
    it('should not change password without a confirm password field', (done) => {
      changePassword(
        alterPasswordDetails({ confirmNewPassword: null }),
        failureAssertions('confirm password field is required', 400, done),
      );
    });
    it('should not change password if the new password contains whitespace', (done) => {
      const badPassword = 'Passwo rd567';
      changePassword(
        alterPasswordDetails({
          newPassword: badPassword,
          confirmNewPassword: badPassword,
        }),
        failureAssertions('the new password must not contain whitespaces', 400, done)
      );
    });
    it('should not change password if the new password is less than 7 char', (done) => {
      const badPassword = 'Pass12'
      changePassword(
        alterPasswordDetails({
          newPassword: badPassword,
          confirmNewPassword: badPassword,
        }),
        failureAssertions('the new password must be equal or more than 7 characters', 400, done),
      );
    });
    it('should not change the password if the new password does not contain capital, small letters and number', (done) => {
      const badPassword = 'password';
      changePassword(
        alterPasswordDetails({
          newPassword: badPassword,
          confirmNewPassword: badPassword,
        }),
        failureAssertions('the new password must contain capital letters, small letters and numbers', 400, done),
      );
    });
    it('should not change password if password do not match confirm password', (done) => {
      changePassword(
        alterPasswordDetails({
          newPassword: 'Password567',
          confirmNewPassword: 'Password897',
        }),
        failureAssertions('the new password and confirm password input does not match', 400, done),
      );
    });
    it('should not change password if former password is incorrect', (done) => {
      changePassword(
        alterPasswordDetails({ formerPassword: 'WrongPassword12' }),
        failureAssertions('the former password is incorrect', 400, done),
      );
    });
    it('should change the password', (done) => {
      changePassword(
        passwordDetials,
        (err, res) => {
          res.should.have.status(200);
          res.body.status.should.be.eql('success')
          res.body.message.should.be.eql('password changed');
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
          res.body.status.should.be.eql('success')
          res.body.message.should.be.eql('password changed');
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
          res.body.user.name.should.be.eql('test');
          res.body.user.email.should.be.eql('test2@gmail.com');
          res.body.user.role.should.be.eql('user');
          done();
        },
      );
    });
  });
});
