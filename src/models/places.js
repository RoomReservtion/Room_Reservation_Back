
module.exports = (sequelize, DataTypes) => {
  const Place = sequelize.define('places', {
    PlaceID: {
      type: DataTypes.STRING,
      field: 'place_id',
      primaryKey: true
    },
    Name: {
      type: DataTypes.STRING,
      field: 'name',
    },
    Type: {
      type: DataTypes.STRING,
      field: 'type',
    },
    Address: {
      type: DataTypes.STRING,
      field: 'address',
    },
    Contact:{
      type: DataTypes.STRING,
      field: 'Contact',
    },
    createdAt: { type: DataTypes.DATE, field: 'created_at' },
    updatedAt: { type: DataTypes.DATE, field: 'updated_at' },
  });

  const placeClassMethods = {
    associate(models) {
      Place.hasMany(models.rooms, {
        foreignKey: 'PlaceID',
        sourceKey: 'PlaceID',
        as: 'Rooms',
      });
    }
  };
  
  Object.assign(Place, placeClassMethods);

  return Place;
};
