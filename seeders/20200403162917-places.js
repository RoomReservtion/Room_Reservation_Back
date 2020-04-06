'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('places', places, {});
  },

  down: (queryInterface, Sequelize) => {
  }
};
const places = [
  {
    place_id: '9ba370ea-4030-49a7-b585-0a27debd0244',
    name: 'Hotel Pestana',
    type: 'hotel',
    address: 'R. Comendador Aráujo, 499',
    contact: '(41)3017-9900'
  },{
    place_id: '9ba370ea-4030-49a7-b585-0a27debd0245',
    name: 'Hotel Mercury Batel',
    type: 'hotel',
    address: 'R. Alferes Ângelo Sampaio, 1177',
    contact: '(41) 3342-9350'
  }
];

