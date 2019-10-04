import  jwt from 'jsonwebtoken';

export default function createToken(user) {
	const secret = 'shhhhh';
	const token = jwt.sign(user, secret, { expiresIn: '1m' });
	return token;
}


