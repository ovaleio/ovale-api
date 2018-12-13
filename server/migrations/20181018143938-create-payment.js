    'use strict';
    module.exports = {
      up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('Payments', {
          id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
          },
          UserId: {
            allowNull: false,
            type: Sequelize.INTEGER
          },
          stripeEmail: {
            allowNull: false,
            type: Sequelize.STRING
          },
          stripeAmount: {
            allowNull: false,
            type: Sequelize.INTEGER
          },
          stripeSource: {
            type: Sequelize.STRING
          },
          stripeChargeId: {
            type: Sequelize.STRING
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
      down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('Payments');
      }
    };