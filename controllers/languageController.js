import models from '../models/index';

export const languageGet = function(request, response) {
	if(!request.body) return response.sendStatus(400);
	models.Language.findAll({raw:true}).then(language=>{
		response.send({language});
	}).catch(err=>console.log(err));
};

export const languageCreate = function (request, response) {
	if (!request.body) return resoinse.sendStatus(400);
	const { name, descr, link } = request.body;
	models.Language.create({
		name: name,
		descr: descr,
		link: link
	}).then(() => {
		response.send({success: true});
	}).catch((err) => {
		console.log(err)
	})
};

export const languageEdit = function (request, response) {
	if(!request.body) return response.sendStatus(400);
	const { name, descr, link } = request.body;
	models.Language.update(
		{
			name: name,
			descr: descr,
			link: link
		},
		{ where: { id: request.params.id } }
	).then(() => {
		response.send({success: true});
	}).catch((err) => {
		console.log(err)
	})
};

export const languageDelete = function(request, response) {
	models.Language.destroy({
		where: {id: request.params.id}
	}).then(() => {
		response.send({success: true});
	}).catch((err) => {
		console.log(err)
	})
};