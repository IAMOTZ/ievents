import db from '../models/index';
import validation from '../validation/events';

const { events, centers, transactions } = db;

export default {
  // Controller for getting all of a user events
  getAll(req, res) {
    const userId = req.decoded.id;
    events
      .all({
        where: {
          userId,
        },
      })
      .then((eventData) => {
        res.status(200).json({
          events: eventData,
        });
      })
      .catch((err) => {
        res.status(400).json({ status: 'error', message: err.message });
      });
  },

  // Controller for creating an event
  create(req, res) {
    const inputData = {};
    const inputKeys = Object.keys(req.body);
    for (let i = 0; i < inputKeys.length; i += 1) {
      // Convert all the keys of request body to lowercase and trim spaces
      if (typeof (inputKeys[i]) === 'string') {
        inputData[inputKeys[i].toLowerCase().trim()] = typeof (req.body[inputKeys[i]]) === 'string' ? req.body[inputKeys[i]].trim() : req.body[inputKeys[i]];
      }
    }
    const {
      title,
      description,
      date,
      centerid,
    } = inputData;
    const validationOutput = validation.create(inputData); // Validate the user inputs
    if (validationOutput !== 'success') {
      // If validation was not successful, send a failed response
      res.status(400).json({
        status: 'failed',
        message: validationOutput,
      });
    } else {
      // If validation was successfull, check if the choosen center exists
      const userId = req.decoded.id;
      centers
        .findById(Number(centerid))
        .then((centerData) => {
          if (!centerData) {
            // If the choosen center does not exist, send a failure response
            res.status(400).json({
              status: 'failed',
              message: 'the choosen center does not exist',
            });
          } else {
            // If the choosen center exist, check if it has not been booked
            transactions
              .findOne({
                where: {
                  centerId: centerid,
                  date: date,
                }
              })
              .then((transactionData) => {
                // Send a failure response if the center has been booked
                if (transactionData) {
                  res.status(400).json({
                    status: 'failed',
                    message: 'the center has been booked for that date',
                  });
                } else {
                  // Create the event if the center has not being booked
                  events
                    .create({
                      title,
                      description,
                      date,
                      centerId: centerData.id,
                      userId,
                    })
                    .then((eventData) => {
                      // After creating the event, send a success response with the event data
                      res.status(201).json({
                        status: 'success',
                        message: 'event created',
                        event: {
                          id: eventData.id,
                          title: eventData.title,
                          description: eventData.description,
                          date: eventData.date,
                          centerName: eventData.name,
                          centerId: eventData.centerId,
                          userId: eventData.userId,
                        },
                      });
                      // Also create a transaction after creating the event
                      transactions
                        .create({
                          centerId: centerData.id,
                          eventId: eventData.id,
                          userId: eventData.userId,
                          date,
                          decision: null,
                        })
                    });
                }
              });
          }
        })
        .catch((err) => {
          // Send an error respose if there was error in the whole process
          res.status(400).json({ status: 'error', message: err.message });
        });
    }
  },

  // Controller for updating a center
  update(req, res) {
    const eventId = req.params.id;
    const inputData = {};
    const inputKeys = Object.keys(req.body);
    for (let i = 0; i < inputKeys.length; i += 1) {
      // Convert all the keys of request body to lowercase and trim spaces
      if (typeof (inputKeys[i]) === 'string') {
        inputData[inputKeys[i].toLowerCase().trim()] = (req.body[inputKeys[i]] === 'string') ? req.body[inputKeys[i]].trim() : req.body[inputKeys[i]];
      }
    }
    const {
      title,
      description,
      date,
      centerid,
    } = inputData;
    const validationOutput = validation.update(inputData); // Validate the user inputs
    if (validationOutput !== 'success') {
      // If validation was not successful, send a failed response
      res.status(400).json({
        status: 'failed',
        message: validationOutput,
      });
    } else {
      // If validation was successfull, check if the event exists
      events
        .findById(eventId)
        .then((eventData) => {
          if (!eventData) {
            // If the event does not exist, send a filure response
            res.status(400).json({ sucess: 'failed', message: 'event does not exist' });
          } else if (eventData.userId === req.decoded.id) {
            // If the event exist, check if this user owns the event
            if (centerid && eventData.centerId !== Number(centerid)) {
              // If the user want to change the center he choosed
              // Check if the new center he choose exist
              centers
                .findById(centerid)
                .then((newCenterData) => {
                  if (!newCenterData) {
                    // Send a failed response if the new center does not exist
                    res.status(400).json({
                      status: 'failed',
                      message: 'the new choosen center does not exist',
                    });
                  } else {
                    // If the choosen center exist, check if it has not been booked
                    transactions
                      .findOne({
                        where: {
                          centerId: centerid,
                          date: date,
                        }
                      })
                      .then((transactionData) => {
                        // Send a failure response if the center has been booked
                        if (transactionData) {
                          res.status(400).json({
                            status: 'failed',
                            message: 'the center has been booked for that date',
                          });
                        }
                        else {
                          // Update the event it self
                          eventData
                            .update({
                              title: title || eventData.title,
                              description: description || eventData.description,
                              date: date || eventData.date,
                              centerId: newCenterData.id,
                            })
                            .then((newEventData) => {
                              // Send success response to the user with response data
                              res.status(201).json({
                                status: 'success',
                                message: 'event updated',
                                event: {
                                  id: newEventData.id,
                                  title: newEventData.title,
                                  description: newEventData.description,
                                  date: newEventData.date,
                                  centerName: newCenterData.name,
                                  centerId: newEventData.centerId,
                                  userId: newEventData.userId,
                                },
                              });
                              // Delete the former transaction and create a new one
                              transactions
                                .findOne({
                                  where: {
                                    eventId: eventData.id,
                                  }
                                })
                                .then((transactionData) => {
                                  transactionData
                                    .destroy()
                                });
                              transactions
                                .create({
                                  centerId: newCenterData.id,
                                  eventId: eventData.id,
                                  userId: eventData.userId,
                                  date: date || eventData.date,
                                  decision: null,
                                });
                            });
                        }
                      });
                  }
                });
            } else {
              // If the user did not try to update the center, just update the event
              eventData
                .update({
                  title: title || eventData.title,
                  description: description || eventData.description,
                  date: date || eventData.date,
                })
                .then((newEventData) => {
                  centers
                    .findById(newEventData.centerId)
                    .then((centerData) => {
                      res.status(200).json({
                        status: 'success',
                        message: 'event updated',
                        event: {
                          id: newEventData.id,
                          title: newEventData.title,
                          description: newEventData.description,
                          date: newEventData.date,
                          centerName: centerData.name,
                          centerId: newEventData.centerId,
                          userId: newEventData.userId,
                        },
                      });
                    });
                });
            }
          } else {
            // Send a faile repsonse if the user is not the owner of this event
            res.status(401).json({
              sucess: false,
              message: 'Unauthorised to perform this action',
            });
          }
        })
        .catch((err) => {
          // Send an error respose if there was error in the whole process
          res.status(400).json({ status: 'error', message: err.message });
        });
    }
  },

  delete(req, res) {
    const eventId = req.params.id;
    // Check if the event exist
    return events
      .findById(eventId)
      .then((eventData) => {
        if (!eventData) {
          // If the event does not exist, send a failure response
          res.status(400).json({
            status: 'failed',
            message: 'event does not exist',
          });
        } else if (eventData.userId === req.decoded.id) {
          // If this user is the owner of this event
          eventData.destroy()
            .then(() => {
              res.status(200).json({
                status: 'success',
                message: 'event deleted',
              });
            });
        } else {
          // If the user is not the owner of this event
          res.status(401).json({
            status: 'failed',
            message: 'Unauthorised to perform this action',
          });
        }
      })
      .catch((err) => {
        // Send an error respose if there was error in the whole process
        res.status(400).json({ status: 'error', message: err.message });
      });
  },
};
