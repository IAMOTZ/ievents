import db from '../models/index';
import validation from '../validation/events';

const { events, centers } = db;

export default {
  create(req, res) {
    const inputData = {};
    const inputKeys = Object.keys(req.body);
    for (let i = 0; i < inputKeys.length; i += 1) {
      if (typeof (inputKeys[i]) === 'string') {
        inputData[inputKeys[i].toLowerCase().trim()] = req.body[inputKeys[i]].trim();
      }
    }
    const {
      title,
      description,
      date,
      centername,
    } = inputData;
    const validationOutput = validation.create(inputData);
    if (validationOutput !== 'success') {
      res.status(400).json({
        status: 'failed',
        message: validationOutput,
      });
    } else {
      const userId = req.decoded.id;
      centers
        .findOne({
          where: {
            name: centername.toLowerCase(),
          },
        })
        .then((centerData) => {
          if (!centerData) {
            res.status(400).json({
              status: 'failed',
              message: 'the choosen center does not exist',
            });
          } else if (centerData.bookedOn) {
            if (centerData.bookedOn.indexOf(date) >= 0) {
              res.status(400).json({
                status: 'failed',
                message: 'the center has been booked for that date',
              });
            }
          } else {
            let newBookedOn;
            if (centerData.bookedOn === null) {
              newBookedOn = [date];
            } else {
              newBookedOn = [date].concat(centerData.bookedOn);
            }
            centerData
              .update({
                bookedOn: newBookedOn,
              })
              .then(() => {
                events
                  .create({
                    title,
                    description,
                    date,
                    centerName: centername,
                    centerId: centerData.id,
                    userId,
                  })
                  .then((eventData) => {
                    res.status(201).json({
                      status: 'success',
                      message: 'event created',
                      event: eventData,
                    });
                  });
              });
          }
        })
        .catch((err) => {
          res.status(400).json({ status: 'error', message: err.message });
        });
    }
  },

  update(req, res) {
    const eventId = req.params.id;
    const inputData = {};
    const inputKeys = Object.keys(req.body);
    for (let i = 0; i < inputKeys.length; i += 1) {
      if (typeof (inputKeys[i]) === 'string') {
        inputData[inputKeys[i].toLowerCase().trim()] = req.body[inputKeys[i]].trim();
      }
    }
    const {
      title,
      description,
      date,
      centername,
    } = inputData;
    const validationOutput = validation.update(inputData);
    if (validationOutput !== 'success') {
      res.status(400).json({
        status: 'failed',
        message: validationOutput,
      });
    } else {
      events
        .findOne({
          where: {
            id: eventId,
          },
        })
        .then((eventData) => {
          if (!eventData) {
            // if the event does not exist
            res.status(400).json({ sucess: 'failed', message: 'event does not exist' });
          } else if (eventData.userId === req.decoded.id) {
            if (centername && eventData.centerName !== centername) {
              centers
                .findOne({
                  where: {
                    name: centername.toLowerCase(),
                  },
                })
                .then((newCenterData) => {
                  if (!newCenterData) {
                    res.status(400).json({
                      status: 'failed',
                      message: 'the new choosen center does not exist',
                    });
                  } else {
                    if (newCenterData.bookedOn !== null) {
                      if (newCenterData.bookedOn.indexOf(date) >= 0) {
                        res.status(400).json({
                          status: 'failed',
                          message: 'the new choose center has been booked for that date',
                        });
                        return;
                      }
                    }
                    // Add the new date to the booking register of the new center.
                    let newBookedOn;
                    if (newCenterData.bookedOn === null) {
                      newBookedOn = [date || eventData.date];
                    } else {
                      newBookedOn = [date || eventData.date].concat(newCenterData.bookedOn);
                    }
                    newCenterData
                      .update({
                        bookedOn: newBookedOn,
                      })
                      .then(() => {
                        // Remove the booking of this center in the previous center
                        centers
                          .findOne({
                            where: {
                              id: eventData.centerId,
                            },
                          })
                          .then((centerData) => {
                            const centerRegister = centerData.bookedOn;
                            centerRegister.splice(centerRegister.indexOf(eventData.date), 1);
                            centerData
                              .update({
                                bookedOn: centerRegister,
                              })
                              .then(() => {
                                // update the event it self
                                eventData
                                  .update({
                                    title: title || eventData.title,
                                    description: description || eventData.description,
                                    date: date || eventData.date,
                                    centerName: centername,
                                    centerId: newCenterData.id,
                                  })
                                  .then((newEventData) => {
                                    res.status(201).json({
                                      status: 'success',
                                      message: 'event updated',
                                      event: newEventData,
                                    });
                                  });
                              });
                          });
                      });
                  }
                });
            } else {
              eventData
                .update({
                  title: title || eventData.title,
                  description: description || eventData.description,
                  date: date || eventData.date,
                })
                .then((newEventData) => {
                  res.status(200).json({
                    status: 'success',
                    message: 'event updated',
                    event: newEventData,
                  });
                });
            }
          } else {
            res.status(401).json({
              sucess: false,
              message: 'Unauthorised to perform this action',
            });
          }
        })
        .catch((err) => {
          res.status(400).json({ status: 'error', message: err.message });
        });
    }
  },

  delete(req, res) {
    const eventId = req.params.id;
    return events
      .findOne({
        where: {
          id: eventId,
        },
      })
      .then((eventData) => {
        if (!eventData) {
          res.status(400).json({
            status: 'failed',
            message: 'event does not exist',
          });
        } else if (eventData.userId === req.decoded.id) {
          centers
            .findOne({
              where: {
                id: eventData.centerId,
              },
            })
            .then((centerData) => {
              const centerRegister = centerData.bookedOn;
              centerRegister.splice(centerRegister.indexOf(eventData.date), 1);
              centerData
                .update({
                  bookedOn: centerRegister,
                })
                .then(() => {
                  eventData.destroy()
                    .then(() => {
                      res.status(200).json({
                        status: 'success',
                        message: 'event deleted',
                      });
                    });
                });
            });
        } else {
          res.status(401).json({
            status: 'failed',
            message: 'Unauthorised to perform this action',
          });
        }
      })
      .catch((err) => {
        res.status(400).json({ status: 'error', message: err.message });
      });
  },
};
