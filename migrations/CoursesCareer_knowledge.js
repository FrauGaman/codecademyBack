'use strict';
module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('coursesCareer_knowledge', {
			id: {
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER
			},
			careerPathId: {
				type: Sequelize.INTEGER,
				references: {
					model: 'careerPath',
					key: 'id'
				},
				allowNull: false
			},
			knowledgeId: {
				type: Sequelize.INTEGER,
				references: {
					model: 'knowledge',
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
		return queryInterface.dropTable('coursesCareer_knowledge');
	}
};
