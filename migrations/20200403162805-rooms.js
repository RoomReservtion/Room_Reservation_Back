'use strict';
const TABLE_NAME = 'rooms';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable(TABLE_NAME, {
            place_id: {
                allowNull: false,
                type: Sequelize.INTEGER,
            },
            room_id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            name: {
                allowNull: false,
                type: Sequelize.STRING,
            },
            seats: {
                allowNull: false,
                type: Sequelize.INTEGER,
            },
            tv: {
                allowNull: false,
                type: Sequelize.BOOLEAN,
            },
            projector: {
                allowNull: false,
                type: Sequelize.BOOLEAN,
            },
            soundtable: {
                allowNull: false,
                type: Sequelize.BOOLEAN,
            },
            screen_projector: {
                allowNull: false,
                type: Sequelize.BOOLEAN,
            },
            speakers: {
                allowNull: false,
                type: Sequelize.BOOLEAN,
            },
            large_led_display: {
                allowNull: false,
                type: Sequelize.BOOLEAN,
            },
            sound_operator: {
                allowNull: false,
                type: Sequelize.BOOLEAN,
            },
            wireless_microphone: {
                allowNull: false,
                type: Sequelize.BOOLEAN,
            },
            lapel_microphone: {
                allowNull: false,
                type: Sequelize.BOOLEAN,
            },
            stand_microphone: {
                allowNull: false,
                type: Sequelize.BOOLEAN,
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: new Date(),
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: new Date(),
            },
        });
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable(TABLE_NAME);
    }
};
