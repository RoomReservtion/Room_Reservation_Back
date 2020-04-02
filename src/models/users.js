// const { setCreatedAtAndUpdatedAt, setBulkCreatedAtAndUpdatedAt } = require('../utils/model.helper');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('users', {
    UserID: {
      type: DataTypes.STRING,
      field: 'user_id',
      primaryKey: true
    },
    Name: {
      type: DataTypes.STRING,
      field: 'name',
    },
    Contact: {
      type: DataTypes.STRING,
      field: 'contact',
    },
    createdAt: { type: DataTypes.DATE, field: 'created_at' },
    updatedAt: { type: DataTypes.DATE, field: 'updated_at' },
  });

  const userClassMethods = {
    associate(models) {
      User.hasMany(models.reservation, {
        foreignKey: 'UserID',
        sourceKey: 'UserID',
        as: 'Reservations',
      });
    }
  };
  
  Object.assign(User, userClassMethods);

  return User;
};
