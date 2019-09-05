import models from '../models/index';
import { likeData, organizeData, paginateData } from './scripts/queryParams';
import { mapCourses } from './scripts/mapData';

export const coursesGet = async function(request, response) {
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
	const coursesId = await models.CoursesList.findAll(helpOptions);
	let filterData = [];
	coursesId.map(item => filterData.push(item.id));
	options.where['id'] = filterData;
	const cursesData = await models.CoursesList.findAll(options);
	try {
		let coursesList = mapCourses(cursesData);
		response.send(coursesList);
	} catch(err) {
		console.log(err)
	}
};

export const coursesGetById = function (request, response) {
	models.CoursesList.findAll({
		include: [{model: models.Theme, as: 'theme'}, {model: models.Language, as: 'language'}],
		where: { id: request.params.id }
	}).then(courses => {
		let coursesList = mapCourses(courses);
		response.send(coursesList);
	}).catch(err=>console.log(err));
};

export const coursesCreate =  function (request, response) {
	if(!request.body) return response.sendStatus(400);
	const { importance, title, descr, icon, borderColor, theme, language } = request.body;
	models.CoursesList.create({
		importance: importance,
		title: title,
		descr: descr,
		icon: icon,
		borderColor: borderColor,
	}).then((res) => {
		res.addTheme(theme);
		res.addLanguage(language);
	}).then(() => {
		response.send({success: true})
	}).catch((err) => {
		console.log(err)
	})
};

export const coursesEdit = function (request, response) {
	if(!request.body) return response.sendStatus(400);
	const {importance, title, descr, icon, borderColor, theme, language } = request.body;
	models.CoursesList.update(
		{
			importance: importance,
			title: title,
			descr: descr,
			icon: icon,
			borderColor: borderColor,
		},
		{ returning: true, where: { id: request.params.id } }
		).then(([ rowsUpdate, [updatedData] ]) => {
			updatedData.setTheme(theme);
			updatedData.setLanguage(language);
	}).then(() => {
		response.send({success: true});
	})
		.catch((err) => {
		console.log(err)
	})
};

export const coursesDelete = function(request, response) {
	models.CoursesList.destroy({
		where: {id: request.params.id}
	}).then(() => {
		response.send({success: true});
	}).catch((err) => {
		console.log(err)
	})
};

