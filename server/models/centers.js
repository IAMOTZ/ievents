export default (sequelize, DataTypes) => {
  const center = sequelize.define('center', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
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
    type: {
      type: DataTypes.ENUM,
      values: ['theater', 'banquet'],
    },
    faclities: {
      type: DataTypes.ARRAY(DataTypes.STRING),
    },
    price: {
      type: DataTypes.REAL,
    },
    bookedOn: {
      type: DataTypes.ARRAY(DataTypes.STRING),
    },
    image: {
      type: DataTypes.ARRAY(DataTypes.BLOB),
    },
    adminId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });
  return center;
};
