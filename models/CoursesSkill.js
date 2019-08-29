const skillPath = (sequelize, DataTypes) => {
	const SkillPath = sequelize.define('skillPath', {
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
		},
		period: {
			type: DataTypes.STRING,
			allowNull: false
		}
	},
		{
			tableName: 'skillPath'
		});
	SkillPath.associate = (models) => {
		SkillPath.belongsToMany(models.Theme, {
			through: 'associateSkillTheme',
			as: 'theme',
			foreignKey: 'skillPathId'
		});
		SkillPath.belongsToMany(models.Language, {
			through: 'associateSkillLanguage',
			as: 'language',
			foreignKey: 'skillPathId'
		});
	};
	return SkillPath;
};

export default skillPath;
