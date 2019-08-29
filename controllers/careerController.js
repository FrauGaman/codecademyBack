import models from '../models/index';

export const careerGet = function(request, response) {
	if(!request.body) return response.sendStatus(400);
	models.CoursesCareer.findAll({raw:true}).then(courses=>{
		response.send({courses});
	}).catch(err=>console.log(err));
};

export const careerCreate =  function (request, response) {
	if(!request.body) return response.sendStatus(400);
	const { img, bgColor, title, descr } = request.body;
	models.CoursesCareer.create({
		img: img,
		bgColor: bgColor,
		title: title,
		descr: descr
	}).then((res) => {
		response.send(res);
	}).catch((err) => {
		console.log(err)
	})
};

export const careerEdit = function (request, response) {
	if(!request.body) return response.sendStatus(400);
	const { img, bgColor, title, descr } = request.body;
	models.CoursesCareer.update(
		{
			img: img,
			bgColor: bgColor,
			title: title,
			descr: descr
		},
		{ where: { id: request.params.id } }
	).then(() => {
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
