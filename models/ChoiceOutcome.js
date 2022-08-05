const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const Choice = require('./Choice');
const Outcome = require('./Outcome');

class ChoiceOutcome extends Model { }

ChoiceOutcome.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },
    choice_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'choice',
        primaryKey: 'id'
      }
    },
    outcome_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'outcome',
        primaryKey: 'id'
      }
    },
    likelihood: {
      type: DataTypes.INTEGER,
      defaultValue: 1
    }
  },
  {
    // Link to database connection
    sequelize,
    timestamps: false,
    underscored: true,
    modelName: 'choice_outcome',
    freezeTableName: true

  }
);

module.exports = ChoiceOutcome;
