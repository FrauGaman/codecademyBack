import models from '../models';
import {likeData, organizeData, paginateData} from './scripts/queryParams';
import { mapSkill } from './scripts/mapData';

export const skillGet = async function(request, response) {
	let options = {
		include: [{model: models.Theme, as: 'theme'}, {model: models.Language, as: 'language'}],
		where: {}
	};
	let likeQuery = likeData(request.query, options);
	(likeQuery !== undefined) && (options = {...options, ...likeQuery});
	let sortQuery = organizeData(request.query._sort, request.query._order);
	(sortQuery !== undefined) && (options = {...options, ...sortQuery});
	let paginateQuery = paginateData(request.query._page, request.query._limit);
	(paginateQuery !== undefined) && (options = {...options, ...paginateQuery});
	let helpOptions = {
		include: [{model: models.Theme, as: 'theme'}, {model: models.Language, as: 'language'}]
	};
	(request.query.theme !== undefined) && (helpOptions.include[0].where = {id: request.query.theme});
	(request.query.language !== undefined) && (helpOptions.include[1].where = {id: request.query.language});
	const skillId = await models.SkillPath.findAll(helpOptions);
	let filterData = [];
	skillId.map(item => filterData.push(item.id));
	options.where['id'] = filterData;
	const skillData = await models.SkillPath.findAll(options);
	try{
		let skillList = mapSkill(skillData);
		response.send(skillList);
	} catch (err) {
		console.log(err)
	}
};

export const skillGetById = function (request, response) {
	models.SkillPath.findAll({
		include: [{model: models.Theme, as: 'theme'}, {model: models.Language, as: 'language'}],
		where: { id: request.params.id }
	}).then(skill => {
		let skillList = mapSkill(skill);
		response.send(skillList);
	}).catch(err=>console.log(err));
};

export const skillCreate =  function (request, response) {
	if(!request.body) return response.sendStatus(400);
	const { img, bgColor, title, descr, period, theme, language } = request.body;
	models.SkillPath.create({
		img: img,
		bgColor: bgColor,
		title: title,
		descr: descr,
		period: period
	}).then((res) => {
		res.addTheme(theme);
		res.addLanguage(language);
	}).then(() => {
		response.send({success: true})
	}).catch((err) => {
		console.log(err)
	})
};

export const skillEdit = function (request, response) {
	if(!request.body) return response.sendStatus(400);
	const { img, bgColor, title, descr, period, theme, language } = request.body;
	models.SkillPath.update(
		{
			img: img,
			bgColor: bgColor,
			title: title,
			descr: descr,
			period: period
		},
		{ returning: true, where: { id: request.params.id } }
	).then(([ rowsUpdate, [updatedData] ]) => {
		updatedData.setTheme(theme);
		updatedData.setLanguage(language);
	}).then(() => {
		response.send({success: true});
	}).catch((err) => {
		console.log(err)
	})
};

export const skillDelete = function(request, response) {
	models.SkillPath.destroy({
		where: {id: request.params.id}
	}).then(() => {
		response.send({success: true});
	}).catch((err) => {
		console.log(err)
	})
};
