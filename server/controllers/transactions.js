import db from '../models/index';

const { transactions, centers, users, events } = db;

/**
 * Get a single transaction from the database.
 * @param {Object} transactionModel The query interface for transactions in the database.
 * @param {Number} transactionId The ID of the transaction.
 * @returns {Object} The transaction gotten from the database.
 */
const getTransaction = async (transactionModel, transactionId) => {
  const transaction = await transactionModel.findById(Number(transactionId));
  return transaction;
}

/**
 * Cancels an event.
 * @param {Object} eventModel The query interface events in the database.
 * @param {Object} eventId The ID of the event.
 * @returns {Object} The event that was canceled
 */
const cancelEvent = async (eventModel, eventId) => {
  const event = await eventModel.update(
    { status: 'canceled', },
    { where: { id: eventId, } }
  );
  return event;
}

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
          }]
        }]
      }]
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
    const transaction = getTransaction(transactions, transactionId);
    if (!transaction) {
      return res.status(400).json({
        status: 'failed',
        message: 'the transaction does not exist',
      });
    } else {
      await transaction.destroy();
      await cancelEvent(events, transaction.eventId);
      return res.status(200).json({
        status: 'success',
        message: 'transaction successfully deleted',
      });
    }
  }
}
