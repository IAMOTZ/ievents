import chai from 'chai';
import chaiHttp from 'chai-http';
import db from '../models';
import app from '../app';

const {
  users, centers, events, transactions,
} = db;

const should = chai.should();

chai.use(chaiHttp);

let transactionId;
let adminToken;
let regularUserToken;

const adminUserDetails = {
  email: 'test@gmail.com',
  password: 'Password123',
};

const regularUserDetails = {
  email: 'test2@gmail.com',
  password: 'Password123',
};

const getTransactions = (token, assertions) => {
  chai.request(app)
    .get('/api/v1/transactions')
    .send(token)
    .end(assertions);
};

const deleteTransaction = (token, assertions, id = transactionId) => {
  chai.request(app)
    .delete(`/api/v1/transactions/${id}`)
    .send(token)
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

const clearTable = async (model) => {
  await model.destroy({
    cascade: true,
    truncate: true,
    restartIdentity: true,
  });
  return model;
};

describe('Transactions Endpoint', () => {
  before('login the users', (done) => {
    loginUser(
      // login the amdin.
      adminUserDetails,
      (err, res) => {
        adminToken = res.body.token;
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
  describe('Getting transactions', () => {
    it('should not give transaction to a user that is not an admin', (done) => {
      getTransactions(
        { token: regularUserToken },
        failureAssertions('You are unauthorized to perform this action', 401, done),
      );
    });
    it('should get all transactions', (done) => {
      getTransactions(
        { token: adminToken },
        (err, res) => {
          transactionId = res.body[0].id;
          res.should.have.status(200);
          res.body.should.be.a('array');
          res.body.length.should.be.eql(2);
          done();
        },
      );
    });
  });
  describe('Deleting transactions', () => {
    it('should not delete transaction if the user is not an admin', (done) => {
      deleteTransaction(
        { token: regularUserToken },
        failureAssertions('You are unauthorized to perform this action', 401, done),
      );
    });
    it('should not delete transaction that does not exist', (done) => {
      deleteTransaction(
        { token: adminToken },
        failureAssertions('Transaction does not exist', 404, done),
        1000,
      );
    });
    it('should delete transaction', (done) => {
      deleteTransaction(
        { token: adminToken },
        (err, res) => {
          res.should.have.status(200);
          res.body.status.should.be.eql('success');
          res.body.message.should.be.eql('Transaction successfully deleted');
          done();
        },
      );
    });
  });
  after('clear the tables', async () => {
    await clearTable(transactions);
    await clearTable(events);
    await clearTable(centers);
    await clearTable(users);
  });
});
