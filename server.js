import express from 'express';
const bodyParser = require("body-parser");
import { sequelize } from './models';
// import { careerGet, careerGetById, careerCreate, careerEdit, careerDelete } from './controllers/careerController';
// import { skillGet, skillGetById, skillCreate, skillEdit, skillDelete } from './controllers/skillController';
// import { coursesGet, coursesGetById, coursesCreate, coursesEdit, coursesDelete } from './controllers/allCoursesController';
// import { themeGet, themeGetById, themeCreate, themeEdit, themeDelete } from './controllers/themeController';
// import { languageGet, languageGetById, languageCreate, languageEdit, languageDelete } from './controllers/languageController';
import { knowledgeGet, knowledgeById, knowledgeCreate, knowledgeEdit, knowledgeDelete } from './controllers/knowledgeController';
import { idValidation, dataValidation } from './middleware/validationMiddlevare';

const app = express();
//parser for usual JSON
app.use(bodyParser.json());

// app.get('/careerPath', careerGet);
// app.get('/careerPath/:id', idValidation, careerGetById);
// app.post('/careerPath', dataValidation, careerCreate);
// app.put('/careerPath/:id', idValidation, dataValidation, careerEdit);
// app.delete('/careerPath/:id', idValidation, careerDelete);
//
// app.get('/skillPath', skillGet);
// app.get('/skillPath/:id', idValidation, skillGetById);
// app.post('/skillPath', dataValidation, skillCreate);
// app.put('/skillPath/:id', idValidation, dataValidation, skillEdit);
// app.delete('/skillPath/:id', idValidation, skillDelete);
//
// app.get('/coursesList', coursesGet);
// app.get('/coursesList/:id', idValidation, coursesGetById);
// app.post('/coursesList', dataValidation, coursesCreate);
// app.put('/coursesList/:id', idValidation, dataValidation, coursesEdit);
// app.delete('/coursesList/:id', idValidation, coursesDelete);
//
// app.get('/theme',themeGet);
// app.get('/theme/:id', idValidation, themeGetById);
// app.post('/theme', dataValidation, themeCreate);
// app.put('/theme/:id', idValidation, dataValidation, themeEdit);
// app.delete('/theme/:id', idValidation, themeDelete);
//
// app.get('/language', languageGet);
// app.get('/language/:id', idValidation, languageGetById);
// app.post('/language', dataValidation, languageCreate);
// app.put('/language/:id', idValidation, dataValidation, languageEdit);
// app.delete('/language/:id', idValidation, languageDelete);

app.get('/knowledge', knowledgeGet);
app.get('/knowledge/:id', idValidation, knowledgeById);
app.post('/knowledge', dataValidation, knowledgeCreate);
app.put('/knowledge/:id', idValidation, dataValidation, knowledgeEdit);
app.delete('/knowledge/:id', idValidation, knowledgeDelete);

sequelize.sync().then( async () => {
	app.listen(3000, () => {
		console.log(`Example app listening on port 3000!`)
	})
});
