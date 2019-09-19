import bcrypt from'bcryptjs';

'use strict';
module.exports = (sequelize, DataTypes) => {
  const Registration = sequelize.define('Registration', {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
  }, {
    hooks: {
      beforeCreate: (Registration) => {
        const salt = bcrypt.genSaltSync();
        Registration.password = bcrypt.hashSync(Registration.password, salt);
      }
    },
  });
  return Registration;
};
