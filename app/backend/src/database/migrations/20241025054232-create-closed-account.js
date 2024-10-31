'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ClosedAccounts', {
      id: {
        primaryKey: true,
        type: Sequelize.UUID,
      },
      reason: {
        allowNull: false,
        type: Sequelize.STRING
      },
      account_id: {
        allowNull: false,
        onDelete: 'CASCADE',
        type: Sequelize.UUID,
        references: {
          model: 'Accounts',
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
    await queryInterface.dropTable('ClosedAccounts');
  }
};