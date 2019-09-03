export default function sortData(sortField, sortType, dataArray) {

	dataArray.sort((a, b) => {
		let nameA = a[sortField].toLowerCase();
		let nameB = b[sortField].toLowerCase();

		if (sortType === 'asc') {
			if (nameA < nameB) {
				return -1;
			} else if (nameA > nameB) {
				return 1;
			} else {
				return 0;
			}
		} else if (sortType === 'desc') {
			if (nameA < nameB) {
				return 1;
			} else if (nameA > nameB) {
				return -1;
			} else {
				return 0;
			}
		} else {
			return 0;
		}
	});
	return dataArray;
}
