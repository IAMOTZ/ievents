/* eslint-disable no-else-return */
import db from '../../models';
import {
  uploadImage, deleteImage, createPaginationInfo, successResponse, failureResponse,
} from '../../commonHelpers';
import { getCenter, formatCenterData, getDatesFromEvents } from './helpers';

const { centers, events } = db;

export default {
  /**
   * Get all centers
   * @param {Object} req The request object.
   * @param {Object} res The response objct.
   * @returns {Object} The response object containing some response data.
   */
  async getAll(req, res) {
    const { limit, offset } = res.locals;
    const allCenters = await centers.findAndCountAll({
      limit,
      offset,
      distinct: true,
      include: [{
        model: events,
        attributes: ['status', 'date'],
      }],
      order: [['name', 'ASC']]
    });
    const currentCentersCount = allCenters.rows.length; const totalCentersCount = allCenters.count;
    const paginationInfo = createPaginationInfo(
      limit,
      offset,
      currentCentersCount,
      totalCentersCount
    );
    const payload = {
      paginationInfo, centers: allCenters.rows.map(center => formatCenterData(center))
    };
    return successResponse(res, 'Centers successfully retrieved', payload);
  },

  /**
   * Get a single center.
   * @param {Object} req The request object.
   * @param {Object} res The response object.
   * @returns {Object} The response object containing some response data.
   */
  async getOne(req, res) {
    const centerId = req.params.id;
    const center = await getCenter(centers, centerId, {
      include: [{
        model: events,
        attributes: ['status', 'date'],
      }],
    });
    if (!center) {
      return failureResponse(res, 'Center does not exist', {}, 404);
    } else {
      const payload = { center: formatCenterData(center) };
      return successResponse(res, 'Center successfully retrieved', payload);
    }
  },

  /**
   * Get the dates booked for a particular center.
   * @param {Object} req The request object.
   * @param {Object} res The resonse object.
   * @returns {Object} The response object containing some reponse data.
   */
  async getBookedDates(req, res) {
    const centerId = req.params.id;
    const { limit, offset } = res.locals;
    const center = await getCenter(centers, centerId);
    if (!center) {
      return failureResponse(res, 'Center does not exist', {}, 404);
    }
    const centerEvents = await events.findAndCountAll({
      where: { centerId, status: 'allowed' },
      attributes: ['date'],
      limit,
      offset
    });
    const bookedDates = getDatesFromEvents(centerEvents.rows);
    const currentDateCount = centerEvents.rows.length; const totalDateCount = centerEvents.count;
    const paginationInfo = createPaginationInfo(limit, offset, currentDateCount, totalDateCount);
    const payload = { paginationInfo, bookedDates };
    return successResponse(res, `The dates for center with id ${centerId} successfully retrieved`, payload);
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
        price: Number(price).toFixed(2),
        images: image ? [image.secure_url] : null,
      });
    const payload = { center: formatCenterData(newCenter) };
    return successResponse(res, 'Center created', payload, 201);
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
      return failureResponse(res, 'Center does not exist', {}, 404);
    } else {
      let image = null;
      if (req.file) {
        image = await uploadImage(req.file);
        if (center.images && center.images[0]) await deleteImage(center.images[0]);
      }
      const updatedCenter =
        await center.update({
          name: name || center.name,
          location: location || center.location,
          details: details || center.details,
          capacity: capacity || center.capacity,
          price: Number(price).toFixed(2) || center.price,
          images: image ? [image.secure_url] : center.images,
        });
      const payload = { center: formatCenterData(updatedCenter) };
      return successResponse(res, 'Center updated', payload);
    }
  },
};
