module.exports = (sequelize, DataTypes) => {
  const Room = sequelize.define('rooms', {
    PlaceID: {
      type: DataTypes.STRING,
      field: 'place_id',
    },
    RoomID: {
      type: DataTypes.STRING,
      field: 'room_id',
      primaryKey: `uuid,`
    },
    Name: {
      type: DataTypes.STRING,
      field: 'name',
    },
    Seats:{
      type: DataTypes.STRING,
      field: 'seats',
    },
    TV:{
      type: DataTypes.BOOLEAN,
      field: `tv`
    },
    Projector:{
      type: DataTypes.BOOLEAN,
      field: `projector`
    },
    SoundTable:{
      type: DataTypes.BOOLEAN,
      field: `soundtable`
    },
    Screen_Projection:{
      type: DataTypes.BOOLEAN,
      field: `Screen_Projection`
    },
    Large_LED_Display:{
      type: DataTypes.BOOLEAN,
      field: `Large_LED_Display`
    },
    Speakers:{
      type: DataTypes.BOOLEAN,
      field: `speakers`
    },
    SoundOperator:{
      type: DataTypes.BOOLEAN,
      field: `sound_operator`
    },
    WirelessMicrophone:{
      type: DataTypes.BOOLEAN,
      field: `wireless_microphone`
    },
    LapelMicrophone:{
      type: DataTypes.BOOLEAN,
      field: `lapel_microphone`
    },
    StandMicrophone:{
      type: DataTypes.BOOLEAN,
      field: `stand_microphone`
    },
    createdAt: { type: DataTypes.DATE, field: 'created_at' },
    updatedAt: { type: DataTypes.DATE, field: 'updated_at' },
  });

  const roomClassMethods = {
    associate(models) {
      Room.hasOne(models.places, {
        foreignKey: 'PlaceID',
        sourceKey: 'PlaceID',
        as: 'Place',
      });
      Room.hasMany(models.reservations, {
        foreignKey: 'RoomID',
        sourceKey: 'RoomID',
        as: 'Reservations',
      });
    }
  };
  Object.assign(Room, roomClassMethods);

  return Room;
};
