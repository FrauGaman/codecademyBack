import models from '../models/index';
import Sequelize from 'sequelize';

export const coursesGet = async function(request, response) {
	let queryFindParam = Object.keys(request.query).find(elem => elem.includes('_like'));
	let findField = queryFindParam && queryFindParam.replace('_like', '');
	let findElem = queryFindParam && request.query[queryFindParam];
	let options = {
		row: true,
		include: [{model: models.Theme, as: 'theme'}, {model: models.Language, as: 'language'}],
		where: {}
	};
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
		options.where[findField] = {
			[Sequelize.Op.like]: `%${findElem}%`,
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

	let helpOptions = {
		row: true,
		include: [{model: models.Theme, as: 'theme'}, {model: models.Language, as: 'language'}]
	};
	if (request.query.theme !== undefined) {
		(request.query.theme.length === 1) && (request.query.theme = [request.query.theme]);
		helpOptions.include[0].where = {id: request.query.theme}
	}
	if (request.query.language !== undefined) {
		(request.query.language.length === 1) && (request.query.language = [request.query.language]);
		helpOptions.include[1].where = {id: request.query.language}
	}

	const courses = await models.CoursesList.findAll(helpOptions);
		let filterData = [];
		courses.map(item => {
			filterData.push(item.id)
		});
		options.where['id'] = filterData;

	await models.CoursesList.findAll(options).then(courses => {
		let coursesList = [];
		courses.map(elem => {
			const { id, importance, title, descr, icon, borderColor, theme, language } = elem;
			let elemItem = {
				id, importance, title, descr, icon, borderColor,
				theme: theme.map(item => item.id),
				language: language.map(item => item.id),
			};
			coursesList.push(elemItem)
		});
		response.send(coursesList);
	})
		.catch(err=>console.log(err))
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

