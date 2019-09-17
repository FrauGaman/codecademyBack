'use strict';
module.exports = (sequelize, DataTypes) => {
  const Knowledge = sequelize.define('knowledge', {
    name: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    }
  }, {});
  Theme.associate = function(models) {
    Theme.belongsToMany(models.CoursesCareer, {
      through: 'coursesCareer_knowledge',
      as: 'careerPath',
      foreignKey: 'knowledgeId'
    });
  };
  return Knowledge;
};
