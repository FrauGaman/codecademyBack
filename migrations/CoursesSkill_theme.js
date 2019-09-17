'use strict';
module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('coursesSkill_theme', {
			id: {
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER
			},
			skillPathId: {
				type: Sequelize.INTEGER,
				references: {
					model: 'skillPath',
					key: 'id'
				},
				allowNull: false
			},
			themeId: {
				type: Sequelize.INTEGER,
				references: {
					model: 'themes',
					key: 'id'
				},
				allowNull: false
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE
			}
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('coursesSkill_theme');
	}
};
