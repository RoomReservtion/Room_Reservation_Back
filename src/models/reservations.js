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
      type: DataTypes.DATE,
      field: 'reservation_date',
    },
    StartPeriod: {
      type: DataTypes.INTEGER,
      field: 'start_period',
    },
    EndPeriod: {
      type: DataTypes.INTEGER,
      field: 'end_period',
    },
    TotalCost: {
      type: DataTypes.STRING,
      field: 'total_cost',
    },
    Description: {
      type: DataTypes.STRING,
      field: 'description',
    },
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
