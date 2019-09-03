import models from '../models';
import Sequelize from 'sequelize';

export const skillGet = function(request, response) {

	let queryFindParam = Object.keys(request.query).find(elem => elem.includes('_like'));
	let findField = queryFindParam && queryFindParam.replace('_like', '');
	let findElem = queryFindParam && request.query[queryFindParam];
	let options = {
		row: true,
		include: [{	model: models.Theme, as: 'theme'}, { model: models.Language, as: 'language'	}	]
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
		options = {
			...options,
			where: {
				[findField]: {
					[Sequelize.Op.like]: `%${findElem}%`,
				}
			}
		}
	}

	models.CoursesSkill.findAll(options).then(skill => {
		let coursesList = [];
		skill.map(elem => {
			const { id, img, bgColor, title, descr, period, theme, language } = elem;
			let elemItem = {
				id, img, bgColor, title, descr, period,
				theme: theme.map(item => item.id),
				language: language.map(item => item.id),
			};
			coursesList.push(elemItem)
		});
		response.send(coursesList);
	})
		.catch(err=>console.log(err));
};

export const skillCreate =  function (request, response) {
	if(!request.body) return response.sendStatus(400);
	const { img, bgColor, title, descr, period, theme, language } = request.body;
	models.CoursesSkill.create({
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
	models.CoursesSkill.update(
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
	models.CoursesSkill.destroy({
		where: {id: request.params.id}
	}).then(() => {
		response.send({success: true});
	}).catch((err) => {
		console.log(err)
	})
};
