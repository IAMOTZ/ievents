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

const loginUser = (userDetails, assertions) => {
  chai.request(app)
    .post('/api/v1/users/login')
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
  // after((done) => {
  //   users
  //     .destroy({
  //       cascade: true,
  //       truncate: true,
  //       restartIdentity: true,
  //     })
  //     .then(() => { done(); });
  // });
});
