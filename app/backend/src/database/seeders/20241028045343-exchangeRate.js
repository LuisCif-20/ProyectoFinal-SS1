'use strict';

const { v4:uuidv4 } = require('uuid');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('ExchangeRates', [
      {
        id: uuidv4(),
        rate: 1.00,
        currency_id: '15a00023-a6e4-4279-b0a5-9423ddc902c3',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        rate: 7.50,
        currency_id: '64f3e482-7eb0-4904-822d-9a072a4851b5',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        rate: 10.00,
        currency_id: '35df8d38-c911-4b48-bec0-1de2b1d81daf',
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ]);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
