'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ExchangeRates', {
      id: {
        primaryKey: true,
        type: Sequelize.UUID,
      },
      rate: {
        allowNull: false,
        type: Sequelize.DECIMAL(10, 2).UNSIGNED
      },
      currency_id: {
        allowNull: false,
        onDelete: 'CASCADE',
        type: Sequelize.UUID,
        references: {
          model: 'Currencies',
          key: 'id'
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('ExchangeRates');
  }
};