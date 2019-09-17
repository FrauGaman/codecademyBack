'use strict';
module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('coursesList_theme', {
			id: {
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER
			},
			coursesListId: {
				type: Sequelize.INTEGER,
				references: {
					model: 'coursesList',
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
		return queryInterface.dropTable('careerPath');
	}
};
