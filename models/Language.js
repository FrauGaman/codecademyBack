const language = (sequelize, DataTypes) => {
	const Language = sequelize.define('language', {
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
	Language.associate = models => {
		Language.belongsTo(models.CareerPath);
	};
	Language.associate = models => {
		Language.belongsTo(models.SkillPath);
	};
	Language.associate = models => {
		Language.belongsTo(models.CoursesList);
	};
	return Language;
};

export default language;
