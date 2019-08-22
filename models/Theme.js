const theme = (sequelize, DataTypes) => {
	const Theme = sequelize.define('theme', {
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
	});
	Theme.associate = models => {
		Theme.belongsTo(models.CareerPath);
	};
	Theme.associate = models => {
		Theme.belongsTo(models.SkillPath);
	};
	Theme.associate = models => {
		Theme.belongsTo(models.CoursesList);
	};
	return Theme;
};

export default theme;