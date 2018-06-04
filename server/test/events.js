/* eslint-disable import/no-extraneous-dependencies */
import chai from 'chai';
import chaiHttp from 'chai-http';
import db from '../models';
import app from '../app';

// eslint-disable-next-line no-unused-vars
const should = chai.should();

chai.use(chaiHttp);

const { users, centers, events } = db;

/**
 * Clear all the data stored in a particular table of the database.
 * @param {Object} model The query interface.
 * @returns {Object} The query interface.
 */
const clearDatabase = async (model) => {
  await model.destroy({
    cascade: true,
    truncate: true,
    restartIdentity: true,
  });
  return model;
};

/**
 * Ensures that a number have two digits.
 * If the number has one digit e.g 7, it is going to append 0 to it which would give 07.
 * @param {Number} digit The Number to check.
 * @returns {Number} The Number which has been ensured to have two digits.
 */
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

/**
 * Alters some or all of the properties in the event details(normalEventDetails).
 * @param {Object} newEventDetials This object would be used to update the normal event details.
 * @returns {Object} The updated event details.
 */
const alterEventDetails = newEventDetials => (
  Object.assign({}, normalEventDetails, newEventDetials)
);

/**
 * An helper function to create an event.
 * @param {Object} eventDetails Details of the event to create.
 * @param {Function} assertions The assertions to execute after the request is complete.
 */
const createEvent = (eventDetails, assertions) => {
  chai.request(app)
    .post('/api/v1/events')
    .send(eventDetails)
    .end(assertions);
};

/**
 * An helper function to modify an event.
 * @param {Object} eventDetails This object would be used to update the event.
 * @param {Function} assertions The assertions to execute after the request is complete.
 * @param {Number} id The ID of the event to modify.
 */
const modifyEvent = (eventDetails, assertions, id = eventId) => {
  chai.request(app)
    .put(`/api/v1/events/${id}`)
    .send(eventDetails)
    .end(assertions);
};

/**
 * An helper function to delete en event.
 * @param {String} token The authentication token
 * @param {Function} assertions The assertions to execute after the request is complete.
 * @param {Number} id The ID of the event to delete.
 */
const deleteEvent = (token, assertions, id = eventId) => {
  chai.request(app)
    .delete(`/api/v1/events/${id}`)
    .send(token)
    .end(assertions);
};

/**
 * An helper function to cancel an event.
 * @param {String} token The authentication token. Admin token required.
 * @param {Function} assertions The assertions to execute after the request is complete.
 * @param {Number} id The ID of the event to cancel
 */
const cancelEvent = (token, assertions, id = eventId) => {
  chai.request(app)
    .post(`/api/v1/events/${id}/cancel`)
    .send(token)
    .end(assertions);
};

/**
 * An helper function to fetch the events of a user.
 * @param {String} token The authentication token.
 * @param {Function} assertions The assertions to execute after the request is complete.
 * @param {Object} paginate An optional description of how to paginate the request.
 */
const getEvents = (token, assertions, paginate = {}) => {
  chai.request(app)
    .get(`/api/v1/events?limit=${paginate.limit}&&offset=${paginate.offset}`)
    .send(token)
    .end(assertions);
};

/**
 * An helper function to fetch the events to happen in a particular center.
 * @param {String} token The authentication token. Addmin token is required.
 * @param {Function} assertions The assertions to execute after the request is complete.
 * @param {Number} id The ID of the center.
 * @param {Object} paginate An optional description of how to paginate the request.
 */
