'use strict';
const TABLE_NAME = 'reservations';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(TABLE_NAME, {
      reservation_id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING,
      },
      user_id: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      place_id: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      room_id: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      reservation_date: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      start_period: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      end_period: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      person: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      total_cost: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      description: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: new Date(),
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: new Date(),
      }
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable(TABLE_NAME);
  }
};