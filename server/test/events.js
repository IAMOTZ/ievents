import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';

const should = chai.should();

chai.use(chaiHttp);


const ensureTwoDigit = (digit) => {
  const result = digit.toString().length < 2 ? Number(`0${digit}`) : digit;
  return result;
};

let eventId;
let userToken1;
let userToken2;
const currentDate = new Date();
const currentYear = currentDate.getFullYear();
const currentMonth = ensureTwoDigit(currentDate.getMonth() + 1);
const currentDay = ensureTwoDigit(currentDate.getDate());

let normalEventDetails = {
  title: 'test event',
  description: 'test description',
  date: `${currentYear}/${currentMonth}/${currentDay}`,
  centerId: 1,
  token: null,
};

const emptyEventDetails = {
  title: null,
  description: null,
  date: null,
  centerId: null,
};

const userDetails1 = {
  email: 'test@gmail.com',
  password: 'Password123',
};

const userDetails2 = {
  email: 'test2@gmail.com',
  password: 'Password123',
};

const alterEventDetails = newEventDetials => (
  Object.assign({}, normalEventDetails, newEventDetials)
);

const createEvent = (eventDetails, assertions) => {
  chai.request(app)
    .post('/api/v1/events')
    .send(eventDetails)
    .end(assertions);
};

const modifyEvent = (eventDetails, assertions, id = eventId) => {
  chai.request(app)
    .put(`/api/v1/events/${id}`)
    .send(eventDetails)
    .end(assertions);
};

const deleteEvent = (token, assertions, id = eventId) => {
  chai.request(app)
    .delete(`/api/v1/events/${id}`)
    .send(token)
    .end(assertions);
};

