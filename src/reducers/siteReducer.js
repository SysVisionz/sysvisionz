const INITIAL_STATE = {
	dropdownOpen: false,
	dropdownStatus: [],
	imagesToLoad : 0,
	imagesLoaded : false,
}

export default (state=INITIAL_STATE, action) => {
	const {type, payload} = action;
	switch (type) {
		case 'dropdownOpen'
			dropdownStatus[payload.id] = payload.value;
			dropdownOpen = dropdownStatus.indexOf(true)!= -1;
			return {...state, dropdownOpen};
		case 'imageLoaded':
			imagesToLoad--;
			return imagesToLoad < 1 ? {...state, imagesLoaded = true} : state;
		case 'newImage':
			imagesToLoad++;
			return {...state, imagesLoaded}
			break;
		case default: 
			return state;
	}
}