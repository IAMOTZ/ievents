'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (sequelize, DataTypes) {
  var transaction = sequelize.define('transaction', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    centerName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    clientNames: {
      type: DataTypes.ARRAY(DataTypes.STRING)
    },
    clientEmails: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      defaultValue: []
    },
    bookingDates: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      defaultValue: []
    },
    days: {
      type: DataTypes.ARRAY(DataTypes.INTEGER),
      defaultValue: []
    },
    allowed: {
      type: DataTypes.ARRAY(DataTypes.BOOLEAN),
      defaultValue: []
    },
    centerId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  });
  return transaction;
};