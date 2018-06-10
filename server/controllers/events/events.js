/* eslint-disable no-else-return */
import db from '../../models';
import {
  sendMail, createPaginationInfo, successResponse, failureResponse
} from '../../commonHelpers';
import {
  formatEventData, createEmailBody, getCenter, isCenterBooked
} from './helpers';

const { events, centers, users } = db;


export default {
  /**
   * Get all the events of a particular user.
   * @param {Object} req The request object.
   * @param {Object} res The response object.
   * @returns {Object} The response object containing some response data.
   */
  async getAll(req, res) {
    const userId = req.decoded.id;
    const { limit, offset } = res.locals;
    const allEvents = await events.findAndCountAll({
      limit,
      offset,
      where: { userId },
      order: [['createdAt', 'DESC']]
    });
    const currentEventsCount = allEvents.rows.length; const totalEventsCount = allEvents.count;
    const paginationInfo = createPaginationInfo(
      limit,
      offset,
      currentEventsCount,
      totalEventsCount
    );
    const payload = { paginationInfo, events: allEvents.rows.map(event => formatEventData(event)) };
    return successResponse(res, 'Events successfully retrieved', payload);
  },

  /**
   * Get the events to happen in a particular center.
   * @param {Object} req The request object.
   * @param {Object} res The response object.
   * @returns {Object} The response object containing some response data.
   */
  async getEventsPerCenter(req, res) {
    const centerId = req.params.id;
    const { limit, offset } = res.locals;
    const allEvents = await events.findAndCountAll({
      limit,
      offset,
      where: { centerId, status: 'allowed' },
      distinct: true,
      include: {
        model: users,
        attributes: ['email']
      },
      order: [['createdAt', 'DESC']]
    });
    const currentEventsCount = allEvents.rows.length; const totalEventsCount = allEvents.count;
    const paginationInfo = createPaginationInfo(
      limit,
      offset,
      currentEventsCount,
      totalEventsCount
    );
    const payload = { paginationInfo, events: allEvents.rows };
    return successResponse(res, `Events of center with ID ${centerId} successfully retrieved`, payload);
  },

  /**
   * Creates an event.
   * @param {Object} req The request object.
   * @param {Object} res The response object.
   * @returns {Object} The response object containing some response data.
   */
  async create(req, res) {
    const {
      title, description, date, centerid,
    } = res.locals.formattedInputs;
    const userId = req.decoded.id;
    const chosenCenter = await getCenter(centers, centerid);
    if (!chosenCenter) {
      return failureResponse(res, 'The chosen center does not exist', {}, 404);
    } else {
      const centerIsBooked = await isCenterBooked(events, centerid, date);
      if (centerIsBooked) {
        return failureResponse(res, 'The center has been booked for that date', {});
      } else {
        const newEvent = await events.create({
          title,
          description,
          date,
          userId,
          centerId: centerid,
          centerName: chosenCenter.name,
        });
        const payload = { event: formatEventData(newEvent) };
        return successResponse(res, 'Event created', payload, 201);
      }
    }
  },

  /**
   * Updates an event.
   * @param {Object} req The request object.
   * @param {Object} res The response object.
   * @returns {Object} The response object containing some response data.
   */
  async update(req, res) {
    const {
      title, description, date, centerid,
    } = res.locals.formattedInputs;
    const { event } = res.locals;
    let updatedEvent = null;
    if (centerid && event.centerId !== Number(centerid)) {
      const newChosenCenter = await getCenter(centers, centerid);
      const centerIsBooked = await isCenterBooked(events, centerid, date);
      if (!newChosenCenter) {
        return failureResponse(res, 'The new chosen center does not exist', {}, 404);
      } else if (centerIsBooked) {
        return failureResponse(res, 'The center has been booked for that date');
      } else {
        updatedEvent = await event.update({
          title: title || event.title,
          date: date || event.date,
          centerId: newChosenCenter.id,
          centerName: newChosenCenter.name,
          description: description || event.description,
        });
      }
    } else {
      updatedEvent = await event.update({
        title: title || event.title,
        date: date || event.date,
        description: description || event.description,
      });
    }
    const payload = { event: formatEventData(updatedEvent) };
    return successResponse(res, 'Event updated', payload);
  },

  /**
   * Cancels an event.
   * @param {Object} req The request object.
   * @param {Object} res The response object.
   * @returns {Object} The response object containing some response data.
   */
  async cancel(req, res) {
    const eventId = req.params.id;
    const event = await events.findById(Number(eventId), {
      include: [{ model: users, attributes: ['email'] }],
    });
    if (!event) {
      return failureResponse(res, 'Event does not exist', {}, 404);
    } else if (event.status === 'canceled') {
      return failureResponse(res, 'Event already canceled');
    } else {
      await event.update({ status: 'canceled' });
    }
    sendMail({
      recipient: event.user.email,
      subject: 'Your Event Has Been Canceled',
      body: createEmailBody(event.title, event.date),
    });
    const payload = { event: formatEventData(event) };
    return successResponse(res, 'Event canceled', payload);
  },

  /**
   * Deletes an event.
   * @param {Object} req The request object.
   * @param {Object} res The response object.
   * @returns {Object} The response object containing some response data.
   */
  async delete(req, res) {
    const { event } = res.locals;
    await event.destroy();
    return successResponse(res, 'Event deleted');
  },
};
