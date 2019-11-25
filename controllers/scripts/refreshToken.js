import { tokensList } from './auth';
import createToken from './createToken';

export default function  refreshToken (request, response) {
	const postData = request.body;
	if (postData.refreshToken && (postData.refreshToken === tokensList.refreshToken)) {
		const user = {
			firstName: postData.firstName,
			lastName: postData.lastName,
			email: postData.email,
		};
		let newTokens = createToken(user);
		tokensList.refreshToken = newTokens.refreshToken;
	}  else {
		response.status(404).send('Invalid request')
	}
}

