import db from '../models/index';
import validation from '../validation/centers';

const { centers } = db;

export default {
  // Controller for getting all centers
  getAll(req, res) {
    centers
      .all()
      .then((centersData) => {
        res.status(200).json({
          status: 'success',
          message: 'centers successfully retrieved',
          centers: centersData,
        });
      })
      .catch((err) => {
        res.status(400).json({ status: 'error', message: err.message });
      });
  },

  // Controller for getting just one particular center
  getOne(req, res) {
    const centerId = req.params.id;
    // Check if the center exist
    centers
      .findOne({
        where: {
          id: centerId,
        },
      })
      .then((centerData) => {
        // If center does not exist, send a failed response
        if (!centerData) {
          res.status(400).json({
            status: 'failed',
            message: 'center does not exist',
          });
        } else {
          // If center exist, send it as a response
          res.status(200).json({
            status: 'success',
            message: 'center successfully retrieved',
            center: centerData,
          });
        }
      })
      .catch((err) => {
        // Send an error respose if there was error in the whole process
        res.status(400).json({ status: 'error', message: err.message });
      });
  },

  // Controller for creating a center
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
      name,
      location,
      details,
      capacity,
      type,
      facilities,
      price,
      images,
    } = inputData;
    const validationOutput = validation.create(inputData); // Validate the user inputs
    if (validationOutput !== 'success') {
      // If validation was not successful, send a failed response
      res.status(400).json({
        status: 'failed',
        message: validationOutput,
      });
    } else {
      // If validation was successfull, check if the center already exist
      const userId = req.decoded.id;
      centers
        .findOne({
          where: {
            name: name.toLowerCase(),
          },
        })
        .then((centerData) => {
          if (centerData) {
            // If center already exit, send a failed response to the user
            res.status(400).json({
              status: 'failed',
              message: 'center with this name already exist',
            });
          } else {
            // If center does not exist, create it
            return centers
              .create({
                name,
                location,
                details,
                capacity,
                type,
                facilities: facilities ? facilities.split(',') : null,
                price,
                images: images ? images.split(',') : null,
                userId,
              })
              .then((center) => {
                // Send a success response with the center datas
                res.status(201).json({
                  status: 'success',
                  message: 'center created',
                  center: {
                    id: center.id,
                    name: center.name,
                    location: center.location,
                    details: center.details,
                    capacity: center.capacity,
                    type: center.type,
                    facilities: center.facilities,
                    price: center.price,
                    images: center.images,
                  },
                });
              });
          }
        })
        .catch((err) => {
        // Send an error respose if there was error in the whole process
          res.status(400).json({ status: 'error', message: err.message });
        });
    }
  },

  update(req, res) {
    const centerId = req.params.id;
    const inputData = {};
    const inputKeys = Object.keys(req.body);
    for (let i = 0; i < inputKeys.length; i += 1) {
    // Convert all the keys of request body to lowercase and trim spaces
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
      images,
    } = inputData;
    const validationOutput = validation.update(inputData); // Validate the user inputs
    if (validationOutput !== 'success') {
      // If validation was not successful, send a failed response
      res.status(400).json({
        status: 'failed',
        message: validationOutput,
      });
    } else {
      // If validation was successfull, check if the center exist at all
      centers
        .findOne({
          where: {
            id: centerId,
          },
        })
        .then((centerData) => {
          if (!centerData) {
            // If center does not exist, send a failed response to the user
            res.status(400).json({ status: 'failed', message: 'center does not exist' });
          } else {
            // If center exist, update the center data
            centerData
              .update({
                name: name || centerData.name,
                location: location || centerData.location,
                details: details || centerData.details,
                capacity: capacity || centerData.capacity,
                type: type || centerData.type,
                facilities: facilities ? facilities.split(',') : centerData.facilities,
                price: price || centerData.price,
                images: images ? images.split(',') : centerData.images,
              })
              .then((updatedCenter) => {
                // Send a success response with the new center datas
                res.status(200).json({
                  status: 'success',
                  message: 'center updated',
                  center: {
                    id: updatedCenter.id,
                    name: updatedCenter.name,
                    location: updatedCenter.location,
                    details: updatedCenter.details,
                    capacity: updatedCenter.capacity,
                    type: updatedCenter.type,
                    facilities: updatedCenter.facilities,
                    price: updatedCenter.price,
                    images: updatedCenter.images,
                  },
                });
              });
          }
        })
        .catch((err) => {
        // Send an error respose if there was error in the whole process
          res.status(400).json({ status: 'error', message: err.message });
        });
    }
  },
};
