'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        primaryKey: true,
        type: Sequelize.UUID,
      },
      pin: {
        allowNull: false,
        type: Sequelize.STRING
      },
      email: {
        unique: true,
        allowNull: false,
        type: Sequelize.STRING(75)
      },
      role_id: {
        allowNull: false,
        onDelete: 'CASCADE',
        type: Sequelize.UUID,
        references: {
          model: 'Roles',
          key: 'id'
        }
      },
      gender: {
        allowNull: false,
        type: Sequelize.ENUM('male', 'female', 'other')
      },
      user_name: {
        unique: true,
        allowNull: false,
        type: Sequelize.STRING(15)
      },
      last_name: {
        allowNull: false,
        type: Sequelize.STRING(25)
      },
      birthdate: {
        allowNull: false,
        type: Sequelize.DATEONLY
      },
      first_name: {
        allowNull: false,
        type: Sequelize.STRING(25)
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
    await queryInterface.dropTable('Users');
  }
};