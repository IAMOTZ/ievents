export default (sequelize, DataTypes) => {
  const transactions = sequelize.define('transactions', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    centerName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    clientNames: {
      type: DataTypes.ARRAY(DataTypes.STRING),
    },
    clientEmails: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      defaultValue: [],
    },
    bookingDates: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      defaultValue: [],
    },
    days: {
      type: DataTypes.ARRAY(DataTypes.INTEGER),
      defaultValue: [],
    },
    allowed: {
      type: DataTypes.ARRAY(DataTypes.BOOLEAN),
      defaultValue: [],
    },
    centerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });
  return transactions;
};
