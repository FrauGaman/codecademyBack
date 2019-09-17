'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('coursesCareer_language', {
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      careerPathId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'careerPath',
          key: 'id'
        },
        allowNull: false
      },
      languageId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'languages',
          key: 'id'
        },
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
    return queryInterface.dropTable('coursesCareer_language');
  }
};
