'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {

  class Role extends Model {

    static associate(models) {
      
      Role.hasMany(models.User, {
        foreignKey: 'role_id',
        as: 'users'
      });

    }

  }

  Role.init({
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    name: {
      unique: true,
      allowNull: false,
      type: DataTypes.STRING(25)
    }
  }, {
    sequelize,
    modelName: 'Role',
  });

  return Role;

};