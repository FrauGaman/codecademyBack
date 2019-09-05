const knowledge = (sequelize, DataTypes) => {
	const Knowledge = sequelize.define('knowledge', {
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
			allowNull: false
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true
		}
	},
		{
			tableName: 'knowledge'
		});

	return Knowledge;
};

export default knowledge;
