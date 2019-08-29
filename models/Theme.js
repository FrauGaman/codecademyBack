const theme = (sequelize, DataTypes) => {
	const Theme = sequelize.define('theme', {
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
		},
	},
		{
			tableName: 'theme'
		});
	return Theme;
};

export default theme;
