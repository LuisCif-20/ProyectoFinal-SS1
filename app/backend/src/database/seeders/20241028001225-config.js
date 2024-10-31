'use strict';

const { v4:uuidv4 } = require('uuid');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Configs', [
      {
        id: uuidv4(),
        name: 'BANCUNOC',
        logo: 'https://images.vexels.com/media/users/3/129288/isolated/preview/52e06e07244a3590366669665ea540e3-icono-de-circulo-de-banco-3.png',
        slogan: 'Crecemos Juntos',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Configs', null, {});
  }
};
