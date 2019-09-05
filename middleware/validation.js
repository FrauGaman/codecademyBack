import { ERROR_MESSAGE } from '../const';

export const linkValid = link => {
	if (link.match(/^\/[\d+\w+-]+$/i)) return undefined;
	return ERROR_MESSAGE.LINK_VIEW;
};

export const setMaxLength = (maxLength, value) => {
	if (value.length <= maxLength) return undefined;
	return `${ERROR_MESSAGE.MAX_LENGTH} ${maxLength}`;
};

export const setMinLength = minLength => value => {
	if (value.length >= minLength) return undefined;
	return `${ERROR_MESSAGE.MIN_LENGTH} ${minLength}`;
};

export const stringValidator = value => {
	if (value.match(/[a-z0-9а-яё]+/i)) return undefined;
	return ERROR_MESSAGE.STRING_VIEW;
};