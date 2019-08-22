import models from '../models/index';

export const knowledgeCreate =  function (request, response) {
	if(!request.body) return response.sendStatus(400);
	console.log(request.body);

	const {name} = request.body;

	models.Knowledge.create({
		name: name
	}).then(() => {
		response.send({success: true});
	}).catch((err) => {
		console.log(err)
	})
};

export const knowledgeDelete = function(request, response) {
	models.Knowledge.destroy({
		where: {id: request.params.id}
	}).then(() => {
		response.send({success: true});
	}).catch((err) => {
		console.log(err)
	})
};

