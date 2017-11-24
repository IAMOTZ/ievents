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
  create: function create(req, res) {
    var inputData = {};
    var inputKeys = Object.keys(req.body);
    for (var i = 0; i < inputKeys.length; i += 1) {
      if (typeof inputKeys[i] === 'string') {
        inputData[inputKeys[i].toLowerCase().trim()] = req.body[inputKeys[i]].trim();
      }
    }
    var title = inputData.title,
        description = inputData.description,
        date = inputData.date,
        centername = inputData.centername;

    var validationOutput = _events2.default.create(inputData);
    if (validationOutput !== 'success') {
      res.status(400).json({
        status: 'failed',
        message: validationOutput
      });
    } else {
      var userId = req.decoded.id;
      centers.findOne({
        where: {
          name: centername.toLowerCase()
        }
      }).then(function (centerData) {
        if (!centerData) {
          res.status(400).json({
            status: 'failed',
            message: 'the choosen center does not exist'
          });
        } else if (centerData.bookedOn) {
          if (centerData.bookedOn.indexOf(date) >= 0) {
            res.status(400).json({
              status: 'failed',
              message: 'the center has been booked for that date'
            });
          }
        } else {
          var newBookedOn = void 0;
          if (centerData.bookedOn === null) {
            newBookedOn = [date];
          } else {
            newBookedOn = [date].concat(centerData.bookedOn);
          }
          centerData.update({
            bookedOn: newBookedOn
          }).then(function () {
            events.create({
              title: title,
              description: description,
              date: date,
              centerName: centername,
              centerId: centerData.id,
              userId: userId
            }).then(function (eventData) {
              res.status(201).json({
                status: 'success',
                message: 'event created',
                event: eventData
              });
            });
          });
        }
      }).catch(function (err) {
        res.status(400).json({ status: 'error', message: err.message });
      });
    }
  },
  update: function update(req, res) {
    var eventId = req.params.id;
    var inputData = {};
    var inputKeys = Object.keys(req.body);
    for (var i = 0; i < inputKeys.length; i += 1) {
      if (typeof inputKeys[i] === 'string') {
        inputData[inputKeys[i].toLowerCase().trim()] = req.body[inputKeys[i]].trim();
      }
    }
    var title = inputData.title,
        description = inputData.description,
        date = inputData.date,
        centername = inputData.centername;

    var validationOutput = _events2.default.update(inputData);
    if (validationOutput !== 'success') {
      res.status(400).json({
        status: 'failed',
        message: validationOutput
      });
    } else {
      events.findOne({
        where: {
          id: eventId
        }
      }).then(function (eventData) {
        if (!eventData) {
          // if the event does not exist
          res.status(400).json({ sucess: 'failed', message: 'event does not exist' });
        } else if (eventData.userId === req.decoded.id) {
          if (centername && eventData.centerName !== centername) {
            centers.findOne({
              where: {
                name: centername.toLowerCase()
              }
            }).then(function (newCenterData) {
              if (!newCenterData) {
                res.status(400).json({
                  status: 'failed',
                  message: 'the new choosen center does not exist'
                });
              } else {
                if (newCenterData.bookedOn !== null) {
                  if (newCenterData.bookedOn.indexOf(date) >= 0) {
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
                  // Remove the booking of this center in the previous center
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
                      // update the event it self
                      eventData.update({
                        title: title || eventData.title,
                        description: description || eventData.description,
                        date: date || eventData.date,
                        centerName: centername,
                        centerId: newCenterData.id
                      }).then(function (newEventData) {
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
          res.status(401).json({
            sucess: false,
            message: 'Unauthorised to perform this action'
          });
        }
      }).catch(function (err) {
        res.status(400).json({ status: 'error', message: err.message });
      });
    }
  },
  delete: function _delete(req, res) {
    var eventId = req.params.id;
    return events.findOne({
      where: {
        id: eventId
      }
    }).then(function (eventData) {
      if (!eventData) {
        res.status(400).json({
          status: 'failed',
          message: 'event does not exist'
        });
      } else if (eventData.userId === req.decoded.id) {
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
            eventData.destroy().then(function () {
              res.status(200).json({
                status: 'success',
                message: 'event deleted'
              });
            });
          });
        });
      } else {
        res.status(401).json({
          status: 'failed',
          message: 'Unauthorised to perform this action'
        });
      }
    }).catch(function (err) {
      res.status(400).json({ status: 'error', message: err.message });
    });
  }
};