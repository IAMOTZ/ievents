import db from '../models/index';

const { transactions, centers, users, events } = db;

export default {
  getAll(req, res) {
    centers
      .findAll({
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
      })
      .then((centers) => {
        res.status(200).send(centers);
      })
  },

  delete(req, res) {
    const transactionsId = req.params.id;
    transactions
      .findById(Number(transactionsId))
      .then((transactionData) => {
        if (!transactionData) {
          res.status(400).json({
            status: 'failed',
            message: 'the transaction does not exist',
          });
        } else {
          transactionData
            .destroy()
            .then(() => {
              events
                .update({
                  status: 'canceled',
                }, {
                  where: {
                    id: transactionData.eventId,
                  }
                })
                .then(() => {
                  res.status(200).json({
                    status: 'success',
                    message: 'transaction successfully deleted',
                  });
                });
            });
        }
      })
      .catch((err) => {
        res.status(400).json({
          status: 'error',
          message: err.message,
        });
      });
  }
}
