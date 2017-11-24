import db from '../models/index';
import validation from '../validation/centers';

const { centers } = db;

export default {
  getAll(req, res) {
    centers
      .all()
      .then((centersData) => {
        res.status(200).json(centersData);
      })
      .catch((err) => {
        res.status(400).json({ status: 'error', message: err.message });
      });
  },

  getOne(req, res) {
    const centerId = req.params.id;
    centers
      .findOne({
        where: {
          id: centerId,
        },
      })
      .then((centerData) => {
        if (!centerData) {
          res.status(400).json({
            status: 'failed',
            message: 'center does not exist',
          });
        } else {
          res.status(200).json(centerData);
        }
      })
      .catch((err) => {
        res.status(400).json({ status: 'error', message: err.message });
      });
  },
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

  update(req, res) {
    const centerId = req.params.id;
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
    const validationOutput = validation.update(inputData);
    if (validationOutput !== 'success') {
      res.status(400).json({
        status: 'failed',
        message: validationOutput,
      });
      return;
    }
    centers
      .findOne({
        where: {
          id: centerId,
        },
      })
      .then((centerData) => {
        if (!centerData) {
          res.status(400).json({ sucess: 'failed', message: 'center does not exist' });
          return;
        }
        if (centerData.userId === req.decoded.id) {
          centerData
            .update({
              name: name || centerData.name,
              location: location || centerData.location,
              details: details || centerData.details,
              capacity: capacity || centerData.capacity,
              type: type || centerData.type,
              facilities: facilities ? facilities.split(',') : centerData.facilities,
              price: price || centerData.price,
              image: image || centerData.image,
            })
            .then((updatedCenter) => {
              res.status(200).json({
                status: 'success',
                message: 'center updated',
                data: {
                  id: updatedCenter.id,
                  name: updatedCenter.name,
                  location: updatedCenter.location,
                  details: updatedCenter.details,
                  capacity: updatedCenter.capacity,
                  type: updatedCenter.type,
                  facilities: updatedCenter.facilities,
                  price: updatedCenter.price,
                  image: updatedCenter.image,
                },
              });
            })
            .catch((err) => {
              res.status(400).json({ status: 'error', message: err.message });
            });
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
  },
};
