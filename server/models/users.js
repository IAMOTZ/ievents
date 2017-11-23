import bcrypt from 'bcryptjs';

export default (sequelize, DataTypes) => {
  const user = sequelize.define('user', {
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
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM,
      values: ['user', 'admin'],
      defaultValue: 'user',
    },
  }, {
    hooks: {
      beforeCreate: (theUser) => {
        const salt = bcrypt.genSaltSync(10);
        const hashPassword = bcrypt.hashSync(theUser.password, salt);
        theUser.password = hashPassword;
      },
    },
  });
  return user;
};
