export default (sequelize, DataTypes) => {
  const userEvent = sequelize.define('userEvent', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    descrption: {
      type: DataTypes.TEXT,
    },
    date: {
      type: DataTypes.STRING,
    },
    days: {
      type: DataTypes.INTEGER,
    },
    centerName: {
      type: DataTypes.STRING,
    },
    centerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });
  return userEvent;
};
