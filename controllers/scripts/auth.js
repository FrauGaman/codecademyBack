import models from '../../models/index';
import bcrypt from 'bcryptjs';
import createToken from './createToken';
import {ERRORS, ERROR_MESSAGE} from '../../const';

export let tokensList = {};

export const auth = async (request, response) => {
	tokensList = {};
	if (!request.body) return response.sendStatus(400);
	const {email, password} = request.body;
	const user = await models.Registration.findOne({
		where: {
			email: email
		}
	});

	if (user) {
		await bcrypt.compare(password, user.password, await function (err, result) {
			if (result === true) {
				let userData = {
					id: user.dataValues.id,
					firstName: user.dataValues.firstName,
					lastName: user.dataValues.lastName,
					email: user.dataValues.email,
				};
				let token = createToken(userData);
				tokensList.refreshToken = token.refreshToken;
				response.send({
					success: true,
					accessToken: token.accessToken,
					refreshToken: token.refreshToken,
				})
			} else {
				response.status(400).send({
					success: false,
					error: ERRORS[400],
					message: ERROR_MESSAGE.INCORRECT_DATA,
				});

			}
		});
	} else {
		response.status(400).send({
			success: false,
			error: ERRORS[400],
			message: ERROR_MESSAGE.INCORRECT_DATA,
		});
	}
};
