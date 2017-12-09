export default (sequelize, DataTypes) => {
  const transactions = sequelize.define('transactions', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    centerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    eventId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    date: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    decision: {
      type: DataTypes.ENUM,
      values: ['canceled', 'allowed'],
    },
  });
  return transactions;
};
