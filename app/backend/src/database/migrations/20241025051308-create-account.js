'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Accounts', {
      id: {
        primaryKey: true,
        type: Sequelize.UUID,
      },
      funds: {
        allowNull: false,
        type: Sequelize.DECIMAL(10, 2).UNSIGNED
      },
      state: {
        allowNull: false,
        type: Sequelize.ENUM('active', 'closed', 'frozen')
      },
      user_id: {
        allowNull: false,
        onDelete: 'CASCADE',
        type: Sequelize.UUID,
        references: {
          model: 'Users',
          key: 'id'
        }
      },
      notifyme: {
        allowNull: false,
        defaultValue: false,
        type: Sequelize.BOOLEAN
      },
      account_number: {
        unique: true,
        allowNull: false,
        type: Sequelize.STRING(13)
      },
      account_address: {
        unique: true,
        allowNull: false,
        type: Sequelize.STRING(100)
      },
      current_account: {
        allowNull: false,
        type: Sequelize.BOOLEAN
      },
      account_type_id: {
        allowNull: false,
        onDelete: 'CASCADE',
        type: Sequelize.UUID,
        references: {
          model: 'AccountTypes',
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
    await queryInterface.addIndex('Accounts', ['user_id', 'account_type_id'], {
      unique: true
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Accounts');
  }
};