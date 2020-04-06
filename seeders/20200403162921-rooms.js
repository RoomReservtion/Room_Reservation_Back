'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('rooms', rooms, {});
  },

  down: (queryInterface, Sequelize) => {
  }
};
const rooms = [
  {
    place_id: '9ba370ea-4030-49a7-b585-0a27debd0244',
    room_id: 'f0e2d508-2f7b-4533-bb95-a57adbc66292',
    name: 'Sala Ney Braga',
    seats: 15,
    tv: true,
    projector: false,
    soundtable: false,
    screen_projector: false,
    speakers: true,
    large_led_display: false,
    screen_projection: false,
    sound_operator: false,
    wireless_microphone: false,
    lapel_microphone: false,
    stand_microphone: false,
  },{
    place_id: '9ba370ea-4030-49a7-b585-0a27debd0244',
    room_id: 'f0e2d508-2f7b-4533-bb95-a57adbc66293',
    name: 'Sala Greca',
    seats: 35,
    tv: true,
    projector: true,
    soundtable: false,
    screen_projector: false,
    speakers: true,
    large_led_display: true,
    screen_projection: false,
    sound_operator: false,
    wireless_microphone: false,
    lapel_microphone: false,
    stand_microphone: true,
  },{
    place_id: '9ba370ea-4030-49a7-b585-0a27debd0245',
    room_id: 'f0e2d508-2f7b-4533-bb95-a57adbc66294',
    name: 'Sala 1',
    seats: 40,
    tv: true,
    projector: true,
    soundtable: false,
    screen_projector: false,
    speakers: true,
    large_led_display: true,
    screen_projection: false,
    sound_operator: false,
    wireless_microphone: false,
    lapel_microphone: false,
    stand_microphone: true,
  },
  {
    place_id: '9ba370ea-4030-49a7-b585-0a27debd0245',
    room_id: 'f0e2d508-2f7b-4533-bb95-a57adbc66295',
    name: 'Sala 2',
    seats: 20,
    tv: true,
    projector: true,
    soundtable: false,
    screen_projector: false,
    speakers: true,
    large_led_display: true,
    screen_projection: false,
    sound_operator: false,
    wireless_microphone: false,
    lapel_microphone: false,
    stand_microphone: true,
  }
];