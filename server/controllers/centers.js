import dotenv from 'dotenv';
import cloudinary from 'cloudinary';
import db from '../models/index';
import validation from '../validation/centers';

dotenv.config();

const { centers, transactions } = db;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SERCRET,
});

const formatCenterData = (centerData) => {
  return Object.assign(
    {},
    {
      id: centerData.id,
      name: centerData.name,
      location: centerData.location,
      details: centerData.details,
      capacity: centerData.capacity,
      price: centerData.price,
      images: centerData.images,
      bookedOn: centerData.transactions.map((transaction) => { return transaction.date })
    }
  );
};

export default {
  // Controller for getting all centers
  getAll(req, res) {
    centers
      .all({
        include: [{
          model: transactions,
          attributes: ['date'],
        }],
      })
      .then((centersData) => {
        const formattedData = centersData.map((centerData) => formatCenterData(centerData));
        res.status(200).json({
          status: 'success',
          message: 'centers successfully retrieved',
          centers: formattedData,
        });
      })
      .catch((err) => {
        res.status(400).json({ status: 'error', message: err.message });
      });
  },

  // Controller for getting just one particular center
  getOne(req, res) {
    const centerId = req.params.id;
    centers
      .findOne({
        where: {
          id: centerId,
        },
        include: [{
          model: transactions,
          attributes: ['date'],
        }],
      })
      .then((centerData) => {
        if (!centerData) {
          res.status(400).json({
            status: 'failed',
            message: 'center does not exist',
          });
        } else {
          res.status(200).json({
            status: 'success',
            message: 'center successfully retrieved',
            center: formatCenterData(centerData),
          });
        }
      })
      .catch((err) => {
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
      facilities,
      price,
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
            uploadImages(req.files)
              .then((result) => {
                centers
                  .create({
                    name,
                    location,
                    details,
                    capacity,
                    facilities: facilities ? facilities.split(',') : null,
                    price,
                    images: result === null ? null : [result.secure_url],
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
                        facilities: center.facilities,
                        price: center.price,
                        images: center.images,
                      },
                    });
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
        inputData[inputKeys[i].toLowerCase().trim()] = (req.body[inputKeys[i]] === 'string') ? req.body[inputKeys[i]].trim() : req.body[inputKeys[i]];
      }
    }
    const {
      name,
      location,
      details,
      capacity,
      facilities,
      price,
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
            if (req.files.length > 0) {
              uploadImages(req.files)
                .then((result) => {
                  deleteImages(centerData.images)
                    .then(() => {
                      centerData
                        .update({
                          name: name || centerData.name,
                          location: location || centerData.location,
                          details: details || centerData.details,
                          capacity: capacity || centerData.capacity,
                          facilities: facilities ? facilities.split(',') : centerData.facilities,
                          price: price || centerData.price,
                          images: result ? [result.secure_url] : null,
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
                              facilities: updatedCenter.facilities,
                              price: updatedCenter.price,
                              images: updatedCenter.images,
                            },
                          });
                        });
                    });
                })
            } else {
              centerData
                .update({
                  name: name || centerData.name,
                  location: location || centerData.location,
                  details: details || centerData.details,
                  capacity: capacity || centerData.capacity,
                  facilities: facilities ? facilities.split(',') : centerData.facilities,
                  price: price || centerData.price,
                  images: centerData.images,
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
                      facilities: updatedCenter.facilities,
                      price: updatedCenter.price,
                      images: updatedCenter.images,
                    },
                  });
                });
            }
          }
        })
        .catch((err) => {
          // Send an error respose if there was error in the whole process
          res.status(400).json({ status: 'error', message: err.message });
        });
    }
  },
};

const uploadImages = (images) => {
  return new Promise((resolve, reject) => {
    if (type(images) === 'array' && images.length > 0) {
      const image = images[0]; // Since the application is still using just one center image
      cloudinary.v2.uploader.upload_stream({ resource_type: 'raw' }, function (error, result) {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      }).end(image.buffer);
    } else {
      resolve(null);
    }
  });
};

// This function is used to delete a set of image from cloudinary
const deleteImages = (imageUrls) => {
  return new Promise((resolve, reject) => {
    if (type(imageUrls) === 'array' && imageUrls.length > 0) {
      const imageUrl = imageUrls[0]; // Since the application is still using just one image
      const imagePublicId = imageUrl.slice(imageUrl.lastIndexOf('/') + 1);
      cloudinary.v2.uploader.destroy(imagePublicId, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    } else {
      resolve(null);
    }
  })
}

// This function is used to check the type of value
const type = (value) => {
  if (typeof (value) !== 'object') {
    return typeof (value);
  } else if (value === null) {
    return null;
  } else {
    let text = value.constructor.toString()
    let dataType = text.match(/function (.*)\(/)[1];
    return dataType.toLowerCase();
  }
};
