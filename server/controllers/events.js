/* eslint-disable no-else-return */
import db from '../models/index';

const { events, centers, transactions } = db;

/**
 * Format the event data to be returned to the user.
 * @param {Object} eventData The raw event data gotten from the database.
 * @returns {Object} The formatted event data.
 */
const formatEventData = eventData => (
  Object.assign(
    {},
    {
      id: eventData.id,
      centerId: eventData.centerId,
      userId: eventData.userId,
      title: eventData.title,
      description: eventData.description,
      date: eventData.date,
      status: eventData.status,
    },
  )
);

/**
 * Get a single center from the database.
 * @param {Object} centerModel The query interface for centers in the database.
 * @param {String} centerId The ID of the center.
 * @returns {Object} The center gotten from the database.
 */
const getCenter = async (centerModel, centerId) => {
  const center = await centerModel.findById(Number(centerId));
  return center;
};

/**
 * Checks if a center is booked(has event) on a particular date.
 * @param {Object} eventModel The query interface for events in the database.
 * @param {Number} centerId The ID of the center.
 * @param {String} date The date to be compared.
 * @returns {Boolean} Truthy values representing if the center is booked or not.
 */
const isCenterBooked = async (eventModel, centerId, date) => {
  const event =
    await eventModel.findOne({
      where: {
        date,
        centerId,
        status: 'allowed',
      },
    });
  if (event) {
    return true;
  } else {
    return false;
  }
};

/**
 * Creates a transaction.
 * @param {Object} transactionModel The query interface for transactions in the database.
 * @param {Object} event Event object containing the event details.
 * @returns {Object} The transaction that is created.
 */
const createTransaction = async (transactionModel, event) => {
  const transaction = await transactionModel.create({
    eventId: event.id,
    centerId: event.centerId,
  });
  return transaction;
};

/**
 * Deletes a transaction.
 * @param {Object} transactionModel The query interface for transactions in the database.
 * @param {Object} event Event object containing the event details.
 */
const deleteTransaction = async (transactionModel, event) => {
  await transactionModel.destroy({
    where: {
      eventId: event.id,
    },
  });
};

export default {
  /**
   * Get all the events of a particular user.
   * @param {Object} req The request object.
   * @param {Object} res The response object.
   * @returns {Object} The response object containing some response data.
   */
  async getAll(req, res) {
    const userId = req.decoded.id;
    const allEvents = await events.all({
      limit: res.locals.limit,
      offset: res.locals.offset,
      where: { userId },
    });
    return res.status(200).json({
      status: 'success',
      message: 'Events successfully retrieved',
      events: allEvents.map(event => formatEventData(event)),
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
        await createTransaction(transactions, newEvent);
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
        await deleteTransaction(transactions, updatedEvent);
        await createTransaction(transactions, updatedEvent);
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
