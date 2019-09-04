import models from '../models/index';
import Sequelize from 'sequelize';

export const themeGet = function(request, response) {
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
	if (request.query._page && request.query._limit) {
		const offset = (request.query._page-1) * request.query._limit;
		const limit = request.query._limit;
		options = {
			...options,
			offset,
			limit
		}
	}

	models.Theme.findAll(options).then(theme=>{
		response.send(theme);
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