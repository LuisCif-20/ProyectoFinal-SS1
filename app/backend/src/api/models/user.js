'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {

  class User extends Model {

    static associate(models) {

      User.belongsTo(models.Role, {
        foreignKey: 'role_id',
        as: 'role'
      });

      User.hasMany(models.Account, {
        foreignKey: 'user_id',
        as: 'accounts'
      });

    }

  }

  User.init({
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    pin: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    email: {
      unique: true,
      allowNull: false,
      type: DataTypes.STRING(75)
    },
    role_id: {
      allowNull: false,
      type: DataTypes.UUID,
      references: {
        model: 'Role',
        key: 'id'
      }
    },
    gender: {
      allowNull: false,
      defaultValue: 'other',
      type: DataTypes.ENUM('male', 'female', 'other')
    },
    user_name: {
      unique: true,
      allowNull: false,
      type: DataTypes.STRING(15)
    },
    last_name: {
      allowNull: false,
      type: DataTypes.STRING(25)
    },
    birthdate: {
      allowNull: false,
      type: DataTypes.DATEONLY
    },
    first_name: {
      allowNull: false,
      type: DataTypes.STRING(25)
    },
  }, {
    sequelize,
    modelName: 'User',
  });

  User.prototype.toJSON = function () {
    const values = Object.assign({}, this.get());
    delete values.pin;
    delete values.role_id;
    return values;
  }

  return User;

};