'use strict';
module.exports = (sequelize, DataTypes) => {
  const CoursesList = sequelize.define('CoursesList', {
    importance: {
      type: DataTypes.STRING,
      allowNull: false
    },
    title: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    descr: {
      type: DataTypes.STRING,
      allowNull: false
    },
    icon: {
      type: DataTypes.STRING,
    },
    borderColor: {
      type: DataTypes.STRING,
    }
  }, {
    tableName: 'coursesList'
  });
  CoursesList.associate = function(models) {
    CoursesList.belongsToMany(models.Theme, {
      through: 'coursesList_theme',
      as: 'theme',
      foreignKey: 'coursesListId'
    });
    CoursesList.belongsToMany(models.Language, {
      through: 'coursesList_language',
      as: 'language',
      foreignKey: 'coursesListId'
    });
  };
  return CoursesList;
};
