/* eslint-disable no-else-return */
import db from '../../models';
import { sendMail, createPaginationInfo } from '../../commonHelpers';
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
    });
    const currentEventsCount = allEvents.rows.length; const totalEventsCount = allEvents.count;
    const paginationInfo = createPaginationInfo(
      limit,
      offset,
      currentEventsCount,
      totalEventsCount
    );
    return res.status(200).json({
      status: 'success',
      message: 'Events successfully retrieved',
      paginationInfo,
      events: allEvents.rows.map(event => formatEventData(event)),
    });
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
      where: { centerId },
      distinct: true,
      include: {
        model: users,
        attributes: ['email']
      }
    });
    const currentEventsCount = allEvents.rows.length; const totalEventsCount = allEvents.count;
    const paginationInfo = createPaginationInfo(
      limit,
      offset,
      currentEventsCount,
      totalEventsCount
    );
    return res.status(200).json({
      status: 'success',
      message: `Events of center with ID ${centerId} successfully retrieved`,
      paginationInfo,
      events: allEvents.rows,
    });
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
    const choosenCenter = await getCenter(centers, centerid);
    if (!choosenCenter) {
      return res.status(404).json({
        status: 'failed',
        message: 'The choosen center does not exist',
      });
    } else {
      const centerIsBooked = await isCenterBooked(events, centerid, date);
      if (centerIsBooked) {
        return res.status(400).json({
          status: 'failed',
          message: 'The center has been booked for that date',
        });
      } else {
        const newEvent = await events.create({
          title,
          description,
          date,
          userId,
          centerId: centerid,
        });
        return res.status(201).json({
          status: 'success',
          message: 'Event created',
          event: formatEventData(newEvent),
        });
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
      const newChoosenCenter = await getCenter(centers, centerid);
      const centerIsBooked = await isCenterBooked(events, centerid, date);
      if (!newChoosenCenter) {
        return res.status(404).json({
          status: 'failed',
          message: 'The new choosen center does not exist',
        });
      } else if (centerIsBooked) {
        return res.status(400).json({
          status: 'failed',
          message: 'The center has been booked for that date',
        });
      } else {
        updatedEvent = await event.update({
          title: title || event.title,
          date: date || event.date,
          centerId: newChoosenCenter.id,
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
    return res.status(200).json({
      status: 'success',
      message: 'Event updated',
      event: formatEventData(updatedEvent),
    });
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
      return res.status(404).json({
        status: 'failed',
        message: 'Event does not exist',
      });
    } else if (event.status === 'canceled') {
      return res.status(400).json({
        status: 'failed',
        message: 'Event already canceled',
      });
    } else {
      await event.update({ status: 'canceled' });
    }
    sendMail({
      recipient: event.user.email,
      subject: 'Your Event Has Been Canceled',
      body: createEmailBody(event.title, event.date),
    });
    return res.status(200).json({
      status: 'success',
      message: 'Event canceled',
      event: formatEventData(event),
    });
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
    return res.status(200).json({
      status: 'success',
      message: 'Event deleted',
    });
  },
};
