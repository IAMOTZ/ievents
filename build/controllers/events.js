'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = require('../models/index');

var _index2 = _interopRequireDefault(_index);

var _events = require('../validation/events');

var _events2 = _interopRequireDefault(_events);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var events = _index2.default.events,
    centers = _index2.default.centers;
exports.default = {
  // Controller for creating an event
  create: function create(req, res) {
    var inputData = {};
    var inputKeys = Object.keys(req.body);
    for (var i = 0; i < inputKeys.length; i += 1) {
      // Convert all the keys of request body to lowercase and trim spaces
      if (typeof inputKeys[i] === 'string') {
        inputData[inputKeys[i].toLowerCase().trim()] = req.body[inputKeys[i]].trim();
      }
    }
    var title = inputData.title,
        description = inputData.description,
        date = inputData.date,
        centername = inputData.centername;

    var validationOutput = _events2.default.create(inputData); // Validate the user inputs
    if (validationOutput !== 'success') {
      // If validation was not successful, send a failed response
      res.status(400).json({
        status: 'failed',
        message: validationOutput
      });
    } else {
      // If validation was successfull, check if the choosen center exists
      var userId = req.decoded.id;
      centers.findOne({
        where: {
          name: centername.toLowerCase()
        }
      }).then(function (centerData) {
        if (!centerData) {
          // If the choosen center does not exist, send a failure response
          res.status(400).json({
            status: 'failed',
            message: 'the choosen center does not exist'
          });
        } else if (centerData.bookedOn) {
          // Check if the center has been booked for the choosed date
          if (centerData.bookedOn.indexOf(date) >= 0) {
            // If it has been booked, send a failure respose
            res.status(400).json({
              status: 'failed',
              message: 'the center has been booked for that date'
            });
          }
        } else {
          // If it has not been booked, book it.
          var newBookedOn = void 0;
          if (centerData.bookedOn === null) {
            newBookedOn = [date];
          } else {
            newBookedOn = [date].concat(centerData.bookedOn);
          }
          centerData.update({
            bookedOn: newBookedOn
          }).then(function () {
            // After booking the center, create the event
            events.create({
              title: title,
              description: description,
              date: date,
              centerName: centername,
              centerId: centerData.id,
              userId: userId
            }).then(function (eventData) {
              // After creating the event, send a success response with the event datas
              res.status(201).json({
                status: 'success',
                message: 'event created',
                event: eventData
              });
            });
          });
        }
      }).catch(function (err) {
        // Send an error respose if there was error in the whole process
        res.status(400).json({ status: 'error', message: err.message });
      });
    }
  },


  // Controller for updating a center
  update: function update(req, res) {
    var eventId = req.params.id;
    var inputData = {};
    var inputKeys = Object.keys(req.body);
    for (var i = 0; i < inputKeys.length; i += 1) {
      // Convert all the keys of request body to lowercase and trim spaces
      if (typeof inputKeys[i] === 'string') {
        inputData[inputKeys[i].toLowerCase().trim()] = req.body[inputKeys[i]].trim();
      }
    }
    var title = inputData.title,
        description = inputData.description,
        date = inputData.date,
        centername = inputData.centername;

    var validationOutput = _events2.default.update(inputData); // Validate the user inputs
    if (validationOutput !== 'success') {
      // If validation was not successful, send a failed response
      res.status(400).json({
        status: 'failed',
        message: validationOutput
      });
    } else {
      // If validation was successfull, check if the event exists
      events.findOne({
        where: {
          id: eventId
        }
      }).then(function (eventData) {
        if (!eventData) {
          // If the event does not exist, send a filure response
          res.status(400).json({ sucess: 'failed', message: 'event does not exist' });
        } else if (eventData.userId === req.decoded.id) {
          // If the center exist, check if this user owns the event
          if (centername && eventData.centerName !== centername) {
            // If the user want to chang the center he choosed
            // Check if the new center he choose exist
            centers.findOne({
              where: {
                name: centername.toLowerCase()
              }
            }).then(function (newCenterData) {
              if (!newCenterData) {
                // Send a failed response if the new center does not exist
                res.status(400).json({
                  status: 'failed',
                  message: 'the new choosen center does not exist'
                });
              } else {
                // If the center exist, check if it has not been booked for the choosen date
                if (newCenterData.bookedOn !== null) {
                  if (newCenterData.bookedOn.indexOf(date) >= 0) {
                    // If it has been booked, send a fialed response
                    res.status(400).json({
                      status: 'failed',
                      message: 'the new choose center has been booked for that date'
                    });
                    return;
                  }
                }
                // Add the new date to the booking register of the new center.
                var newBookedOn = void 0;
                if (newCenterData.bookedOn === null) {
                  newBookedOn = [date || eventData.date];
                } else {
                  newBookedOn = [date || eventData.date].concat(newCenterData.bookedOn);
                }
                newCenterData.update({
                  bookedOn: newBookedOn
                }).then(function () {
                  // Remove the booking of the previous center
                  centers.findOne({
                    where: {
                      id: eventData.centerId
                    }
                  }).then(function (centerData) {
                    var centerRegister = centerData.bookedOn;
                    centerRegister.splice(centerRegister.indexOf(eventData.date), 1);
                    centerData.update({
                      bookedOn: centerRegister
                    }).then(function () {
                      // Update the event it self
                      eventData.update({
                        title: title || eventData.title,
                        description: description || eventData.description,
                        date: date || eventData.date,
                        centerName: centername,
                        centerId: newCenterData.id
                      }).then(function (newEventData) {
                        // Send success response to the user with response data
                        res.status(201).json({
                          status: 'success',
                          message: 'event updated',
                          event: newEventData
                        });
                      });
                    });
                  });
                });
              }
            });
          } else {
            // If the user did not try to update the center, just update the event
            eventData.update({
              title: title || eventData.title,
              description: description || eventData.description,
              date: date || eventData.date
            }).then(function (newEventData) {
              res.status(200).json({
                status: 'success',
                message: 'event updated',
                event: newEventData
              });
            });
          }
        } else {
          // Send a faile repsonse if the user is not the owner of this event
          res.status(401).json({
            sucess: false,
            message: 'Unauthorised to perform this action'
          });
        }
      }).catch(function (err) {
        // Send an error respose if there was error in the whole process
        res.status(400).json({ status: 'error', message: err.message });
      });
    }
  },
  delete: function _delete(req, res) {
    var eventId = req.params.id;
    // Check if the event exist
    return events.findOne({
      where: {
        id: eventId
      }
    }).then(function (eventData) {
      if (!eventData) {
        // If the event does not exist, send a failure response
        res.status(400).json({
          status: 'failed',
          message: 'event does not exist'
        });
      } else if (eventData.userId === req.decoded.id) {
        // If event exist, Remove its booking from the center it choosed
        centers.findOne({
          where: {
            id: eventData.centerId
          }
        }).then(function (centerData) {
          var centerRegister = centerData.bookedOn;
          centerRegister.splice(centerRegister.indexOf(eventData.date), 1);
          centerData.update({
            bookedOn: centerRegister
          }).then(function () {
            // After removing the booking, delete the event
            eventData.destroy().then(function () {
              res.status(200).json({
                status: 'success',
                message: 'event deleted'
              });
            });
          });
        });
      } else {
        // If the user is not the owner of this event
        res.status(401).json({
          status: 'failed',
          message: 'Unauthorised to perform this action'
        });
      }
    }).catch(function (err) {
      // Send an error respose if there was error in the whole process
      res.status(400).json({ status: 'error', message: err.message });
    });
  }
};