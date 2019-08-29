import Sequelize from 'sequelize';

const sequelize = new Sequelize('CodecademiDB', 'postgres', 'Postgres', {
	dialect: 'postgres',
	define: {
		timestamps: false
	}
});

const models = {
	CoursesCareer: sequelize.import('./CoursesCareer'),
	CoursesSkill: sequelize.import('./CoursesSkill'),
	CoursesList: sequelize.import('./CoursesList'),
	Theme: sequelize.import('./Theme'),
	Language: sequelize.import('./Language'),
	Knowledge: sequelize.import('./Knowledge'),
};

Object.keys(models).forEach(key => {
	if('associate' in models[key]) {
		models[key].associate(models)
	}
});

export { sequelize };

export default models;
