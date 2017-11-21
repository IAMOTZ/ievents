import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../server/app';

const should = chai.should();

chai.use(chaiHttp);

describe('Testing API endpoints', () => {
  describe('It should  respond with status code 200', (done) => {
    chai.request(app)
      .get('/')
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
});

