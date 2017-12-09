import db from '../models/index';

const { transactions, centers, users, events } = db;

export default {
  getAll(req, res) {
    centers
      .findAll({
        include: [{
          model: transactions,
          include: [
            users,
            events,
          ]
        }]
      })
      .then((data) => {
        res.send(data);
      })
  }
}