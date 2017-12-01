import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../server/app';
import db from '../server/models/index';

const { centers, users } = db;

chai.use(chaiHttp);

const should = chai.should();

describe('Events', () => {
  let userToken;
  let eventId;
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
            userToken = res.body.token;
            centers
              .create({
                name: 'havilla event center',
                location: 'Ottawa USA',
                details: 'It is a beautiful place',
                capacity: '3000',
                type: 'theater',
                facilities: ['table', 'chairs', 'projector'],
                price: '4000',
              })
              .then((centerData) => {
                centerId = centerData.id.toString();
                done();
              });
          });
      })
      .catch((err) => {
        console.log({ status: 'creating user error', message: err.message });
      });
  });

  describe('POST: /api/v1/events', () => {
    it('should post when all fields is given', (done) => {
      const reqBody = {
        title: 'Andela party',
        description: 'Its gonna be epic',
        date: '2017/02/17',
        centerId,
        token: userToken,
      };
      chai.request(app)
        .post('/api/v1/events')
        .send(reqBody)
        .end((err, res) => {
          eventId = res.body.event.id;
          res.should.have.status(201);
          res.body.status.should.be.eql('success');
          res.body.message.should.be.eql('event created');
          res.body.event.title.should.be.eql(reqBody.title);
          res.body.event.description.should.be.eql(reqBody.description);
          res.body.event.date.should.be.eql(reqBody.date);
          done();
        });
    });
    it('should not post when title is not given', (done) => {
      const reqBody = {
        description: 'Its gonna be epic',
        date: '17/2/2017',
        centerId,
        token: userToken,
      };
      chai.request(app)
        .post('/api/v1/events')
        .send(reqBody)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.status.should.be.eql('failed');
          res.body.message.should.be.eql('event title is required');
          done();
        });
    });
    it('should not post when date format is wrong', (done) => {
      const reqBody = {
        title: 'Andela party',
        description: 'Its gonna be epic',
        date: '17-2/2017',
        centerId,
        token: userToken,
      };
      chai.request(app)
        .post('/api/v1/events')
        .send(reqBody)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.status.should.be.eql('failed');
          res.body.message.should.be.eql('the date format should be yyyy/mm/dd');
          done();
        });
    });
    it('should not post when center is given and date is not', (done) => {
      const reqBody = {
        title: 'Andela party',
        description: 'Its gonna be epic',
        centerId,
        token: userToken,
      };
      chai.request(app)
        .post('/api/v1/events')
        .send(reqBody)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.status.should.be.eql('failed');
          res.body.message.should.be.eql('event date is required');
          done();
        });
    });
  });

  describe('GET: /api/v1/events', ()  => {
    it('should get all event', (done) => {
      const reqBody = {
        token: userToken,
      };
      chai.request(app)
        .get('/api/v1/events')
        .send(reqBody)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.events.should.be.a('array');
          res.body.events.length.should.be.eql(1);
          done();
        });
    });
  });

  describe('PUT: /api/v1/events/:id', () => {
    it('should modify the event', (done) => {
      const reqBody = {
        title: 'Tunmise party',
        description: 'Its gonna be special epic',
        date: '2017/02/13',
        token: userToken,
      };
      chai.request(app)
        .put(`/api/v1/events/${eventId}`)
        .send(reqBody)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.status.should.be.eql('success');
          res.body.message.should.be.eql('event updated');
          res.body.event.title.should.be.eql(reqBody.title);
          res.body.event.description.should.be.eql(reqBody.description);
          res.body.event.date.should.be.eql(reqBody.date);
          done();
        });
    });
    it('should not modify when title is empty', (done) => {
      const reqBody = {
        title: '',
        description: 'Its gonna be epic',
        date: '2017/02/13',
        token: userToken,
      };
      chai.request(app)
        .put(`/api/v1/events/${eventId}`)
        .send(reqBody)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.status.should.be.eql('failed');
          res.body.message.should.be.eql('event title cannot be empty');
          done();
        });
    });
    it('should not modify when date is of wrong format', (done) => {
      const reqBody = {
        title: 'Andela party',
        description: 'Its gonna be epic',
        date: '17-2/2017',
        token: userToken,
      };
      chai.request(app)
        .put(`/api/v1/events/${eventId}`)
        .send(reqBody)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.status.should.be.eql('failed');
          res.body.message.should.be.eql('the date format should be yyyy/mm/dd');
          done();
        });
    });
  });

  describe('DELETE: /api/v1/events/:id', () => {
    it('should not delete event', (done) => {
      const reqBody = {
        token: userToken,
      };
      const wrongId = 1345;
      chai.request(app)
        .delete(`/api/v1/events/${wrongId}`)
        .send(reqBody)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.status.should.be.eql('failed');
          res.body.message.should.be.eql('event does not exist');
          done();
        });
    });
    it('should delete event', (done) => {
      const reqBody = {
        token: userToken,
      };
      chai.request(app)
        .delete(`/api/v1/events/${eventId}`)
        .send(reqBody)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.status.should.be.eql('success');
          res.body.message.should.be.eql('event deleted');
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

