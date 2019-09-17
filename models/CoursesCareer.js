'use strict';
module.exports = (sequelize, DataTypes) => {
  const CoursesCareer = sequelize.define('careerPath', {
    img: {
      type: DataTypes.STRING,
    },
    bgColor: {
      type: DataTypes.STRING,
    },
    title: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    descr: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {});
  CoursesCareer.associate = function(models) {
    CareerPath.belongsToMany(models.Theme, {
      through: 'coursesCareer_theme',
      as: 'theme',
      foreignKey: 'careerPathId'
    });
    CareerPath.belongsToMany(models.Language, {
      through: 'coursesCareer_language',
      as: 'language',
      foreignKey: 'careerPathId'
    });
    CareerPath.belongsToMany(models.Knowledge, {
      through: 'coursesCareer_knowledge',
      as: 'knowledge',
      foreignKey: 'careerPathId'
    });
  };
  return CoursesCareer;
};
