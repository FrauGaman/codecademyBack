import {ERROR_MESSAGE, ERRORS} from '../const';
import {linkValid, setMaxLength, stringValidator} from './validation';

export const idValidation = (request, response, next) => {
	if(!request.params.id) {
		response.status(400).send({
			success: false,
			error: ERRORS[400],
			message: ERROR_MESSAGE.NO_ID,
		})
	} else {
		next();
	}
};

export const dataValidation = (request, response, next) => {
	let message = [];
	//name
	if (request.body.name !== undefined) {
		if (!request.body.name) {
			message.push(ERROR_MESSAGE.NO_NAME)
		} else{
			let stringVal = stringValidator(request.body.name);
			(stringVal !== undefined) && message.push(stringVal)
		}
	}
	//description
	if (request.body.descr !== undefined) {
		if(!request.body.descr) {
			message.push(ERROR_MESSAGE.NO_DESCR)
		} else {
			let maxLengthVal = setMaxLength(100, request.body.descr);
			(maxLengthVal !== undefined) && message.push(maxLengthVal)
		}
	}
	//link
	if(request.body.link !== undefined) {
		if(!request.body.link) {
			message.push(ERROR_MESSAGE.NO_LINK)
		} else {
			let linkVal = linkValid(request.body.link);
			(linkVal !== undefined) && message.push(linkVal)
		}
	}
	//title
	if (request.body.title !== undefined) {
		if (!request.body.title) {
			message.push(ERROR_MESSAGE.NO_TITLE)
		} else{
			let stringVal = stringValidator(request.body.title);
			(stringVal !== undefined) && message.push(stringVal)
		}
	}
	//importance
	if (request.body.importance !== undefined) {
		if (!request.body.importance) {
			message.push(ERROR_MESSAGE.NO_IMPORTANCE)
		}
	}
	//theme
	if (request.body.theme !== undefined) {
		if (!request.body.theme.length) {
			message.push(ERROR_MESSAGE.NO_THEME)
		}
	}
	//language
	if (request.body.language !== undefined) {
		if (!request.body.language.length && request.url.match(/skillPath/i)) {
			message.push(ERROR_MESSAGE.NO_LANGUAGE)
		}
	}
	//period
	if (request.body.period !== undefined) {
		if (!request.body.period) {
			message.push(ERROR_MESSAGE.NO_PERIOD)
		} else {
			let maxLengthVal = setMaxLength(20, request.body.period);
			(maxLengthVal !== undefined) && message.push(maxLengthVal)
		}
	}
	//


	if (message.length) {
		response.status(400).send({
			success: false,
			error: ERRORS[400],
			message: message,
		});
	} else {
		next();
	}

};
