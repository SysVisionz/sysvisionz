export const reverseArray = (array) => {
	let newArray=[];
	for( const entry in array ){
		newArray.splice(0,0,array[entry]);
	}
	return newArray;
}