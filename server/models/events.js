export default (sequelize, DataTypes) => {
  const events = sequelize.define('events', {
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
    description: {
      type: DataTypes.TEXT,
    },
    date: {
      type: DataTypes.STRING,
    },
    status: {
      type: DataTypes.ENUM,
      values: ['allowed', 'canceled', 'done'],
      defaultValue: 'allowed',
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
  return events;
};
