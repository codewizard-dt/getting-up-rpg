const { DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const Dilemma = require('./Dilemma');
const JsonModel = require('./JsonModel');

class Outcome extends JsonModel { }

Outcome.init(
  {
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    time_change: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    preparedness_change: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    crisis_change: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
  },
  {
    // Link to database connection
    sequelize,
    timestamps: false,
    underscored: true,
    modelName: 'outcome',
    freezeTableName: true

  }
);

module.exports = Outcome;
