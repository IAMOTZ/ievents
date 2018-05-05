/* eslint-disable no-else-return */
import db from '../models';
import { uploadImage, deleteImage } from '../helpers';

const { centers, events } = db;

/**
 * Map out the dates of allowed events.
 * @param {Array} eventsArray an array of events.
 * @returns {Array} an array of the date of allowed events.
 */
const getDatesFromAllowedEvents = eventsArray => (
  eventsArray.filter(event => event.status === 'allowed').map(event => event.date)
);

/**
 * Get a single center from the database.
 * @param {Object} centerModel The query interface for centers in the database.
 * @param {Number} centerId The ID of the center.
 * @returns {Object} The center gotten from the database.
 */
const getCenter = async (centerModel, centerId) => {
  const center = await centerModel.findById(Number(centerId));
  return center;
};

/**
 * Format the center data to be returned to the user.
 * @param {Object} centerData The raw center data gotten from the database.
 * @returns {Object} The formatted center data.
 */
const formatCenterData = centerData => (
  Object.assign(
    {},
    {
      id: centerData.id,
      name: centerData.name,
      location: centerData.location,
      details: centerData.details,
      capacity: centerData.capacity,
      price: centerData.price,
      images: centerData.images,
      bookedOn: centerData.events ? getDatesFromAllowedEvents(centerData.events) : null,
    },
  )
);

export default {
  /**
   * Get all centers
   * @param {Object} req The request object.
   * @param {Object} res The response objct.
   * @returns {Object} The response object containing some response data.
   */
  async getAll(req, res) {
    const allCenters = await centers.all({
      limit: res.locals.limit,
      offset: res.locals.offset,
      include: [{
        model: events,
        attributes: ['status', 'date'],
      }],
    });
    return res.status(200).json({
      status: 'success',
      message: 'Centers successfully retrieved',
      centers: allCenters.map(center => formatCenterData(center)),
    });
  },

  /**
   * Get a single center.
   * @param {Object} req The request object.
   * @param {Object} res The response object.
   * @returns {Object} The response object containing some response data.
   */
  async getOne(req, res) {
    const centerId = req.params.id;
    const center = await centers.findOne({
      where: {
        id: centerId,
      },
      include: [{
        model: events,
        attributes: ['status', 'date'],
      }],
    });
    if (!center) {
      return res.status(404).json({
        status: 'failed',
        message: 'Center does not exist',
      });
    } else {
      return res.status(200).json({
        status: 'success',
        message: 'Center successfully retrieved',
        center: formatCenterData(center),
      });
    }
  },

  /**
   * Creates a center.
   * @param {Object} req The request object.
   * @param {Object} res The response object.
   * @returns {Object} The response object containing some response data.
   */
  async create(req, res) {
    const {
      name, location, details, capacity, price,
    } = res.locals.formattedInputs;
    let image = null;
    if (req.file) {
      image = await uploadImage(req.file);
    }
    const newCenter =
      await centers.create({
        name,
        location,
        details,
        capacity,
        price,
        images: image ? [image.secure_url] : null,
      });
    return res.status(201).json({
      status: 'success',
      message: 'Center created',
      center: formatCenterData(newCenter),
    });
  },

  /**
   * Updates a center.
   * @param {Object} req The request object.
   * @param {Object} res The response object.
   * @returns {Object} The response object containing some response data.
   */
  async update(req, res) {
    const {
      name, location, details, capacity, price,
    } = res.locals.formattedInputs;
    const centerId = req.params.id;
    const center = await getCenter(centers, centerId);
    if (!center) {
      return res.status(404).json({
        status: 'failed',
        message: 'Center does not exist',
      });
    } else {
      let image = null;
      if (req.file) {
        image = await uploadImage(req.file);
        await deleteImage(center.images[0]);
      }
      const updatedCenter =
        await center.update({
          name: name || center.name,
          location: location || center.location,
          details: details || center.details,
          capacity: capacity || center.capacity,
          price: price || center.price,
          images: image ? [image.secure_url] : center.images,
        });
      return res.status(200).json({
        status: 'success',
        message: 'Center updated',
        center: formatCenterData(updatedCenter),
      });
    }
  },
};
