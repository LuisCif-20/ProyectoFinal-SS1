'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  
  class Account extends Model {
    
    static associate(models) {

      Account.belongsTo(models.User, {
        foreignKey: 'user_id',
        as: 'user'
      });

      Account.belongsTo(models.AccountType, {
        foreignKey: 'account_type_id',
        as: 'account_type'
      });

      Account.hasMany(models.Transaction, {
        foreignKey: 'account_id',
        as: 'transactions'
      });

      Account.hasOne(models.ClosedAccount, {
        foreignKey: 'account_id',
        as: 'closed_account'
      });

    }

  }

  Account.init({
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    funds: {
      allowNull: false,
      type: DataTypes.DECIMAL(10, 2).UNSIGNED
    },
    state: {
      allowNull: false,
      defaultValue: 'frozen',
      type: DataTypes.ENUM('active', 'closed', 'frozen')
    },
    user_id: {
      allowNull: false,
      type: DataTypes.UUID,
      references: {
        model: 'User',
        key: 'id'
      }
    },
    notifyme: {
      allowNull: false,
      defaultValue: false,
      type: DataTypes.BOOLEAN
    },
    account_number: {
      unique: true,
      allowNull: false,
      type: DataTypes.STRING(13)
    },
    current_account: {
      allowNull: false,
      defaultValue: true,
      type: DataTypes.BOOLEAN
    },
    account_address: {
      unique: true,
      allowNull: false,
      type: DataTypes.STRING(100)
    },
    account_type_id: {
      allowNull: false,
      type: DataTypes.UUID,
      references: {
        model: 'AccountType',
        key: 'id'
      }
    }
  }, {
    sequelize,
    modelName: 'Account',
  });

  Account.prototype.toJSON = function () {
    const values = Object.assign({}, this.get());
    delete values.account_type_id;
    delete values.user_id;
    return values;
  }
  
  return Account;

};