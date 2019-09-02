import models from '../models';

export const skillGet = function(request, response) {
	if(!request.body) return response.sendStatus(400);
	models.CoursesSkill.findAll({raw:true}).then(skill=>{
		response.send({skill});
	}).catch(err=>console.log(err));
};

export const skillCreate =  function (request, response) {
	if(!request.body) return response.sendStatus(400);
	const { img, bgColor, title, descr, period, theme, language } = request.body;
	models.CoursesSkill.create({
		img: img,
		bgColor: bgColor,
		title: title,
		descr: descr,
		period: period
	}).then((res) => {
		res.addTheme(theme);
		res.addLanguage(language);
	}).then(() => {
		response.send({success: true})
	}).catch((err) => {
		console.log(err)
	})
};

export const skillEdit = function (request, response) {
	if(!request.body) return response.sendStatus(400);
	const { img, bgColor, title, descr, period, theme, language } = request.body;
	models.CoursesSkill.update(
		{
			img: img,
			bgColor: bgColor,
			title: title,
			descr: descr,
			period: period
		},
		{ returning: true, where: { id: request.params.id } }
	).then(([ rowsUpdate, [updatedData] ]) => {
		updatedData.setTheme(theme);
		updatedData.setLanguage(language);
	}).then(() => {
		response.send({success: true});
	}).catch((err) => {
		console.log(err)
	})
};

export const skillDelete = function(request, response) {
	models.CoursesSkill.destroy({
		where: {id: request.params.id}
	}).then(() => {
		response.send({success: true});
	}).catch((err) => {
		console.log(err)
	})
};
