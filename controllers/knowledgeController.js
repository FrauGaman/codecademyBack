import Sequelize from 'sequelize';
import models from '../models/index';

export const knowledgeGet = function(request, response) {

	let queryFindParam = Object.keys(request.query).find(elem => elem.includes('_like'));
	let findField = queryFindParam && queryFindParam.replace('_like', '');
	let findElem = queryFindParam && request.query[queryFindParam];
	let options = {	raw: true };

	(request.query._order === undefined) && (request.query._order = 'asc');
	if (request.query._sort !== undefined) {
		options = {
			...options,
			order: [
				[request.query._sort, request.query._order]
			],
		}
	}
	if(queryFindParam !== undefined && findElem !== undefined) {
		options = {
			...options,
			where: {
				[findField]: {
					[Sequelize.Op.like]: `%${findElem}%`,
				}
			}
		}
	}

	models.Knowledge.findAll(options).then(knowledge=>{
		console.log(request.query._order);
		response.send(knowledge);
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

