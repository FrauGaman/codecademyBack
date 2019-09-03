import models from '../models';
import Sequelize from 'sequelize';

export const careerGet = function(request, response) {

	let queryFindParam = Object.keys(request.query).find(elem => elem.includes('_like'));
	let findField = queryFindParam && queryFindParam.replace('_like', '');
	let findElem = queryFindParam && request.query[queryFindParam];
	let options = {
		row: true,
		include: [{	model: models.Theme, as: 'theme'}, { model: models.Language, as: 'language'	},{ model: models.Knowledge, as: 'knowledge'	}	]
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

	models.CoursesCareer.findAll(options).then(career => {
		let coursesList = [];
		career.map(elem => {
			const { id, img, bgColor, title, descr, theme, language, knowledge } = elem;
			let elemItem = {
				id, img, bgColor, title, descr,
				theme: theme.map(item => item.id),
				language: language.map(item => item.id),
				knowledge: knowledge.map(item => item.id),
			};
			coursesList.push(elemItem)
		});
		response.send(coursesList);
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
