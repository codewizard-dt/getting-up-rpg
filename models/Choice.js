const { DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const Dilemma = require('./Dilemma');
const JsonModel = require('./JsonModel');

class Choice extends JsonModel { }

Choice.init(
  {
    dilemma_id: {
      type: DataTypes.INTEGER,
      references: {
        model: Dilemma,
        primaryKey: 'id'
      }
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
  },
  {
    // Link to database connection
    sequelize,
    timestamps: false,
    underscored: true,
    modelName: 'choice',
    freezeTableName: true

  }
);

module.exports = Choice;
