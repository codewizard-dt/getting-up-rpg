const { DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const JsonModel = require('./JsonModel');

class Dilemma extends JsonModel { }

Dilemma.init(
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    min_crisis_level: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false
    },
    location: {
      type: DataTypes.STRING,
      defaultValue: 'any'
    },
    initial: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  },
  {
    // Link to database connection
    sequelize,
    timestamps: false,
    underscored: true,
    modelName: 'dilemma',
    freezeTableName: true

  }
);

module.exports = Dilemma;
