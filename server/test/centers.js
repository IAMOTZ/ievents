import dotEnv from 'dotenv';
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';

dotEnv.config();

const should = chai.should();

chai.use(chaiHttp);

let centerId;
let adminToken;
let regularUserToken;

let normalCenterDetails = {
  name: 'test center',
  location: 'test location',
  details: 'test description',
  capacity: '3000',
  price: '4000',
  token: null,
};

const emptyCenterDetails = {
  name: null,
  location: null,
  details: null,
  capacity: null,
  price: null,
};

const adminUserDetails = {
  email: 'test@gmail.com',
  password: 'Password123',
};

const regularUserDetails = {
  email: 'test2@gmail.com',
  password: 'Password123',
};

const alterCenterDetails = newCenterDetails => (
  Object.assign({}, normalCenterDetails, newCenterDetails)
);

const createCenter = (centerDetails, assertions) => {
  chai.request(app)
    .post('/api/v1/centers')
    .send(centerDetails)
    .end(assertions);
};

const modifyCenter = (centerDetails, assertions, id = centerId) => {
  chai.request(app)
    .put(`/api/v1/centers/${id}`)
    .send(centerDetails)
    .end(assertions);
};

const getCenters = (assertions) => {
  chai.request(app)
    .get('/api/v1/centers')
    .end(assertions);
};

const getOneCenter = (id, assertions) => {
  chai.request(app)
    .get(`/api/v1/centers/${id}`)
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
  res.body.message.should.be.eql(message);
  res.body.status.should.be.eql('failed');
  done();
};

const randomCharacters = length => Array.from({ length }, (e, i) => i).splice(0, length).join('');

