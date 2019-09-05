import models from '../models';
import {likeData, organizeData, paginateData} from './scripts/queryParams';
import { mapCareer } from './scripts/mapData';

export const careerGet = async function(request, response) {
	let options = {
		include: [{model: models.Theme, as: 'theme'}, {model: models.Language, as: 'language'},{ model: models.Knowledge, as: 'knowledge'}],
		where: {}
	};
	let likeQuery = likeData(request.query, options);
	(likeQuery !== undefined) && (options = {...options, ...likeQuery});
	let sortQuery = organizeData(request.query._sort, request.query._order);
	(sortQuery !== undefined) && (options = {...options, ...sortQuery});
	let paginateQuery = paginateData(request.query._page, request.query._limit);
	(paginateQuery !== undefined) && (options = {...options, ...paginateQuery});
	let helpOptions = {
		include: [{model: models.Theme, as: 'theme'}, {model: models.Language, as: 'language'}, {model: models.Knowledge, as: 'knowledge'}]
	};
	(request.query.theme !== undefined) && (helpOptions.include[0].where = {id: request.query.theme});
	(request.query.language !== undefined) && (helpOptions.include[1].where = {id: request.query.language});
	(request.query.knowledge !== undefined) && (helpOptions.include[2].where = {id: request.query.knowledge});
	const careerId = await models.CoursesCareer.findAll(helpOptions);
	let filterData = [];
	careerId.map(item => filterData.push(item.id));
	options.where['id'] = filterData;
	const careerData = await models.CoursesCareer.findAll(options);
	try {
		let careerList = mapCareer(careerData);
		response.send(careerList);
	} catch (err) {
		console.log(err)
	}
};

export const careerGetById = function (request, response) {
	models.CoursesCareer.findAll({
		include: [{model: models.Theme, as: 'theme'}, {model: models.Language, as: 'language'}, {model: models.Knowledge, as: 'knowledge'}],
		where: { id: request.params.id }
	}).then(career => {
		let careerList = mapCareer(career);
		response.send(careerList);
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
