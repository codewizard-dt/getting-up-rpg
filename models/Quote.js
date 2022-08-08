const { DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const JsonModel = require('./JsonModel');

class Quote extends JsonModel { }

Quote.init(
  {
    author: {
      type: DataTypes.STRING,
      allowNull: false
    },
    quote: {
      type: DataTypes.STRING,
      allowNull: false
    },
  },
  {
    // Link to database connection  
    sequelize,
    timestamps: false,
    underscored: true,
    modelName: 'quote',
    freezeTableName: true
  }
);

module.exports = Quote;