describe('Centers Endpoint', () => {
  before('login the users', (done) => {
    loginUser(
      // login the amdin.
      adminUserDetails,
      (err, res) => {
        adminToken = res.body.token;
        normalCenterDetails.token = adminToken; // Set the token to the admin's own by default
        loginUser(
          // login a regualr user.
          regularUserDetails,
          (error, response) => {
            regularUserToken = response.body.token;
            done();
          },
        );
      },
    );
  });
  describe('Creating Center', () => {
    it('should not create center without name', (done) => {
      createCenter(
        alterCenterDetails({ name: null }),
        failureAssertions('Center name is required', 400, done),
      );
    });
    it('should not create center with empty name', (done) => {
      createCenter(
        alterCenterDetails({ name: '' }),
        failureAssertions('Center name is required', 400, done),
      );
    });
    it('should not create center with name less than 2 char', (done) => {
      createCenter(
        alterCenterDetails({ name: 't' }),
        failureAssertions('Center name must be between 2 and 30 characters', 400, done),
      );
    });
    it('should not create center with location greater that 50 char', (done) => {
      createCenter(
        alterCenterDetails({ location: randomCharacters(55) }),
        failureAssertions('Center location must be below 50 characters', 400, done),
      );
    });
    it('should not create center with details greater that 300 char', (done) => {
      createCenter(
        alterCenterDetails({ details: randomCharacters(302) }),
        failureAssertions('Center details must be below 300 characters', 400, done),
      );
    });
    it('should not create center without capacity', (done) => {
      createCenter(
        alterCenterDetails({ capacity: null }),
        failureAssertions('Capacity is required', 400, done),
      );
    });
    it('should not create center if capacity value is not a number', (done) => {
      createCenter(
        alterCenterDetails({ capacity: 'str' }),
        failureAssertions('Center capacity must be an integer in string format', 400, done),
      );
    });
    it('should not create center without price', (done) => {
      createCenter(
        alterCenterDetails({ price: null }),
        failureAssertions('Price is required', 400, done),
      );
    });
    it('should not create center if price value is not a number', (done) => {
      createCenter(
        alterCenterDetails({ price: 'str' }),
        failureAssertions('Center price must be an integer in string format', 400, done),
      );
    });
    it('should not create a center from a regular user', (done) => {
      createCenter(
        alterCenterDetails({ token: regularUserToken }),
        failureAssertions('You are unauthorized to perform this action', 401, done),
      );
    });
    it('should create a center', (done) => {
      createCenter(
        alterCenterDetails({ token: adminToken }),
        (err, res) => {
          res.should.have.status(201);
          res.body.status.should.be.eql('success');
          res.body.message.should.be.eql('Center created');
          res.body.center.name.should.be.eql(normalCenterDetails.name);
          res.body.center.location.should.be.eql(normalCenterDetails.location);
          res.body.center.details.should.be.eql(normalCenterDetails.details);
          res.body.center.capacity.should.be.eql(Number(normalCenterDetails.capacity));
          res.body.center.price.should.be.eql(Number(normalCenterDetails.price));
          centerId = res.body.center.id;
          done();
        },
      );
    });
    it('should create another center', (done) => {
      createCenter(
        alterCenterDetails({
          name: 'test center2', details: 'I am test center2',
        }),
        (err, res) => {
          res.should.have.status(201);
          done();
        },
      );
    });
  });
  describe('Modifying Center', () => {
    before(() => {
      normalCenterDetails = Object.assign({}, normalCenterDetails, emptyCenterDetails);
    });
    it('should not modify a center with empty name', (done) => {
      modifyCenter(
        alterCenterDetails({ name: '' }),
        failureAssertions('Center name is required', 400, done),
      );
    });
    it('should not modify a center with name less than 2 chars', (done) => {
      modifyCenter(
        alterCenterDetails({ name: 't' }),
        failureAssertions('Center name must be between 2 and 30 characters', 400, done),
      );
    });
    it('should not modify a center with name above 30 chars', (done) => {
      modifyCenter(
        alterCenterDetails({ name: randomCharacters(35) }),
        failureAssertions('Center name must be between 2 and 30 characters', 400, done),
      );
    });
    it('should not modify a center with location above 50 chars', (done) => {
      modifyCenter(
        alterCenterDetails({ location: randomCharacters(53) }),
        failureAssertions('Center location must be below 50 characters', 400, done),
      );
    });
    it('should not modify a center with details above 300 chars', (done) => {
      modifyCenter(
        alterCenterDetails({ details: randomCharacters(301) }),
        failureAssertions('Center details must be below 300 characters', 400, done),
      );
    });
    it('should not modify center if capacity value is not a number', (done) => {
      modifyCenter(
        alterCenterDetails({ capacity: 'str' }),
        failureAssertions('Center capacity must be an integer in string format', 400, done),
      );
    });
    it('should not modify center if price value is not a number', (done) => {
      modifyCenter(
        alterCenterDetails({ price: 'str' }),
        failureAssertions('Center price must be an integer in string format', 400, done),
      );
    });
    it('should not modify a center that does not exist', (done) => {
      modifyCenter(
        alterCenterDetails({ name: 'modified name' }),
        failureAssertions('Center does not exist', 404, done),
        1000,
      );
    });
    it('should modify a center', (done) => {
      modifyCenter(
        alterCenterDetails({
          name: 'modified name',
          location: 'modified location',
          details: 'modified details',
          capacity: '500',
          price: '1000',
        }),
        (err, res) => {
          res.should.have.status(200);
          res.body.status.should.be.eql('success');
          res.body.message.should.be.eql('Center updated');
          res.body.center.name.should.be.eql('modified name');
          res.body.center.location.should.be.eql('modified location');
          res.body.center.details.should.be.eql('modified details');
          res.body.center.capacity.should.be.eql('500');
          res.body.center.price.should.be.eql('1000');
          done();
        },
      );
    });
  });
  describe('Getting One Center', () => {
    it('should not get a center that does not exist', (done) => {
      getOneCenter(
        1000,
        failureAssertions('Center does not exist', 404, done),
      );
    });
    it('should get the first center', (done) => {
      getOneCenter(
        1,
        (err, res) => {
          res.should.have.status(200);
          res.body.center.id.should.be.eql(1);
          done();
        },
      );
    });
    it('should get the second center', (done) => {
      getOneCenter(
        2,
        (err, res) => {
          res.should.have.status(200);
          res.body.center.id.should.be.eql(2);
          done();
        },
      );
    });
  });
  describe('Getting All Centers', () => {
    it('should get all the center', (done) => {
      getCenters((err, res) => {
        res.should.have.status(200);
        res.body.centers.should.be.a('array');
        res.body.centers.length.should.be.eql(2);
        done();
      });
    });
  });
});
