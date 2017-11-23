import db from '../models/index';

const { centers } = db;

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
      name,
      location,
      details,
      capacity,
      type,
      facilities,
      price,
      image,
    } = inputData;
    const userId = req.decoded.id;
    centers
      .findOne({
        where: {
          name: name.toLowerCase(),
        },
      })
      .then((centerData) => {
        if (centerData) {
          res.status(400).json({
            status: 'failed',
            message: 'center with this name already exist',
          });
        } else {
          return centers
            .create({
              name,
              location,
              details,
              capacity,
              type,
              facilities: facilities ? facilities.split(',') : null,
              price,
              image,
              userId,
            })
            .then((center) => {
              res.status(201).json({
                status: 'success',
                message: 'center created',
                data: {
                  id: center.id,
                  name: center.name,
                  location: center.location,
                  details: center.details,
                  capacity: center.capacity,
                  type: center.type,
                  facilities: center.facilities,
                  price: center.price,
                  image: center.image,
                },
              });
            });
        }
      })
      .catch((err) => {
        res.status(400).json({ status: 'error', message: err.message });
      });
  },
}