const getEvents = (token, assertions) => {
  chai.request(app)
    .get('/api/v1/events')
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

const randomCharacters = length => Array.from({ length }, (e, i) => i).splice(0, length).join('');

describe('Events Endpoint', () => {
  before('login the user', (done) => {
    loginUser(
      userDetails1,
      (err, res) => {
        userToken1 = res.body.token;
        normalEventDetails.token = userToken1;
        loginUser(
          userDetails2,
          (error, response) => {
            userToken2 = response.body.token;
            done();
          },
        );
      },
    );
  });
  describe('Creating Event', () => {
    it('should not create event without title', (done) => {
      createEvent(
        alterEventDetails({ title: null }),
        failureAssertions('Event title is required', 400, done),
      );
    });
    it('should not create event with empty title', (done) => {
      createEvent(
        alterEventDetails({ title: '' }),
        failureAssertions('Event title is required', 400, done),
      );
    });
    it('should not create event with title less than 3 char', (done) => {
      createEvent(
        alterEventDetails({ title: 'te' }),
        failureAssertions('Event title must be between 3 and 30 characters', 400, done),
      );
    });
    it('should not create event with title above than 30 char', (done) => {
      createEvent(
        alterEventDetails({ title: randomCharacters(31) }),
        failureAssertions('Event title must be between 3 and 30 characters', 400, done),
      );
    });
    it('should not create event with description above 200 chars', (done) => {
      createEvent(
        alterEventDetails({ description: randomCharacters(201) }),
        failureAssertions('Event description must be below 200 characters', 400, done),
      );
    });
    it('should not create event without date', (done) => {
      createEvent(
        alterEventDetails({ date: null }),
        failureAssertions('Event date is required', 400, done),
      );
    });
    it('should not create event with wrog date format', (done) => {
      createEvent(
        alterEventDetails({ date: '2017-2-56' }),
        failureAssertions('The date format should be yyyy/mm/dd', 400, done),
      );
    });
    it('should not create event if days in the date is more that 31', (done) => {
      const wrongDate = `${currentYear}/${currentMonth}/40`;
      createEvent(
        alterEventDetails({ date: wrongDate }),
        failureAssertions('Days in the date cannot be more than 31', 400, done),
      );
    });
    it('should not create event if month in date is more than 12', (done) => {
      const wrongDate = `${currentYear}/15/${currentDay}`;
      createEvent(
        alterEventDetails({ date: wrongDate }),
        failureAssertions('Month in the date cannot be more than 12', 400, done),
      );
    });
    it('should not create event for past years', (done) => {
      const wrongDate = `${currentYear - 10}/${currentMonth}/${currentDay}`;
      createEvent(
        alterEventDetails({ date: wrongDate }),
        failureAssertions('You can only create event for this year and upcoming years', 400, done),
      );
    });
    it('should not create event for past months', (done) => {
      const wrongDate = `${currentYear}/${currentMonth - 1}/${currentDay}`;
      createEvent(
        alterEventDetails({ date: wrongDate }),
        failureAssertions('You can only create event for this month and upcoming months', 400, done),
      );
    });
    it('should not create event for past days', (done) => {
      const wrongDate = `${currentYear}/${currentMonth}/${currentDay - 1}`;
      createEvent(
        alterEventDetails({ date: wrongDate }),
        failureAssertions('You can only create event for today and upcoming days', 400, done),
      );
    });
    it('should not create event without a center', (done) => {
      createEvent(
        alterEventDetails({ centerId: null }),
        failureAssertions('Center is required', 400, done),
      );
    });
    it('should not create event if center value is not an integer', (done) => {
      createEvent(
        alterEventDetails({ centerId: 'str' }),
        failureAssertions('Center id must be an integer in a string format', 400, done),
      );
    });
    it('should not create an event if the choosen center does not exist', (done) => {
      createEvent(
        alterEventDetails({ centerId: 1000 }),
        failureAssertions('The choosen center does not exist', 404, done),
      );
    });
    it('should create an event', (done) => {
      createEvent(
        normalEventDetails,
        (err, res) => {
          eventId = res.body.event.id;
          res.should.have.status(201);
          res.body.status.should.be.eql('success');
          res.body.message.should.be.eql('Event created');
          res.body.event.title.should.be.eql(normalEventDetails.title);
          res.body.event.description.should.be.eql(normalEventDetails.description);
          res.body.event.date.should.be.eql(normalEventDetails.date);
          res.body.event.status.should.be.eql('allowed');
          res.body.event.centerId.should.be.eql(1);
          done();
        },
      );
    });
    it('should create another event', (done) => {
      const date = `${currentYear + 1}/${currentMonth}/${currentDay}`;
      createEvent(
        alterEventDetails({ centerId: 2, date }),
        (err, res) => {
          res.should.have.status(201);
          res.body.status.should.be.eql('success');
          res.body.message.should.be.eql('Event created');
          done();
        },
      );
    });

    it('should not create event for date that is already booked for a center', (done) => {
      createEvent(
        normalEventDetails,
        failureAssertions('The center has been booked for that date', 400, done),
      );
    });
  });
  describe('Modifying Event', () => {
    before(() => {
      normalEventDetails = Object.assign({}, normalEventDetails, emptyEventDetails);
    });
    it('should not modify event with empty title', (done) => {
      modifyEvent(
        alterEventDetails({ title: '' }),
        failureAssertions('Event title is required', 400, done),
      );
    });
    it('should not modify event with title less than 3 char', (done) => {
      modifyEvent(
        alterEventDetails({ title: 'te' }),
        failureAssertions('Event title must be between 3 and 30 characters', 400, done),
      );
    });
    it('should not modify event with title above than 30 char', (done) => {
      modifyEvent(
        alterEventDetails({ title: randomCharacters(31) }),
        failureAssertions('Event title must be between 3 and 30 characters', 400, done),
      );
    });
    it('should not modify event with description above 200 chars', (done) => {
      modifyEvent(
        alterEventDetails({ description: randomCharacters(202) }),
        failureAssertions('Event description must be below 200 characters', 400, done),
      );
    });
    it('should not modify event with wrong date format', (done) => {
      modifyEvent(
        alterEventDetails({ date: '2017-2-56' }),
        failureAssertions('The date format should be yyyy/mm/dd', 400, done),
      );
    });
    it('should not modify event if days in the date is more than 31', (done) => {
      const wrongDate = `${currentYear}/${currentMonth}/40`;
      modifyEvent(
        alterEventDetails({ date: wrongDate }),
        failureAssertions('Days in the date cannot be more than 31', 400, done),
      );
    });
    it('should not modify event if month in date is more than 12', (done) => {
      const wrongDate = `${currentYear}/15/${currentDay}`;
      modifyEvent(
        alterEventDetails({ date: wrongDate }),
        failureAssertions('Month in the date cannot be more than 12', 400, done),
      );
    });
    it('should not modify event for past years', (done) => {
      const wrongDate = `${currentYear - 10}/${currentMonth}/${currentDay}`;
      modifyEvent(
        alterEventDetails({ date: wrongDate }),
        failureAssertions('You can only create event for this year and upcoming years', 400, done),
      );
    });
    it('should not modify event for past months', (done) => {
      const wrongDate = `${currentYear}/${currentMonth - 1}/${currentDay}`;
      modifyEvent(
        alterEventDetails({ date: wrongDate }),
        failureAssertions('You can only create event for this month and upcoming months', 400, done),
      );
    });
    it('should not modify event for past days', (done) => {
      const wrongDate = `${currentYear}/${currentMonth}/${currentDay - 1}`;
      modifyEvent(
        alterEventDetails({ date: wrongDate }),
        failureAssertions('You can only create event for today and upcoming days', 400, done),
      );
    });
    it('should not modify event if center value is not an integer', (done) => {
      modifyEvent(
        alterEventDetails({ centerId: 'str' }),
        failureAssertions('Center id must be an integer in a string format', 400, done),
      );
    });
    it('should not modify event if user is not the event owner', (done) => {
      modifyEvent(
        alterEventDetails({ token: userToken2 }),
        failureAssertions('Unauthorised to perform this action', 401, done),
      );
    });
    it('should not modify event if the new choosen center does not exist', (done) => {
      modifyEvent(
        alterEventDetails({ centerId: 1000 }),
        failureAssertions('The new choosen center does not exist', 404, done),
      );
    });
    it('should not modify event if the new choosen center is booked for the date', (done) => {
      const date = `${currentYear + 1}/${currentMonth}/${currentDay}`;
      modifyEvent(
        alterEventDetails({ centerId: 2, date }),
        failureAssertions('The center has been booked for that date', 400, done),
      );
    });
    it('should modify event', (done) => {
      modifyEvent(
        alterEventDetails({
          title: 'modified title',
          description: 'modified description',
          centerId: 2,
        }),
        (err, res) => {
          res.should.have.status(200);
          res.body.status.should.be.eql('success');
          res.body.message.should.be.eql('Event updated');
          res.body.event.title.should.be.eql('modified title');
          res.body.event.description.should.be.eql('modified description');
          res.body.event.centerId.should.be.eql(2);
          done();
        },
      );
    });
  });

  describe('Getting All Events', () => {
    it('should get all the events', (done) => {
      getEvents(
        { token: userToken1 },
        (err, res) => {
          res.should.have.status(200);
          res.body.events.should.be.a('array');
          res.body.events.length.should.be.eql(2);
          done();
        },
      );
    });
  });
  describe('Deleting Event', () => {
    it('should not delete event if the user is not the event owner', (done) => {
      deleteEvent(
        { token: userToken2 },
        failureAssertions('Unauthorised to perform this action', 401, done),
      );
    });
    it('should not delete an event that does not exist', (done) => {
      deleteEvent(
        { token: userToken1 },
        failureAssertions('Event does not exist', 404, done),
        1000,
      );
    });
    it('should delete event', (done) => {
      deleteEvent(
        { token: userToken1 },
        (err, res) => {
          res.body.status.should.be.eql('success');
          res.body.message.should.be.eql('Event deleted');
          done();
        },
      );
    });
  });
});
