'use strict';
module.exports = (sequelize, DataTypes) => {
  const Knowledge = sequelize.define('knowledge', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    }
  }, {});
  Knowledge.associate = function(models) {
    Knowledge.belongsToMany(models.CoursesCareer, {
      through: 'coursesCareer_knowledge',
      as: 'careerPath',
      foreignKey: 'knowledgeId'
    });
  };
  return Knowledge;
};
