/* eslint-disable no-else-return */
import db from '../models/index';
import { sendMail } from '../helpers';

const {
  transactions, centers, users, events,
} = db;

/**
 * Get a single transaction from the database.
 * @param {Object} transactionModel The query interface for transactions in the database.
 * @param {Number} transactionId The ID of the transaction.
 * @returns {Object} The transaction gotten from the database.
 */
const getTransaction = async (transactionModel, transactionId) => {
  const transaction = await transactionModel.findById(Number(transactionId));
  return transaction;
};


/**
 * Get the details of an event from the transaction attached to it.
 * @param {Object} transactionModel The query interface for transactions in the database.
 * @param {Number} transactionId The ID of the transaction.
 * @returns {Object} The details of the event.
 */
const getEventFromTransaction = async (transactionModel, transactionId) => {
  const transaction = await transactionModel.findOne({
    where: {
      id: transactionId,
    },
    include: [{
      model: events,
      attributes: ['title', 'date'],
      include: [{
        model: users,
        attributes: ['email'],
      }],
    }],
  });
  return Object.assign(
    {},
    {
      title: transaction.event.title,
      date: transaction.event.date,
      owner: transaction.event.user.email,
    },
  );
};

/**
 * Creates the email body to send to the user whoose event is to be canceled.
 * @param {String} eventTitle The title of the event.
 * @param {String} eventDate The date the event is supposed to occur.
 * @returns {String} The email constructed.
 */
const createEmailBody = (eventTitle, eventDate) => (
  `<h3>Ievents</h3>
  <p>Your event, <b>${eventTitle}</b> ,that is supposed to come up on <b>
    ${eventDate}</b> has been canceled!!
    <br> Consequently, the center would not be available for your event.
    <br> <br>
    <b>NOTE:</b>This email terminates the transaction we created with you on this event.
    <br> <br> We are very sorry for any inconvinience that this might have caused you.
    <br> For more details, you can always contact us at admin@ievents.com.
  </p>`
);

/**
 * Cancels an event.
 * @param {Object} eventModel The query interface events in the database.
 * @param {Object} eventId The ID of the event.
 * @returns {Object} The event that was canceled
 */
const cancelEvent = async (eventModel, eventId) => {
  const event = await eventModel.update(
    { status: 'canceled' },
    { where: { id: eventId } },
  );
  return event;
};

export default {
  /**
   * Gets all the transactions.
   * The transactions are grouped under the center they occur.
   * @param {Object} req The request object.
   * @param {Object} res The response object.
   * @returns {Object} The response object containing some response data.
   */
  async getAll(req, res) {
    const allCenters = await centers.all({
      attributes: ['id', 'name'],
      include: [{
        model: transactions,
        attributes: ['id'],
        include: [{
          model: events,
          attributes: ['id', 'title', 'description', 'date'],
          include: [{
            model: users,
            attributes: ['id', 'email'],
          }],
        }],
      }],
    });
    return res.status(200).json(allCenters);
  },

  /**
   * Deletes a transaction.
   * @param {Object} req The request object.
   * @param {Object} res The response object.
   * @returns {Object} The response object containing some response data.
   */
  async delete(req, res) {
    const transactionId = req.params.id;
    const transaction = await getTransaction(transactions, transactionId);
    if (!transaction) {
      return res.status(404).json({
        status: 'failed',
        message: 'Transaction does not exist',
      });
    } else {
      const eventDetails = await getEventFromTransaction(transactions, transactionId);
      await transaction.destroy();
      sendMail({
        recipient: eventDetails.owner,
        subject: 'Your Event Has Been Canceled',
        body: createEmailBody(eventDetails.title, eventDetails.date),
      });
      await cancelEvent(events, transaction.eventId);
      return res.status(200).json({
        status: 'success',
        message: 'Transaction successfully deleted',
      });
    }
  },
};