const getCenterEvents = (token, assertions, id, paginate = {}) => {
  chai.request(app)
    .get(`/api/v1/centers/${id}/events?limit=${paginate.limit}&&offset=${paginate.offset}`)
    .send(token)
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
 * @returns {Function} The assertion.
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

describe('Events Endpoint', () => {
  before('login the user', (done) => {
    loginUser(
      userDetails1,
      (err, res) => {
        userToken1 = res.body.token;
        normalEventDetails.token = userToken1; // Admin token
        loginUser(
          userDetails2,
          (error, response) => {
            userToken2 = response.body.token; // Normal user token
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
    it('should not create an event if the  center does not exist', (done) => {
      createEvent(
        alterEventDetails({ centerId: 1000 }),
        failureAssertions('The chosen center does not exist', 404, done),
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
    it('should not modify event if the new chosen center does not exist', (done) => {
      modifyEvent(
        alterEventDetails({ centerId: 1000 }),
        failureAssertions('The new chosen center does not exist', 404, done),
      );
    });
    it('should not modify event if the new chosen center is booked for the date', (done) => {
      const date = `${currentYear + 1}/${currentMonth}/${currentDay}`;
      modifyEvent(
        alterEventDetails({ centerId: 2, date }),
        failureAssertions('The center has been booked for that date', 400, done),
      );
    });
    it('should not modify event if the event ID is not given as an integer', (done) => {
      modifyEvent(
        alterEventDetails({ title: 'modified title' }),
        failureAssertions('Resource ID must be an integer', 400, done),
        'nonIntegerID',
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

  describe('Getting Events of a Single Center', () => {
    it('should not get events if the center ID is not given as integer', (done) => {
      getCenterEvents(
        { token: userToken1 },
        failureAssertions('Resource ID must be an integer', 400, done),
        'akldfjal;d' // ID of wrong type
      );
    });
    it('should not get events when the request is sent by a non-admin user', (done) => {
      getCenterEvents(
        { token: userToken2 }, // Auth-Token of a user that is not an admin
        failureAssertions('You are unauthorized to perform this action', 401, done),
        2
      );
    });
    it('should get the events of a single center', (done) => {
      getCenterEvents(
        { token: userToken1 },
        (err, res) => {
          res.should.have.status(200);
          res.body.status.should.be.eql('success');
          res.body.events.should.be.a('array');
          res.body.events.length.should.be.eql(2);
          res.body.events[0].user.email.should.be.a('string');
          done();
        },
        2 // ID of a center that exist
      );
    });
    it('should get the events of a single center by pagination', (done) => {
      const paginationInfo = 'This response is paginated. This object contains information about the pagination';
      getCenterEvents(
        { token: userToken1 },
        (err, res) => {
          res.should.have.status(200);
          res.body.status.should.be.eql('success');
          res.body.events.should.be.a('array');
          res.body.events.length.should.be.eql(1);
          res.body.events[0].user.email.should.be.a('string');
          res.body.paginationInfo.message.should.be.eql(paginationInfo);
          res.body.paginationInfo.limit.should.be.eql(1);
          res.body.paginationInfo.offset.should.be.eql(0);
          res.body.paginationInfo.currentCount.should.be.eql(1);
          res.body.paginationInfo.totalCount.should.be.eql(2);
          done();
        },
        2, // ID of a center that exist
        { limit: 1 }
      );
    });
  });

  describe('Getting events by pagination', () => {
    let firstEventId = null;
    const paginationInfo = 'This response is paginated. This object contains information about the pagination';
    it('should get just one event', (done) => {
      getEvents(
        { token: userToken1 },
        (err, res) => {
          res.should.have.status(200);
          res.body.events.should.be.a('array');
          res.body.events.length.should.be.eql(1);
          res.body.paginationInfo.message.should.be.eql(paginationInfo);
          res.body.paginationInfo.limit.should.be.eql(1);
          res.body.paginationInfo.offset.should.be.eql(0);
          res.body.paginationInfo.currentCount.should.be.eql(1);
          res.body.paginationInfo.totalCount.should.be.eql(2);
          firstEventId = res.body.events[0].id;
          done();
        }, { limit: '1' }
      );
    });
    it('should get the second event', (done) => {
      getEvents(
        { token: userToken1 },
        (err, res) => {
          res.should.have.status(200);
          res.body.events.should.be.a('array');
          res.body.events.length.should.be.eql(1);
          res.body.events[0].id.should.not.be.eql(firstEventId);
          res.body.paginationInfo.message.should.be.eql(paginationInfo);
          res.body.paginationInfo.limit.should.be.eql(20); // The default limit
          res.body.paginationInfo.offset.should.be.eql(1);
          res.body.paginationInfo.currentCount.should.be.eql(1);
          res.body.paginationInfo.totalCount.should.be.eql(2);
          done();
        }, { offset: 1 }
      );
    });
  });

  describe('Canceling Event', () => {
    // NOTE: When the ID of an event is not specified, there is a default ID used by cancelEvent()
    it('should not cancel an event that does not exist', (done) => {
      cancelEvent(
        { token: userToken1 },
        failureAssertions('Event does not exist', 404, done),
        44 // ID of an event that does not exist
      );
    });
    it('should not cancel event if the event ID is not given as integer', (done) => {
      cancelEvent(
        { token: userToken1 },
        failureAssertions('Resource ID must be an integer', 400, done),
        'string', // ID as a string instead of integer
      );
    });
    it('should not cancel event if the request is sent by a non-admin', (done) => {
      cancelEvent(
        { token: userToken2 }, // Auth-Token of a user that is not an admin
        failureAssertions('You are unauthorized to perform this action', 401, done),
      );
    });
    it('should cancel event', (done) => {
      cancelEvent(
        { token: userToken1 },
        (err, res) => {
          res.should.have.status(200);
          res.body.status.should.be.eql('success');
          res.body.message.should.be.eql('Event canceled');
          res.body.event.status.should.be.eql('canceled');
          done();
        },
      );
    });
    it('should not cancel an event that is already canceled', (done) => {
      cancelEvent(
        { token: userToken1 },
        failureAssertions('Event already canceled', 400, done)
      );
    });
  });

  describe('Deleting Event', () => {
    // NOTE: When the ID of an event is not specified, there is a default ID used by deleteEvent()
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
    it('should not delete event if the event ID is not given as an integer', (done) => {
      deleteEvent(
        { token: userToken1 },
        failureAssertions('Resource ID must be an integer', 400, done),
        'nonIntegerID',
      );
    });
    it('should delete event', (done) => {
      deleteEvent(
        { token: userToken1 },
        (err, res) => {
          res.should.have.status(200);
          res.body.status.should.be.eql('success');
          res.body.message.should.be.eql('Event deleted');
          done();
        },
      );
    });
  });

  after('Remove all the data created in the database', async () => {
    await clearDatabase(events);
    await clearDatabase(centers);
    await clearDatabase(users);
  });
});
