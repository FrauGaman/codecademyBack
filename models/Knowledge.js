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
			unique: true
		}
	});

	return Knowledge;
};

export default knowledge;
