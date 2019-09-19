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

export const emailValidator = email => {
  if (email.match(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-]{2,64}$/i)) return undefined;
  return ERROR_MESSAGE.EMAIL_VIEW;
};

export const passwordValidator = password => {
  if (password.match(/(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{6,}/g)) return undefined;
  return ERROR_MESSAGE.PASSWORD_VIEW;
}
