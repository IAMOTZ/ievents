import db from '../models/index';

const { transactions, centers, users, events } = db;

export default {
  getAll(req, res) {
    centers
      .findAll({
        attributes: ['id', 'name'],
        include: [{
          model: transactions,
          attributes: ['id', 'decision'],
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
      .then((data) => {
        res.send(data);
      })
  },

  changeStatus(req, res, next) {
    if (req.query.decision.toLowerCase() === 'allow') {
      const transactionsId = req.params.id;
      transactions
        .findById(Number(transactionsId))
        .then((transactionData) => {
          if (!transactionData) {
            res.status(400).json({
              status: 'failed',
              message: 'the transactions does not exist',
            })
          } else {
            transactionData
              .update({
                decision: 'allowed',
              })
              .then((newTransactionData) => {
                res.status(200).json({
                  status: 'success',
                  message: 'the transactions is successfully allowed',
                  transaction: newTransactionData,
                })
              })
          }
        })
        .catch((err) => {
          res.status(400).json({
            status: 'error',
            message: err.message
          })
        });
    } else if (req.query.decision.toLowerCase() === 'cancel') {
      const transactionsId = req.params.id;
      transactions
        .findById(Number(transactionsId))
        .then((transactionData) => {
          if (!transactionData) {
            res.status(400).json({
              status: 'failed',
              message: 'the transactions does not exist',
            })
          } else {
            transactionData
              .update({
                decision: 'canceled',
              })
              .then((newTransactionData) => {
                res.status(200).json({
                  status: 'success',
                  message: 'the transactions is successfully canceled',
                  transaction: newTransactionData,
                })
              })
          }
        })
        .catch((err) => {
          res.status(400).json({
            status: 'error',
            message: err.message,
          })
        })
    } else {
      next();
    }
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
          })
        } else {
          transactionData
            .destroy()
            .then(() => {
              res.status(200).json({
                status: 'success',
                message: 'transaction successfully deleted',
              })
            })
        }
      })
      .catch((err) => {
        res.status(400).json({
          status: 'error',
          message: err.message,
        })
      })
  }
}
