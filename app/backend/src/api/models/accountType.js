'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  
  class AccountType extends Model {

    static associate(models) {
      
      AccountType.belongsTo(models.Currency, {
        foreignKey: 'currency_id',
        as: 'currency'
      });

      AccountType.hasMany(models.Account, {
        foreignKey: 'account_type_id',
        as: 'accounts'
      });

    }

  }

  AccountType.init({
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    name: {
      unique: true,
      allowNull: false,
      type: DataTypes.STRING(15)
    },
    currency_id: {
      allowNull: false,
      type: DataTypes.UUID,
      references: {
        model: 'Currency',
        key: 'id'
      }
    },
    description: {
      allowNull: false,
      type: DataTypes.STRING
    },
    opening_amount: {
      allowNull: false,
      type: DataTypes.DECIMAL(10, 2).UNSIGNED
    }
  }, {
    sequelize,
    modelName: 'AccountType',
  });

  AccountType.prototype.toJSON = function () {
    const values = Object.assign({}, this.get());
    delete values.currency_id;
    return values;
  }

  return AccountType;

};