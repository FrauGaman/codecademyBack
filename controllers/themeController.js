import models from '../models/index';

export const themeGet = function(request, response) {
	if(!request.body) return response.sendStatus(400);
	models.Theme.findAll({raw:true}).then(theme=>{
		response.send({theme});
	}).catch(err=>console.log(err));
};

export const themeCreate = function (request, response) {
	if (!request.body) return resoinse.sendStatus(400);
	const { name, descr, link } = request.body;
	models.Theme.create({
		name: name,
		descr: descr,
		link: link
	}).then(() => {
		response.send({success: true});
	}).catch((err) => {
		console.log(err)
	})
};

export const themeEdit = function (request, response) {
	if(!request.body) return response.sendStatus(400);
	const { name, descr, link } = request.body;
	models.Theme.update(
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

export const themeDelete = function(request, response) {
	models.Theme.destroy({
		where: {id: request.params.id}
	}).then(() => {
		response.send({success: true});
	}).catch((err) => {
		console.log(err)
	})
};