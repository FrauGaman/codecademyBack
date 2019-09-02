const careerPath = (sequelize, DataTypes) => {
	const CareerPath = sequelize.define('careerPath', {
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
			allowNull: false
		},
		img: {
			type: DataTypes.STRING,
		},
		bgColor: {
			type: DataTypes.STRING,
		},
		title: {
			type: DataTypes.STRING,
			unique: true,
			allowNull: false
		},
		descr: {
			type: DataTypes.STRING,
			allowNull: false
		}
	},
		{
			tableName: 'careerPath'
		});
	CareerPath.associate = (models) => {
		CareerPath.belongsToMany(models.Theme, {
			through: 'associateCareerTheme',
			as: 'theme',
			foreignKey: 'careerPathId'
		});
		CareerPath.belongsToMany(models.Language, {
			through: 'associateCareerLanguage',
			as: 'language',
			foreignKey: 'careerPathId'
		});
		CareerPath.belongsToMany(models.Knowledge, {
			through: 'associateCareerKnowledge',
			as: 'knowledge',
			foreignKey: 'careerPathId'
		});
	};
	return CareerPath;
};

export default careerPath;
