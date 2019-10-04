import  jwt from 'jsonwebtoken';

export const verifyToken = (request, response, next) => {
	// console.log(request.headers)
	let token = request.headers['x-access-token'] || request.headers['Authorization'] || request.headers['authorization'] ;

	if (!token) return response.status(401).send({ auth: false, message: 'No token provided.' });

	jwt.verify(token, 'shhhhh', function(err, decoded) {
		if (err) return response.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
		console.log(decoded);
		next();
	})

};
