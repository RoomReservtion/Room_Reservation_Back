'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('reservations', reservations, {});
  },

  down: (queryInterface, Sequelize) => {
  }
};
const reservations = [
  {
    reservation_id: '349edaa4-20c7-4494-b50d-2a7a1b1aa951',
    user_id: 'af9b5b2c-31aa-4612-8e34-25638733ccb5',
    place_id: '9ba370ea-4030-49a7-b585-0a27debd0245',
    room_id: 'f0e2d508-2f7b-4533-bb95-a57adbc66295',
    reservation_date: '2020-05-06 17:23:23.441 +00:00',
    start_period: 15,
    end_period: 16,
    person: 'JOSE',
    total_cost: '2300',
    description: 'Reuniao sobre o preço exorbitante da marmelada nos ultimos meses'
  },{
    reservation_id: '349edaa4-20c7-4494-b50d-2a7a1b1aa952',
    user_id: 'af9b5b2c-31aa-4612-8e34-25638733ccb6',
    place_id: '9ba370ea-4030-49a7-b585-0a27debd0245',
    room_id: 'f0e2d508-2f7b-4533-bb95-a57adbc66294',
    reservation_date: '2020-05-06 15:23:23.441 +00:00',
    start_period: 15,
    end_period: 16,
    person: 'Maria',
    total_cost: '2300',
    description: 'Redução de custos devido ao preço exorbitante da marmelada nos ultimos meses'
  },{
    reservation_id: '349edaa4-20c7-4494-b50d-2a7a1b1aa953',
    user_id: 'af9b5b2c-31aa-4612-8e34-25638733ccb5',
    place_id: '9ba370ea-4030-49a7-b585-0a27debd0245',
    room_id: 'f0e2d508-2f7b-4533-bb95-a57adbc66294',
    reservation_date: '2020-05-08 15:23:23.441 +00:00',
    start_period: 15,
    end_period: 16,
    person: 'Emanuel',
    total_cost: '2300',
    description: 'Corte de regalias devido ao preço exorbitante da marmelada nos ultimos meses'
  }
];