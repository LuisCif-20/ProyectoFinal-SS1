'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  
  class Config extends Model {
    
    static associate(models) {
    
    }
  
  }
  
  Config.init({
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING(50)
    },
    logo: {
      allowNull: false,
      type: DataTypes.STRING
    },
    slogan: {
      allowNull: false,
      type: DataTypes.STRING(50)
    }
  }, {
    sequelize,
    modelName: 'Config',
  });
  
  return Config;

};