
export const auth =  function (request, response) {
	if(!request.body) return response.sendStatus(400);
	const { firstName, lastName, email, password } = request.body;
	// models.Registration.create({
	// 	firstName: firstName,
	// 	lastName: lastName,
	// 	email: email,
	// 	password: password,
	// }).then(() => {
	// 	response.send({success: true});
	// }).catch((err) => {
	// 	console.log(err)
	// })
};
