import bcrypt from 'bcryptjs';

const hashPassword = (password) => {
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(password, salt);
};

export default (sequelize, DataTypes) => {
  const users = sequelize.define('users', {
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
      values: ['user', 'admin', 'superAdmin'],
      defaultValue: 'user',
    },
  },
  {
    hooks: {
      beforeCreate: (theUser) => {
        theUser.password = hashPassword(theUser.password);
      },
      beforeUpdate: (theUser) => {
        if (theUser.changed('password')) {
          theUser.password = hashPassword(theUser.password);
        }
      },
    },
  },
  );
  return users;
};
