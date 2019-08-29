const language = (sequelize, DataTypes) => {
	const Language = sequelize.define('language', {
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
			allowNull: false
		},
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
			allowNull: false
		}
	},
		{
			tableName: 'language'
		});
	return Language;
};

export default language;
