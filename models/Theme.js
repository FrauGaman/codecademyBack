'use strict';
module.exports = (sequelize, DataTypes) => {
    const Theme = sequelize.define('theme', {
        name: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        }
    }, {});
    Theme.associate = function(models) {
        Theme.belongsToMany(models.CoursesList, {
            through: 'coursesList_theme',
            as: 'coursesList',
            foreignKey: 'themeId'
        });
        Theme.belongsToMany(models.CoursesSkill, {
            through: 'coursesSkill_theme',
            as: 'skillPath',
            foreignKey: 'themeId'
        });
        Theme.belongsToMany(models.CoursesCareer, {
            through: 'coursesCareer_theme',
            as: 'careerPath',
            foreignKey: 'themeId'
        });
    };
    return Theme;
};
