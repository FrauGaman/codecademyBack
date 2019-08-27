import express from 'express';
const bodyParser = require("body-parser");
import { sequelize } from './models';
import { coursesGet, coursesCreate, coursesEdit, coursesDelete } from './controllers/allCoursescontroller';
import { themeGet, themeCreate, themeEdit, themeDelete } from './controllers/themeController';
import { languageGet, languageCreate, languageEdit, languageDelete } from './controllers/languageController';
import { knowledgeGet, knowledgeCreate, knowledgeEdit, knowledgeDelete } from './controllers/knowledgeController';

const app = express();
//parser for usual JSON
app.use(bodyParser.json());
app.get('/coursesList', coursesGet);
app.post('/coursesList', coursesCreate);
app.put('/coursesList/:id', coursesEdit);
app.delete('/coursesList/:id', coursesDelete);

app.get('/theme',themeGet);
app.post('/theme', themeCreate);
app.put('/theme/:id', themeEdit);
app.delete('/theme/:id', themeDelete);

app.get('/language', languageGet);
app.post('/language', languageCreate);
app.put('/language/:id', languageEdit);
app.delete('/language/:id', languageDelete);

app.get('/knowledge', knowledgeGet);
app.post('/knowledge', knowledgeCreate);
app.put('/knowledge/:id', knowledgeEdit);
app.delete('/knowledge/:id', knowledgeDelete);

sequelize.sync().then( async () => {
	app.listen(3000, () => {
		console.log(`Example app listening on port 3000!`)
	})
});
