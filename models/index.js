import Sequelize from 'sequelize';

const sequelize = new Sequelize('CodecademiDB', 'postgres', 'Postgres', {
	dialect: 'postgres',
});

const models = {
	Knowledge: sequelize.import('./Knowledge'),
};

Object.keys(models).forEach(key => {
	if('associate' in models[key]) {
		models[key].associate(models)
	}
});

export { sequelize };

export default models;
