'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  
  class Transaction extends Model {
    
    static associate(models) {
    
      Transaction.belongsTo(models.Account, {
        foreignKey: 'account_id',
        as: 'account'
      });

    }
  
  }
  
  Transaction.init({
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    type: {
      allowNull: false,
      type: DataTypes.ENUM('credit', 'debit')
    },
    amount: {
      allowNull: false,
      type: DataTypes.DECIMAL(10, 2).UNSIGNED,
      validate: {
        min: 0.01
      }
    },
    account_id: {
      type: DataTypes.UUID,
      references: {
        model: 'Account',
        key: 'id'
      }
    },
  }, {
    sequelize,
    modelName: 'Transaction',
  });
  
  return Transaction;

};