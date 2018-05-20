/* eslint-disable import/no-extraneous-dependencies */
import dotEnv from 'dotenv';
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';

dotEnv.config();

// eslint-disable-next-line no-unused-vars
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

/**
 * Alters some or all of the properties in the center details(normalCenterDetails).
 * @param {Object} newCenterDetails This object would be used to update the normalCenterDetails.
 * @returns {Object} The updated center details.
 */
const alterCenterDetails = newCenterDetails => (
  Object.assign({}, normalCenterDetails, newCenterDetails)
);

/**
 * An helper function to create a center.
 * @param {Object} centerDetails The details of the center.
 * @param {Function} assertions The assertions to execute after the request is complete.
 */
const createCenter = (centerDetails, assertions) => {
  chai.request(app)
    .post('/api/v1/centers')
    .send(centerDetails)
    .end(assertions);
};

/**
 * An helper funciton to modify a center.
 * @param {Object} centerDetails This object would be used to update the center.
 * @param {Function} assertions The assertions to execute after the request is complete.
 * @param {Number} id The ID of the center to modify.
 */
const modifyCenter = (centerDetails, assertions, id = centerId) => {
  chai.request(app)
    .put(`/api/v1/centers/${id}`)
    .send(centerDetails)
    .end(assertions);
};

/**
 * An helper function to fetch the centers.
 * @param {Function} assertions The assertions to execute after the request is complete.
 * @param {Object} paginate An optional description of how to paginate the request.
 */
const getCenters = (assertions, paginate = {}) => {
  chai.request(app)
    .get(`/api/v1/centers?limit=${paginate.limit}&&offset=${paginate.offset}`)
    .end(assertions);
};

/**
 * An helper function to fetch just one center.
 * @param {Number} id The ID of the center.
 * @param {Function} assertions The assertions to execute after the request is complete.
 */
const getOneCenter = (id, assertions) => {
  chai.request(app)
    .get(`/api/v1/centers/${id}`)
    .end(assertions);
};

/**
 * An helper function to login a user.
 * @param {Object} userDetails The details of the user.
 * @param {Funciton} assertions The assertions to execute after the request is complete.
 */
const loginUser = (userDetails, assertions) => {
  chai.request(app)
    .post('/api/v1/users/login')
    .send(userDetails)
    .end(assertions);
};

/**
 * An helper function that constructs assertions for a test that is meant to fail.
 * @param {String} message The message expected in the response body.
 * @param {Number} statusCode The status code expected in the response.
 * @param {Fuction} done A callback from mohca to know when this assertion is complete.
 * @returns {Function} The assertions.
 */
const failureAssertions = (message, statusCode = 400, done) => (err, res) => {
  res.should.have.status(statusCode);
  res.body.message.should.be.eql(message);
  res.body.status.should.be.eql('failed');
  done();
};

/**
 * An helper function to generate a certain amount of random characters.
 * @param {Number} length The length of the characters to generate.
 * @returns {String} The random characters generated.
 */
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
    it('should not modify a center if the center ID is not given as an integer', (done) => {
      modifyCenter(
        alterCenterDetails({ name: 'modified name' }),
        failureAssertions('Resource ID must be an integer', 400, done),
        'nonIntegerId',
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
    it('should not get a center with non integer ID', (done) => {
      getOneCenter(
        'nonIntegerID',
        failureAssertions('Resource ID must be an integer', 400, done),
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

  describe('Getting centers by pagination', () => {
    let firstCenterId = null;
    const paginationInfo = 'This response is paginated. This object contains information about the pagination';
    it('should get just one center', (done) => {
      getCenters((err, res) => {
        res.should.have.status(200);
        res.body.centers.should.be.a('array');
        res.body.centers.length.should.be.eql(1);
        firstCenterId = res.body.centers[0].id;
        res.body.paginationInfo.message.should.be.eql(paginationInfo);
        res.body.paginationInfo.limit.should.be.eql(1);
        res.body.paginationInfo.offset.should.be.eql(0);
        res.body.paginationInfo.currentCount.should.be.eql(1);
        res.body.paginationInfo.totalCount.should.be.eql(2);
        done();
      }, { limit: 1 });
    });
    it('should get the second center', (done) => {
      getCenters((err, res) => {
        res.should.have.status(200);
        res.body.centers.should.be.a('array');
        res.body.centers.length.should.be.eql(1);
        res.body.centers[0].id.should.not.be.eql(firstCenterId);
        res.body.paginationInfo.message.should.be.eql(paginationInfo);
        res.body.paginationInfo.limit.should.be.eql(20); // The default limit
        res.body.paginationInfo.offset.should.be.eql(1);
        res.body.paginationInfo.currentCount.should.be.eql(1);
        res.body.paginationInfo.totalCount.should.be.eql(2);
        done();
      }, { offset: 1 });
    });
  });
});
