'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {

  class ClosedAccount extends Model {

    static associate(models) {
      
      ClosedAccount.belongsTo(models.Account, {
        foreignKey: 'account_id',
        as: 'account'
      });

    }

  }

  ClosedAccount.init({
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    reason: {
      allowNull: false,
      type: DataTypes.STRING
    },
    account_id: {
      allowNull: false,
      type: DataTypes.UUID,
      references: {
        model: 'Account',
        key: 'id'
      }
    }
  }, {
    sequelize,
    modelName: 'closedAccount',
  });

  return ClosedAccount;

};