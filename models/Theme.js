'use strict';
module.exports = (sequelize, DataTypes) => {
    const Theme = sequelize.define('Theme', {
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
        tableName: 'theme'
    });
    Theme.associate = function(models) {
        Theme.belongsToMany(models.CoursesList, {
            through: 'coursesList_theme',
            as: 'coursesList',
            foreignKey: 'themeId',
            onDelete: 'cascade'
        });
        Theme.belongsToMany(models.SkillPath, {
            through: 'coursesSkill_theme',
            as: 'skillPath',
            foreignKey: 'themeId'
        });
        Theme.belongsToMany(models.CareerPath, {
            through: 'coursesCareer_theme',
            as: 'careerPath',
            foreignKey: 'themeId'
        });
    };
    return Theme;
};
