import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../server/app';

chai.use(chaiHttp);

const should = chai.should();

describe('POST /api/v1/users', () => {
  it('sign up when all input fields are given', function (done) {
    this.timeout(0);
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
        console.log(res.body.message)
        res.should.have.status(201);
        res.body.status.should.be.eql('success');
        res.body.message.should.be.eql('user created');
        res.body.data.token.should.be.a('string');
        res.body.data.name.should.be.eql(reqBody.name);
        res.body.data.email.should.be.eql(reqBody.email.toLowerCase());
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
        res.body.message.should.be.eql('User name has to be given');
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
        res.body.message.should.be.eql('User email has to be given');
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
        res.body.message.should.be.eql('User password has to be given');
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
        res.body.message.should.be.eql('User confirmpassword has to be given');
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
        res.body.message.should.be.eql('User name cannot be empty');
        done();
      });
  });
  it('should not sign up when email is an empty string', (done) => {
    const reqBody = {
      name: 'Tunmise',
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
        res.body.message.should.be.eql('User email cannot be empty');
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
        res.body.message.should.be.eql('User password cannot be empty');
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
        res.body.message.should.be.eql('password and confirmpassword does not match');
        done();
      });
  });
});
