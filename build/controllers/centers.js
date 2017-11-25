'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = require('../models/index');

var _index2 = _interopRequireDefault(_index);

var _centers = require('../validation/centers');

var _centers2 = _interopRequireDefault(_centers);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var centers = _index2.default.centers;
exports.default = {
  // Controller for getting all centers
  getAll: function getAll(req, res) {
    centers.all().then(function (centersData) {
      res.status(200).json({
        status: 'success',
        message: 'centers successfully retrieved',
        centers: centersData
      });
    }).catch(function (err) {
      res.status(400).json({ status: 'error', message: err.message });
    });
  },


  // Controller for getting just one particular center
  getOne: function getOne(req, res) {
    var centerId = req.params.id;
    // Check if the center exist
    centers.findOne({
      where: {
        id: centerId
      }
    }).then(function (centerData) {
      // If center does not exist, send a failed response
      if (!centerData) {
        res.status(400).json({
          status: 'failed',
          message: 'center does not exist'
        });
      } else {
        // If center exist, send it as a response
        res.status(200).json({
          status: 'success',
          message: 'center successfully retrieved',
          center: centerData
        });
      }
    }).catch(function (err) {
      // Send an error respose if there was error in the whole process
      res.status(400).json({ status: 'error', message: err.message });
    });
  },


  // Controller for creating a center
  create: function create(req, res) {
    var inputData = {};
    var inputKeys = Object.keys(req.body);
    for (var i = 0; i < inputKeys.length; i += 1) {
      // Convert all the keys of request body to lowercase and trim spaces
      if (typeof inputKeys[i] === 'string') {
        inputData[inputKeys[i].toLowerCase().trim()] = req.body[inputKeys[i]].trim();
      }
    }
    var name = inputData.name,
        location = inputData.location,
        details = inputData.details,
        capacity = inputData.capacity,
        type = inputData.type,
        facilities = inputData.facilities,
        price = inputData.price,
        image = inputData.image;

    var validationOutput = _centers2.default.create(inputData); // Validate the user inputs
    if (validationOutput !== 'success') {
      // If validation was not successful, send a failed response
      res.status(400).json({
        status: 'failed',
        message: validationOutput
      });
    } else {
      // If validation was successfull, check if the center already exist
      var userId = req.decoded.id;
      centers.findOne({
        where: {
          name: name.toLowerCase()
        }
      }).then(function (centerData) {
        if (centerData) {
          // If center already exit, send a failed response to the user
          res.status(400).json({
            status: 'failed',
            message: 'center with this name already exist'
          });
        } else {
          // If center does not exist, create it
          return centers.create({
            name: name,
            location: location,
            details: details,
            capacity: capacity,
            type: type,
            facilities: facilities ? facilities.split(',') : null,
            price: price,
            image: image,
            userId: userId
          }).then(function (center) {
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
                image: center.image
              }
            });
          });
        }
      }).catch(function (err) {
        // Send an error respose if there was error in the whole process
        res.status(400).json({ status: 'error', message: err.message });
      });
    }
  },
  update: function update(req, res) {
    var centerId = req.params.id;
    var inputData = {};
    var inputKeys = Object.keys(req.body);
    for (var i = 0; i < inputKeys.length; i += 1) {
      // Convert all the keys of request body to lowercase and trim spaces
      if (typeof inputKeys[i] === 'string') {
        inputData[inputKeys[i].toLowerCase().trim()] = req.body[inputKeys[i]].trim();
      }
    }
    var name = inputData.name,
        location = inputData.location,
        details = inputData.details,
        capacity = inputData.capacity,
        type = inputData.type,
        facilities = inputData.facilities,
        price = inputData.price,
        image = inputData.image;

    var validationOutput = _centers2.default.update(inputData); // Validate the user inputs
    if (validationOutput !== 'success') {
      // If validation was not successful, send a failed response
      res.status(400).json({
        status: 'failed',
        message: validationOutput
      });
    } else {
      // If validation was successfull, check if the center exist at all
      centers.findOne({
        where: {
          id: centerId
        }
      }).then(function (centerData) {
        if (!centerData) {
          // If center does not exist, send a failed response to the user
          res.status(400).json({ sucess: 'failed', message: 'center does not exist' });
        } else {
          // If center exist, update the center data
          centerData.update({
            name: name || centerData.name,
            location: location || centerData.location,
            details: details || centerData.details,
            capacity: capacity || centerData.capacity,
            type: type || centerData.type,
            facilities: facilities ? facilities.split(',') : centerData.facilities,
            price: price || centerData.price,
            image: image || centerData.image
          }).then(function (updatedCenter) {
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
                image: updatedCenter.image
              }
            });
          });
        }
      }).catch(function (err) {
        // Send an error respose if there was error in the whole process
        res.status(400).json({ status: 'error', message: err.message });
      });
    }
  }
};