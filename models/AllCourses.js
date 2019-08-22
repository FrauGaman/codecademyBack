const coursesList = (sequelize, DataTypes) => {
	const CoursesList = sequelize.define('coursesList', {
		importance: {
			type: DataTypes.STRING
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
		},
	});

	return CoursesList;
};

export default coursesList;



	"theme": [1, 3],
	"language": []