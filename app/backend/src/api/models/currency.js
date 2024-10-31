'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {

  class Currency extends Model {

    static associate(models) {
      
      Currency.hasMany(models.AccountType, {
        foreignKey: 'currency_id',
        as: 'account_types'
      });

      Currency.hasMany(models.ExchangeRate, {
        foreignKey: 'currency_id',
        as: 'exchange_rates'
      });

    }

  }

  Currency.init({
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    name: {
      unique: true,
      allowNull: false,
      type: DataTypes.STRING(3)
    }
  }, {
    sequelize,
    modelName: 'Currency',
  });

  return Currency;

};