import models from '../models/index';

export const coursesGet = function(request, response) {
	if(!request.body) return response.sendStatus(400);
	models.CoursesList.findAll({raw:true}).then(courses=>{
		response.send({courses});
	}).catch(err=>console.log(err));
};

export const coursesCreate =  function (request, response) {
	if(!request.body) return response.sendStatus(400);
	const {importance, title, descr, icon, borderColor } = request.body;
	models.CoursesList.create({
		importance: importance,
		title: title,
		descr: descr,
		icon: icon,
		borderColor: borderColor,
	}).then(async(res) => {
		const theme = await models.Theme.findByPk(1);
		res.addTheme(theme);
		response.send(res);
	}).catch((err) => {
		console.log(err)
	})
};

export const coursesEdit = function (request, response) {
	if(!request.body) return response.sendStatus(400);
	const {importance, title, descr, icon, borderColor } = request.body;
	models.CoursesList.update(
		{
			importance: importance,
			title: title,
			descr: descr,
			icon: icon,
			borderColor: borderColor,
		},
		{ where: { id: request.params.id } }
	).then(() => {
		response.send({success: true});
	}).catch((err) => {
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

