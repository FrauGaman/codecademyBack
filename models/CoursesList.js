const coursesList = (sequelize, DataTypes) => {
	const CoursesList = sequelize.define('coursesList', {
			id: {
				type: DataTypes.INTEGER,
				autoIncrement: true,
				primaryKey: true,
				allowNull: false
			},
			importance: {
				type: DataTypes.STRING,
				allowNull: false
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
			icon: {
				type: DataTypes.STRING,
			},
			borderColor: {
				type: DataTypes.STRING,
			}
		},
		{
			tableName: 'coursesList'
		});
	CoursesList.associate = (models) => {
		CoursesList.belongsToMany(models.Theme, {
			through: 'associateCoursesTheme',
			as: 'theme',
			foreignKey: 'coursesListId'
		});
		CoursesList.belongsToMany(models.Language, {
			through: 'associateCoursesLanguage',
			as: 'language',
			foreignKey: 'coursesListId'
		});
	};
	return CoursesList;
};

export default coursesList;
