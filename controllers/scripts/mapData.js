export function mapCourses(courses) {
	let coursesList = [];
	courses.map(elem => {
		const { id, importance, title, descr, icon, borderColor, theme, language } = elem;
		let elemItem = {
			id, importance, title, descr, icon, borderColor,
			theme: theme.map(item => item.id),
			language: language.map(item => item.id),
		};
		coursesList.push(elemItem)
	});
	return coursesList;
}

export function mapSkill(skill) {
	let skillList = [];
	skill.map(elem => {
		const { id, img, bgColor, title, descr, period, theme, language } = elem;
		let elemItem = {
			id, img, bgColor, title, descr, period,
			theme: theme.map(item => item.id),
			language: language.map(item => item.id),
		};
		skillList.push(elemItem)
	});
	return skillList;
}

export function mapCareer(career) {
	let careerList = [];
	career.map(elem => {
		const { id, img, bgColor, title, descr, theme, language, knowledge } = elem;
		let elemItem = {
			id, img, bgColor, title, descr,
			theme: theme.map(item => item.id),
			language: language.map(item => item.id),
			knowledge: knowledge.map(item => item.id),
		};
		careerList.push(elemItem)
	});
	return careerList;
}
