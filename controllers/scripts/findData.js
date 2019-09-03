export default function findData(findField, findElem, dataArray){
	return dataArray.filter(elem => elem[findField].includes(findElem));
}