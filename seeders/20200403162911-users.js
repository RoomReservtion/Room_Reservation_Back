'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('users', users, {});
  },

  down: (queryInterface, Sequelize) => {
  }
};
const users = [
  {
    user_id: 'af9b5b2c-31aa-4612-8e34-25638733ccb5',
    name: 'guilherme',
    contact: '4133333333',
    password: 'sheila'
  },{
    user_id: 'af9b5b2c-31aa-4612-8e34-25638733ccb6',
    name: 'gabriel',
    contact: '4133333334',
    password: 'sheilaa'
  }
];