'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  
  class ExchangeRate extends Model {

    static associate(models) {

      ExchangeRate.belongsTo(models.Currency, {
        foreignKey: 'currency_id',
        as: 'currency'
      });

    }

  }

  ExchangeRate.init({
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    rate: {
      allowNull: false,
      type: DataTypes.DECIMAL(10, 2).UNSIGNED
    },
    currency_id: {
      allowNull: false,
      type: DataTypes.UUID,
      references: {
        model: 'Currency',
        key: 'id'
      }
    }
  }, {
    sequelize,
    modelName: 'ExchangeRates',
  });

  return ExchangeRate;

};