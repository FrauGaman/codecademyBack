import models from '../models/index';

export const coursesGet = function(request, response) {
	if(!request.body) return response.sendStatus(400);
	models.CoursesList.findAll({raw:true}).then(courses=>{
		// courses.getTheme().then(() => {themes => {
			response.send({themes});
		// }
		});
	}).catch(err=>console.log(err));
};

export const coursesCreate =  function (request, response) {
	if(!request.body) return response.sendStatus(400);
	const {importance, title, descr, icon, borderColor, theme, language } = request.body;
	models.CoursesList.create({
		importance: importance,
		title: title,
		descr: descr,
		icon: icon,
		borderColor: borderColor,
	}).then((res) => {
		res.addTheme(theme);
		res.addLanguage(language);
	}).then(() => {
		response.send({success: true})
	}).catch((err) => {
		console.log(err)
	})
};

export const coursesEdit = function (request, response) {
	if(!request.body) return response.sendStatus(400);
	const {importance, title, descr, icon, borderColor, theme, language } = request.body;
	models.CoursesList.update(
		{
			importance: importance,
			title: title,
			descr: descr,
			icon: icon,
			borderColor: borderColor,
		},
		{ returning: true, where: { id: request.params.id } }
		).then(([ rowsUpdate, [updatedData] ]) => {
			updatedData.setTheme(theme);
			updatedData.setLanguage(language);
	}).then(() => {
		response.send({success: true});
	})
		.catch((err) => {
		console.log(err)
	})
};

export const coursesDelete = function(request, response) {
	models.CoursesList.destroy({
		where: {id: request.params.id}
	}).then(() => {
		response.send({success: true});
	}).catch((err) => {
		console.log(err)
	})
};

