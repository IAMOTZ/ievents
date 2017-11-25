import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../server/app';
import db from '../server/models/index';

const { centers, users } = db;

chai.use(chaiHttp);

const should = chai.should();

describe('Centers', () => {
  let adminToken;
  let centerId;
  before((done) => {
    users
      .create({
        name: 'user2',
        email: 'user2@gmail.com',
        password: 'myPassword12',
        confirmPassword: 'myPassword12',
        role: 'admin',
      })
      .then(() => {
        chai.request(app)
          .post('/api/v1/users/login')
          .send({ email: 'user2@gmail.com', password: 'myPassword12' })
          .end((err, res) => {
            res.should.have.status(200);
            adminToken = res.body.token;
            done();
          });
      })
      .catch((err) => {
        console.log({ status: 'creating user error', message: err.message });
      });
  });

  describe('POST: /api/v1/centers', () => {
    it('post when all fields is given', (done) => {
      const reqBody = {
        name: 'ottawa event center',
        location: 'Ottawa USA',
        details: 'It is a beautiful place',
        capacity: '3000',
        type: 'theater',
        facilities: 'table,chairs,projector',
        price: '4000',
        token: adminToken,
      };
      chai.request(app)
        .post('/api/v1/centers')
        .send(reqBody)
        .end((err, res) => {
          centerId = res.body.center.id;
          res.should.have.status(201);
          res.body.status.should.be.eql('success');
          res.body.message.should.be.eql('center created');
          res.body.center.name.should.be.eql(reqBody.name);
          res.body.center.location.should.be.eql(reqBody.location);
          res.body.center.details.should.be.eql(reqBody.details);
          res.body.center.capacity.should.be.eql(Number(reqBody.capacity));
          res.body.center.price.should.be.eql(Number(reqBody.price));
          res.body.center.type.should.be.eql(reqBody.type);
          res.body.center.facilities.should.be.a('array');
          res.body.center.facilities[0].should.be.eql('table');
          res.body.center.facilities[2].should.be.eql('projector');
          done();
        });
    });
    it('should not post when name fields is not given', (done) => {
      const reqBody = {
        location: 'Ottawa USA',
        details: 'It is a beautiful place',
        capacity: '3000',
        type: 'theater',
        facilities: 'table,chairs,projector',
        price: '4000',
        token: adminToken,
      };
      chai.request(app)
        .post('/api/v1/centers')
        .send(reqBody)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.status.should.be.eql('failed');
          res.body.message.should.be.eql('center name is required');
          done();
        });
    });
    it('should not post when type fields is not given', (done) => {
      const reqBody = {
        name: 'Ottawa',
        location: 'Ottawa USA',
        details: 'It is a beautiful place',
        capacity: '3000',
        facilities: 'table,chairs,projector',
        price: '4000',
        token: adminToken,
      };
      chai.request(app)
        .post('/api/v1/centers')
        .send(reqBody)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.status.should.be.eql('failed');
          res.body.message.should.be.eql('center type is required');
          done();
        });
    });
    it('should not post when type fields is wrong', (done) => {
      const reqBody = {
        name: 'Ottawa',
        location: 'Ottawa USA',
        details: 'It is a beautiful place',
        capacity: '3000',
        type: 'anything',
        facilities: 'table,chairs,projector',
        price: '4000',
        token: adminToken,
      };
      chai.request(app)
        .post('/api/v1/centers')
        .send(reqBody)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.status.should.be.eql('failed');
          res.body.message.should.be.eql('center type can either be theater or banquet');
          done();
        });
    });
  });

  describe('GET /api/v1/centers', () => {
    it('get one center', (done) => {
      chai.request(app)
        .get('/api/v1/centers')
        .end((err, res) => {
          res.body.centers.should.be.a('array');
          res.body.centers.length.should.be.eql(1);
          done();
        });
    });
  });

  describe('PUT /api/v1/centers/:id', () => {
    it('should update a center', (done) => {
      const reqBody = {
        name: 'new ottawa event center',
        location: 'new Ottawa USA',
        details: 'It is a beautiful place and I love it',
        capacity: '300',
        type: 'theater',
        facilities: 'table,chairs,projector',
        price: '400',
        token: adminToken,
      };
      chai.request(app)
        .put(`/api/v1/centers/${centerId}`)
        .send(reqBody)
        .end((err, res) => {
          console.log(res.body.message);
          res.should.have.status(200);
          res.body.status.should.be.eql('success');
          res.body.message.should.be.eql('center updated');
          res.body.center.name.should.be.eql(reqBody.name);
          res.body.center.location.should.be.eql(reqBody.location);
          res.body.center.details.should.be.eql(reqBody.details);
          res.body.center.type.should.be.eql(reqBody.type);
          res.body.center.facilities.should.be.a('array');
          res.body.center.facilities[0].should.be.eql('table');
          res.body.center.facilities[2].should.be.eql('projector');
          done();
        });
    });
    it('should not update when new name is an empty string', (done) => {
      const reqBody = {
        name: '',
        location: 'new Ottawa USA',
        details: 'It is a beautiful place and I love it',
        capacity: '300',
        type: 'theater',
        facilities: 'table,chairs,projector',
        price: '400',
        token: adminToken,
      };
      chai.request(app)
        .put(`/api/v1/centers/${centerId}`)
        .send(reqBody)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.message.should.be.eql('center name cannot be empty');
          done();
        });
    });
  });

  describe('GET /api/v1/centers/:id', () => {
    it('should get a single', (done) => {
      chai.request(app)
        .get(`/api/v1/centers/${centerId}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.center.id.should.be.eql(centerId);
          done();
        });
    });
    it('should not get a single center', (done) => {
      const wrongId = 4;
      chai.request(app)
        .get(`/api/v1/centers/${wrongId}`)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.status.should.be.eql('failed');
          res.body.message.should.be.eql('center does not exist');
          done();
        });
    });
  });

  after((done) => {
    centers
      .destroy({
        cascade: true,
        truncate: true,
        restartIdentity: true,
      })
      .then(() => {
        users
          .destroy({
            cascade: true,
            truncate: true,
            restartIdentity: true,
          })
          .then(() => {
            done();
          });
      })
      .catch((err) => {
        console.log({
          status: 'error',
          message: err.message,
        });
      });
  });
});

