import models from '../models/index';

export const knowledgeGet = function(request, response) {
	if(!request.body) return response.sendStatus(400);
	models.Knowledge.findAll({raw:true}).then(knowledge=>{
		response.send({knowledge});
	}).catch(err=>console.log(err));
};

export const knowledgeCreate =  function (request, response) {
	if(!request.body) return response.sendStatus(400);
	const {name} = request.body;
	models.Knowledge.create({
		name: name
	}).then(() => {
		response.send({success: true});
	}).catch((err) => {
		console.log(err)
	})
};

export const knowledgeEdit = function (request, response) {
	if(!request.body) return response.sendStatus(400);
	models.Knowledge.update(
		{
			name: request.body.name
		},
		{ where: { id: request.params.id } }
	).then(() => {
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

