import models from '../models/index';
import { likeData, organizeData, paginateData } from './scripts/queryParams';

export const languageGet = function(request, response) {
	let options = {};
	let likeQuery = likeData(request.query, options);
	(likeQuery !== undefined) && (options = {...options, ...likeQuery});
	let sortQuery = organizeData(request.query._sort, request.query._order);
	(sortQuery !== undefined) && (options = {...options, ...sortQuery});
	let paginateQuery = paginateData(request.query._page, request.query._limit);
	(paginateQuery !== undefined) && (options = {...options, ...paginateQuery});
	models.Language.findAll(options).then(language => {
		response.send(language);
	}).catch(err=>console.log(err));
};

export const languageGetById = function (request, response) {
	models.Language.findAll({
		where: { id: request.params.id }
	}).then(language => {
		response.send(language)
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
