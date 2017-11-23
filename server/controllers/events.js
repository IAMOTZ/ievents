import db from '../models/index';
import validation from './validation/events';

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
      return;
    }
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
        } else {
          if (centerData.bookedOn) {
            if (centerData.bookedOn.indexOf(date) >= 0) {
              res.status(400).json({
                status: 'failed',
                message: 'the center has been booked for that date',
              });
              return;
            }
          }
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
                    data: eventData,
                  });
                });
            });
        }
      })
      .catch((err) => {
        res.status(400).json({ status: 'error', message: err.message });
      });
  },

};
