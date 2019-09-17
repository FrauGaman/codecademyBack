'use strict';
module.exports = (sequelize, DataTypes) => {
  const Language = sequelize.define('Language', {
    name: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    descr: {
      type: DataTypes.STRING,
      allowNull: false
    },
    link: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    }
  }, {
    tableName: 'language'
  });
  Language.associate = function(models) {
    Language.belongsToMany(models.CoursesList, {
      through: 'coursesList_language',
      as: 'coursesList',
      foreignKey: 'languageId',
      onDelete: 'cascade'
    });
    Language.belongsToMany(models.SkillPath, {
      through: 'coursesSkill_language',
      as: 'skillPath',
      foreignKey: 'languageId'
    });
    Language.belongsToMany(models.CareerPath, {
      through: 'coursesCareer_language',
      as: 'careerPath',
      foreignKey: 'languageId'
    });
  };
  return Language;
};
