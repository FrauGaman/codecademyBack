'use strict';
module.exports = (sequelize, DataTypes) => {
  const Knowledge = sequelize.define('Knowledge', {
    name: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    }
  }, {
    tableName: 'knowledge'
  });
  Knowledge.associate = function(models) {
    Knowledge.belongsToMany(models.CareerPath, {
      through: 'coursesCareer_knowledge',
      as: 'careerPath',
      foreignKey: 'knowledgeId'
    });
  };
  return Knowledge;
};
