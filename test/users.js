import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../server/app';
import db from '../server/models/index';

const { users } = db;

chai.use(chaiHttp);

const should = chai.should();

describe('Authentication', () => {
  describe('POST /api/v1/users', () => {
    it('sign up when all input fields are given', (done) => {
      const reqBody = {
        name: 'Tunmise',
        email: 'OgunniyiTunmis@gmail.com',
        password: 'myPassword12',
        confirmPassword: 'myPassword12',
      };
      chai.request(app)
        .post('/api/v1/users')
        .send(reqBody)
        .end((err, res) => {
          console.log(res.body.message);
          res.should.have.status(201);
          res.body.status.should.be.eql('success');
          res.body.message.should.be.eql('user created');
          res.body.token.should.be.a('string');
          res.body.user.name.should.be.eql(reqBody.name);
          res.body.user.email.should.be.eql(reqBody.email.toLowerCase());
          done();
        });
    });
    it('should not sign up when name is not given', (done) => {
      const reqBody = {
        email: 'OgunniyiTunmise@gmail.com',
        password: 'myPassword12',
        confirmPassword: 'myPassword12',
      };
      chai.request(app)
        .post('/api/v1/users')
        .send(reqBody)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.status.should.be.eql('failed');
          res.body.message.should.be.eql('name is required');
          done();
        });
    });
    it('should not sign up when name is an empty string', (done) => {
      const reqBody = {
        name: '',
        email: 'OgunniyiTunmise@gmail.com',
        password: 'myPassword12',
        confirmPassword: 'myPassword12',
      };
      chai.request(app)
        .post('/api/v1/users')
        .send(reqBody)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.status.should.be.eql('failed');
          res.body.message.should.be.eql('name field cannot be empty');
          done();
        });
    });
    it('should not sign up when name contain special characer', (done) => {
      const reqBody = {
        name: 'tunmise#$',
        email: 'OgunniyiTunmise@gmail.com',
        password: 'myPassword12',
        confirmPassword: 'myPassword12',
      };
      chai.request(app)
        .post('/api/v1/users')
        .send(reqBody)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.status.should.be.eql('failed');
          res.body.message.should.be.eql('name can contain only numbers and letters');
          done();
        });
    });
    it('should not sign up when name is less than 5 characters', (done) => {
      const reqBody = {
        name: 'tun',
        email: 'OgunniyiTunmise@gmail.com',
        password: 'myPassword12',
        confirmPassword: 'myPassword12',
      };
      chai.request(app)
        .post('/api/v1/users')
        .send(reqBody)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.status.should.be.eql('failed');
          res.body.message.should.be.eql('name must be equal or more than 5 characters');
          done();
        });
    });
    it('should not sign up when name contain white spaces', (done) => {
      const reqBody = {
        name: 'tun mise',
        email: 'OgunniyiTunmise@gmail.com',
        password: 'myPassword12',
        confirmPassword: 'myPassword12',
      };
      chai.request(app)
        .post('/api/v1/users')
        .send(reqBody)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.status.should.be.eql('failed');
          res.body.message.should.be.eql('name must not contain whitespaces');
          done();
        });
    });
    it('should not sign up when email is not given', (done) => {
      const reqBody = {
        name: 'tunmise',
        password: 'myPassword12',
        confirmPassword: 'myPassword12',
      };
      chai.request(app)
        .post('/api/v1/users')
        .send(reqBody)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.status.should.be.eql('failed');
          res.body.message.should.be.eql('email is required');
          done();
        });
    });
    it('should not sign up when email is empty', (done) => {
      const reqBody = {
        name: 'tunmise',
        email: '',
        password: 'myPassword12',
        confirmPassword: 'myPassword12',
      };
      chai.request(app)
        .post('/api/v1/users')
        .send(reqBody)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.status.should.be.eql('failed');
          res.body.message.should.be.eql('email field cannot be empty');
          done();
        });
    });
    it('should not sign up when email is of wrong format', (done) => {
      const reqBody = {
        name: 'tunmise',
        email: 'tumise',
        password: 'myPassword12',
        confirmPassword: 'myPassword12',
      };
      chai.request(app)
        .post('/api/v1/users')
        .send(reqBody)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.status.should.be.eql('failed');
          res.body.message.should.be.eql('email format is wrong');
          done();
        });
    });
    it('should not sign up when email contain white spaces', (done) => {
      const reqBody = {
        name: 'tunmise',
        email: 'tunm ise@gmail.com',
        password: 'myPassword12',
        confirmPassword: 'myPassword12',
      };
      chai.request(app)
        .post('/api/v1/users')
        .send(reqBody)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.status.should.be.eql('failed');
          res.body.message.should.be.eql('email format is wrong');
          done();
        });
    });
    it('should not sign up when pasword is not given', (done) => {
      const reqBody = {
        name: 'Tunmise',
        email: 'OgunniyiTunmise@gmail.com',
        confirmPassword: 'myPassword12',
      };
      chai.request(app)
        .post('/api/v1/users')
        .send(reqBody)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.status.should.be.eql('failed');
          res.body.message.should.be.eql('password is required');
          done();
        });
    });
    it('should not sign up when confirm pasword is not given', (done) => {
      const reqBody = {
        name: 'Tunmise',
        email: 'OgunniyiTunmise@gmail.com',
        password: 'myPassword12',
      };
      chai.request(app)
        .post('/api/v1/users')
        .send(reqBody)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.status.should.be.eql('failed');
          res.body.message.should.be.eql('confirmPassword field is required');
          done();
        });
    });
    it('should not sign up when pasword is an empty string', (done) => {
      const reqBody = {
        name: 'Tunmise',
        email: 'OgunniyiTunmise@gmail.com',
        password: '',
        confirmPassword: 'myPassword12',
      };
      chai.request(app)
        .post('/api/v1/users')
        .send(reqBody)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.status.should.be.eql('failed');
          res.body.message.should.be.eql('password field cannot be empty');
          done();
        });
    });
    it('should not sign up when password is not equal to confirm password', (done) => {
      const reqBody = {
        name: 'Tunmise',
        email: 'OgunniyiTunmise@gmail.com',
        password: 'myPassword12',
        confirmPassword: 'anotherPassword',
      };
      chai.request(app)
        .post('/api/v1/users')
        .send(reqBody)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.status.should.be.eql('failed');
          res.body.message.should.be.eql('password and confirm password input does not match');
          done();
        });
    });
  });

  describe('POST /api/v1/users/login', () => {
    before((done) => {
      users
        .create({
          name: 'user1',
          email: 'user1@gmail.com',
          password: 'myPassword12',
          confirmPassword: 'myPassword12',
          role: 'admin',
        })
        .then(() => {
          done();
        })
        .catch((err) => {
          console.log({ status: 'creating user error', message: err.message });
        });
    });
    it('sign in when all input fields are given', (done) => {
      const reqBody = {
        email: 'user1@gmail.com',
        password: 'myPassword12',
      };
      chai.request(app)
        .post('/api/v1/users/login')
        .send(reqBody)
        .end((err, res) => {
          console.log(res.body.message);
          res.should.have.status(200);
          res.body.status.should.be.eql('success');
          res.body.message.should.be.eql('Logged in');
          res.body.token.should.be.a('string');
          res.body.user.email.should.be.eql(reqBody.email.toLowerCase());
          done();
        });
    });
    it('should not sign in when email is not given', (done) => {
      const reqBody = {
        password: 'myPassword12',
      };
      chai.request(app)
        .post('/api/v1/users/login')
        .send(reqBody)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.status.should.be.eql('failed');
          res.body.message.should.be.eql('email is required');
          done();
        });
    });
    it('should not sign in when pasword is not given', (done) => {
      const reqBody = {
        email: 'user1@gmail.com',
      };
      chai.request(app)
        .post('/api/v1/users/login')
        .send(reqBody)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.status.should.be.eql('failed');
          res.body.message.should.be.eql('password is required');
          done();
        });
    });
    it('should not sign in when email is an empty string', (done) => {
      const reqBody = {
        email: '',
        password: 'myPassword12',
      };
      chai.request(app)
        .post('/api/v1/users/login')
        .send(reqBody)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.status.should.be.eql('failed');
          res.body.message.should.be.eql('email cannot be empty');
          done();
        });
    });
    it('should not sign in when pasword is an empty string', (done) => {
      const reqBody = {
        email: 'user1@gmail.com',
        password: '',
      };
      chai.request(app)
        .post('/api/v1/users/login')
        .send(reqBody)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.status.should.be.eql('failed');
          res.body.message.should.be.eql('password cannot be empty');
          done();
        });
    });
  });

  after((done) => {
    users
      .destroy({
        cascade: true,
        truncate: true,
        restartIdentity: true,
      })
      .then(() => {
        done();
      })
      .catch((err) => {
        console.log({
          status: 'error',
          message: err.message,
        });
      });
  });
});
