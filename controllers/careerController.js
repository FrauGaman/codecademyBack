import models from '../models';

export const careerGet = function(request, response) {
	if(!request.body) return response.sendStatus(400);
	models.CoursesCareer.findAll({raw:true}).then(courses=>{
		response.send({courses});
	}).catch(err=>console.log(err));
};

export const careerCreate =  function (request, response) {
	if(!request.body) return response.sendStatus(400);
	const { img, bgColor, title, descr, theme, language, knowledge } = request.body;
	models.CoursesCareer.create({
		img: img,
		bgColor: bgColor,
		title: title,
		descr: descr
	}).then((res) => {
		res.addTheme(theme);
		res.addLanguage(language);
		res.addKnowledge(knowledge);
	}).then(() => {
		response.send({success: true});
	}).catch((err) => {
		console.log(err)
	})
};

export const careerEdit = function (request, response) {
	if(!request.body) return response.sendStatus(400);
	const { img, bgColor, title, descr, theme, language, knowledge } = request.body;
	models.CoursesCareer.update(
		{
			img: img,
			bgColor: bgColor,
			title: title,
			descr: descr
		},
		{ returning: true, where: { id: request.params.id } }
	).then(([ rowsUpdate, [updatedData] ]) => {
		updatedData.setTheme(theme);
		updatedData.setLanguage(language);
		updatedData.setKnowledge(knowledge);
	}).then(() => {
		response.send({success: true});
	}).catch((err) => {
		console.log(err)
	})
};

export const careerDelete = function(request, response) {
	models.CoursesCareer.destroy({
		where: {id: request.params.id}
	}).then(() => {
		response.send({success: true});
	}).catch((err) => {
		console.log(err)
	})
};
