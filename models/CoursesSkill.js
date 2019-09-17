'use strict';
module.exports = (sequelize, DataTypes) => {
  const CoursesSkill = sequelize.define('skillPath', {
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
    },
    period: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {});
  CoursesSkill.associate = function(models) {
    CoursesSkill.belongsToMany(models.Theme, {
      through: 'coursesSkill_theme',
      as: 'theme',
      foreignKey: 'skillPathId'
    });
    CoursesSkill.belongsToMany(models.Language, {
      through: 'coursesSkill_language',
      as: 'language',
      foreignKey: 'skillPathId'
    });
  };
  return CoursesSkill;
};
