import models from '../models/index';
import {likeData, organizeData, paginateData} from './scripts/queryParams';

export const themeGet = function(request, response) {
	let options = {};
	let likeQuery = likeData(request.query, options);
	(likeQuery !== undefined) && (options = {...options, ...likeQuery});
	let sortQuery = organizeData(request.query._sort, request.query._order);
	(sortQuery !== undefined) && (options = {...options, ...sortQuery});
	let paginateQuery = paginateData(request.query._page, request.query._limit);
	(paginateQuery !== undefined) && (options = {...options, ...paginateQuery});
	models.Theme.findAll(options).then(theme => {
		response.send(theme);
	}).catch(err=>console.log(err));
};

export const themeGetById = function (request, response) {
	models.Theme.findAll({
		where: { id: request.params.id }
	}).then(theme => {
		response.send(theme)
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
