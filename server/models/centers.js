export default (sequelize, DataTypes) => {
  const centers = sequelize.define('centers', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    location: {
      type: DataTypes.STRING,
    },
    details: {
      type: DataTypes.TEXT,
    },
    capacity: {
      type: DataTypes.INTEGER,
    },
    price: {
      type: DataTypes.REAL,
    },
    images: {
      type: DataTypes.ARRAY(DataTypes.STRING),
    },
  });
  return centers;
};
