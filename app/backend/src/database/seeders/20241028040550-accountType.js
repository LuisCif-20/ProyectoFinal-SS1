'use strict';

const { v4:uuidv4 } = require('uuid');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('AccountTypes', [
      {
        id: uuidv4(),
        name: 'Basic',
        currency_id: '15a00023-a6e4-4279-b0a5-9423ddc902c3',
        description: 'Cuenta basica que se maneja en Quetzales.',
        opening_amount: 200.00,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'Premium',
        currency_id: '64f3e482-7eb0-4904-822d-9a072a4851b5',
        description: 'Cuenta basica que se maneja en Dolares.',
        opening_amount: 50.00,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'Plus',
        currency_id: '35df8d38-c911-4b48-bec0-1de2b1d81daf',
        description: 'Cuenta basica que se maneja en Euros.',
        opening_amount: 50.00,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('AccountTypes', null, {});
  }
};
