module.exports = (sequelize, DataTypes) => {
  const Reservation = sequelize.define('reservations', {
    ReservationID: {
      type: DataTypes.STRING,
      field: 'reservation_id',
      primaryKey: true
    },
    UserID: {
      type: DataTypes.STRING,
      field: 'user_id',
    },
    PlaceID: {
      type: DataTypes.STRING,
      field: 'place_id',
    },
    RoomID: {
      type: DataTypes.STRING,
      field: 'room_id',
    },
    ReservationDate: {
      type: DataTypes.STRING,
      field: 'reservation_date',
    },
    // startperiod
    // endperiod
    // person
    // totalcost
    // DATE
    // description
    createdAt: { type: DataTypes.DATE, field: 'created_at' },
    updatedAt: { type: DataTypes.DATE, field: 'updated_at' },
  });

  const reservationClassMethods = {
    associate(models) {
      Reservation.hasOne(models.users, {
        foreignKey: 'UserID',
        sourceKey: 'UserID',
        as: 'User',
      });
      Reservation.hasOne(models.places, {
        foreignKey: 'PlaceID',
        sourceKey: 'PlaceID',
        as: 'Place',
      });
      Reservation.hasOne(models.rooms, {
        foreignKey: 'RoomID',
        sourceKey: 'RoomID',
        as: 'Room',
      });
    }
  };
  
  Object.assign(Reservation, reservationClassMethods);

  return Reservation;
};
