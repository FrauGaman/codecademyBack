'use strict';
module.exports = (sequelize, DataTypes) => {
  const Language = sequelize.define('language', {
    name: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    }
  }, {});
  Theme.associate = function(models) {
    Theme.belongsToMany(models.CoursesList, {
      through: 'coursesList_language',
      as: 'coursesList',
      foreignKey: 'languageId'
    });
    Theme.belongsToMany(models.CoursesSkill, {
      through: 'coursesSkill_language',
      as: 'skillPath',
      foreignKey: 'languageId'
    });
    Theme.belongsToMany(models.CoursesCareer, {
      through: 'coursesCareer_language',
      as: 'careerPath',
      foreignKey: 'languageId'
    });
  };
  return Language;
};
