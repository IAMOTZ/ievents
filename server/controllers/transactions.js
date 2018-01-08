import db from '../models/index';

const { transactions, centers, users, events } = db;

const getTransaction = async (transactionModel, transactionId) => {
  const transaction = await transactionModel.findById(Number(transactionId));
  return transaction;
}

const cancelEvent = async (eventModel, eventId) => {
  const event = await eventModel.update(
    { status: 'canceled', },
    { where: { id: eventId, } }
  );
  return event;
}

export default {
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
