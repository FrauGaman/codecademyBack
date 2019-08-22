import express from 'express';
const bodyParser = require("body-parser");
import { sequelize } from './models';
import { knowledgeCreate,knowledgeDelete } from './controllers/knowledgeController';

const app = express();
//parser for usual JSON
app.use(bodyParser.json());
app.post('/knowledge', knowledgeCreate);
app.delete('/knowledge/:id', knowledgeDelete);

sequelize.sync().then( async () => {
	app.listen(3000, () => {
		console.log(`Example app listening on port 3000!`)
	})
});
