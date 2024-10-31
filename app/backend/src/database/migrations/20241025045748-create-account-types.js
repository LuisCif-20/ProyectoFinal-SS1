'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('AccountTypes', {
      id: {
        primaryKey: true,
        type: Sequelize.UUID,
      },
      name: {
        unique: true,
        allowNull: false,
        type: Sequelize.STRING(15)
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
      description: {
        allowNull: false,
        type: Sequelize.STRING
      },
      opening_amount: {
        allowNull: false,
        type: Sequelize.DECIMAL(10, 2).UNSIGNED
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
    await queryInterface.dropTable('AccountTypes');
  }
};