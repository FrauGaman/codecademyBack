import Sequelize from 'sequelize';

export function likeData(query) {
	let queryFindParam = Object.keys(query).find(elem => elem.includes('_like'));
	let findField = queryFindParam && queryFindParam.replace('_like', '');
	let findElem = queryFindParam && query[queryFindParam];
	if(queryFindParam !== undefined && findElem !== undefined) {
		return { where: { [findField]: { [Sequelize.Op.like]: `%${findElem}%` } }	}
	}
}

export function organizeData(sortField, orderName) {
	(orderName === undefined) && (orderName = 'asc');
	if (sortField !== undefined) {
		return { order: [ [sortField, orderName] ]	}
	}
}

export function paginateData(pageNumber, limitNumber) {
	if (pageNumber && limitNumber) {
		const offset = (pageNumber - 1) * limitNumber;
		return { offset,	limit: limitNumber }
	}
}
