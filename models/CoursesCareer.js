'use strict';
module.exports = (sequelize, DataTypes) => {
  const CoursesCareer = sequelize.define('CareerPath', {
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
  }, {
    tableName: 'careerPath'
  });
  CoursesCareer.associate = function(models) {
    CoursesCareer.belongsToMany(models.Theme, {
      through: 'coursesCareer_theme',
      as: 'theme',
      foreignKey: 'careerPathId'
    });
    CoursesCareer.belongsToMany(models.Language, {
      through: 'coursesCareer_language',
      as: 'language',
      foreignKey: 'careerPathId'
    });
    CoursesCareer.belongsToMany(models.Knowledge, {
      through: 'coursesCareer_knowledge',
      as: 'knowledge',
      foreignKey: 'careerPathId'
    });
  };
  return CoursesCareer;
};
