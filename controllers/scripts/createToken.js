import  jwt from 'jsonwebtoken';

export default function createToken(user) {
	const secretAccess = 'shhhhh';
	const secretRefresh = 'lololo';
	const accessToken = jwt.sign(user, secretAccess, { expiresIn: '5m' });
	const refreshToken = jwt.sign(user, secretRefresh, { expiresIn: '15m' });
	return {
		accessToken: accessToken,
		refreshToken: refreshToken,
	};
}


