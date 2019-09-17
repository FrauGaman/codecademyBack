'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('skillPath', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      img: {
        type: Sequelize.STRING,
      },
      bgColor: {
        type: Sequelize.STRING,
      },
      title: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
      },
      descr: {
        type: Sequelize.STRING,
        allowNull: false
      },
      period: {
        type: Sequelize.STRING,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('skillPath');
  }
};